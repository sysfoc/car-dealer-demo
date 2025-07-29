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
          subject: `Your Subscription is Expiring Soon – Renew Now to Avoid Interruption`,
          text: `Dear ${
            user.name || "User"
          },\n\nWe hope you're enjoying the benefits of your subscription with us.\nThis is a friendly reminder that your current subscription is set to expire on ${subscription.endDate.toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" }
          )}. To ensure uninterrupted access to all features and services, we recommend renewing your subscription before it expires.\nSubscription Details:\nSubscription Type: ${
            subscription.subscriptionType
          }\nSubscription Plan: ${
            subscription.subscriptionPlan
          }\nExpiration Date: ${subscription.endDate.toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}\nTo renew your subscription, simply click the button below:\n[https://www.automotivewebsolutions.com/pricing]\nIf you have any questions or need assistance with the renewal process, please don’t hesitate to reach out to our support team.\nThank you for choosing us — we look forward to continuing to serve you.\n\nBest regards,\nAutomotiv Web Solutions\nCustomer Support Team\nsales@automotivewebsolutions.com\nhttps://www.automotivewebsolutions.com`,
        });

        subscription.reminderSent = true;
        await subscription.save();
      }
      if (today >= endDate) {
        if (!subscription.emailSent) {
          await sendEmail({
            to: user.email,
            subject: `Your Subscription Has Expired – Reactivate to Continue Access`,
            text: `Dear ${
              user.name || "User"
            },\nWe wanted to inform you that your subscription with Automotive Web Solutions has expired as of ${subscription.endDate.toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}.\nAs a result, your access to premium features and services has been paused. To resume uninterrupted access and continue enjoying all benefits, we invite you to renew your subscription at your earliest convenience.\nSubscription Details:\nPlan: ${
              subscription.subscriptionPlan
            }\nSubscription Type: ${
              subscription.subscriptionType
            }\nExpiration Date: ${subscription.endDate.toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}\nStatus: Expired\nClick below to renew your subscription now:\n[https://www.automotivewebsolutions.com/pricing]\nIf you need any help or have questions about your account, our support team is here for you.\nThank you for being a valued part of our community. We’d love to have you back!\n\nWarm regards,\nAutomotive Web Solutions\nCustomer Support Team\nsales@automotivewebsolutions.com\nhttps://www.automotivewebsolutions.com`,
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
