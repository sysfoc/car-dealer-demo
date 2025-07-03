import { connectToDatabase } from "@/app/api/utils/db";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { sendEmail } from "@/app/api/utils/send-email";
import User from "@/app/model/user.model";

export async function GET() {
  await connectToDatabase();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, config.jwtSecretKey);
    if (!decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
    const id = decoded.id;
    const user = await User.findById(id);
    const subscription = await Subscription.findOne({
      userId: id,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(1);
    const today = new Date();
    if (subscription && subscription.endDate) {
      const endDate = new Date(subscription.endDate);
      const reminderDays = subscription.subscriptionPlan === "yearly" ? 30 : 3;
      const reminderDate = new Date(endDate);
      reminderDate.setDate(reminderDate.getDate() - reminderDays);
      if (
        !subscription.reminderSent &&
        today >= reminderDate &&
        today < endDate
      ) {
        await sendEmail({
          to: user.email,
          subject: "Subscription Reminder",
          text: `Dear user, your ${
            subscription.subscriptionPlan
          } subscription of ${
            subscription.subscriptionType
          } package will expire on ${new Date(
            subscription.endDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          )}. Please renew before expiry to avoid service disruption.`,
        });

        subscription.reminderSent = true;
        await subscription.save();
      }
      if (today >= endDate) {
        if (!subscription.emailSent) {
          await sendEmail({
            to: user.email,
            subject: "Subscription Expired",
            text: `Dear user, Your ${subscription.subscriptionPlan} of ${subscription.subscriptionType} package has expired. Please renew your subscription to continue using our services.`,
          });
          await sendEmail({
            to: config.emailReceiver,
            subject: "Subscription Expired",
            text: `A User's ${subscription.subscriptionPlan} of ${subscription.subscriptionType} package has expired. Please take necessary actions against the following user:\n Userid: ${user._id}\n Name: ${user.name}\n Email: ${user.email}`,
          });
          subscription.emailSent = true;
        }

        subscription.isActive = false;
        await subscription.save();
        await Notification.create({
          type: "error",
          title: "Subscription Expired",
          message: `Your subscription that has to be expired on "${endDate.toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}" has expired. Please renew your subscription to continue using our services. Thank you for your support!`,
          userId: id,
        });
      }
    }

    if (!subscription || subscription.isActive === false) {
      return NextResponse.json(
        { message: "No active subscription found, please create one" },
        { status: 404 }
      );
    }

    return NextResponse.json({ subscription }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
