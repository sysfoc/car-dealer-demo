import { connectToDatabase } from "@/app/api/utils/db";
import Addon from "@/app/model/addon.model";
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
    const addons = await Addon.find({ userId: id });
    const user = await User.findById(id);
    if (!addons || addons.length === 0) {
      return NextResponse.json(
        { message: "No addons found, please create one" },
        { status: 404 }
      );
    }

    const today = new Date();

    const updates = await Promise.all(
      addons.map(async (addon) => {
        const expiredDate = new Date(addon.expiredAt);
        const threeDaysBefore = new Date(expiredDate);
        threeDaysBefore.setDate(expiredDate.getDate() - 3);
        if (
          addon.isActive &&
          !addon.reminderSent &&
          today >= threeDaysBefore &&
          today < expiredDate
        ) {
          await sendEmail({
            to: user.email,
            subject: `Your Addon is Expiring Soon – Renew Now to Avoid Interruption`,
            text: `Dear ${
              user.name || "User"
            },\n\nWe hope you're enjoying the benefits of your subscription with us.\nThis is a friendly reminder that your current subscription is set to expire in 3 days — on ${addon.expiredAt.toLocaleDateString(
              "en-US",
              { month: "long", day: "numeric", year: "numeric" }
            )}. To ensure uninterrupted access to all features and services, we recommend renewing your subscription before it expires.\nSubscription Details:\nPlan: ${
              addon.serviceName
            }\nExpiration Date: ${addon.expiredAt.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}\nTo renew your subscription, simply click the button below:\n[https://www.automotivewebsolutions.com/add-ons]\nIf you have any questions or need assistance with the renewal process, please don’t hesitate to reach out to our support team.\nThank you for choosing us — we look forward to continuing to serve you.\n\nBest regards,\nAutomotive Web Solutions\nCustomer Support Team\nsales@automotivewebsolutions.com\nhttps://www.automotivewebsolutions.com`,
          });

          addon.reminderSent = true;
          await addon.save();
        }
        if (addon.isActive && expiredDate <= today && !addon.emailSent) {
          addon.isActive = false;

          await sendEmail({
            to: user.email,
            subject: "Your Addon Has Expired – Reactivate to Continue Access",
            text: `Dear ${
              user.name || "User"
            },\nWe wanted to inform you that your subscription with Automotive Web Solutions has expired as of ${addon.expiredAt.toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}.\nAs a result, your access to premium features and services has been paused. To resume uninterrupted access and continue enjoying all benefits, we invite you to renew your subscription at your earliest convenience.\nSubscription Details:\nPlan: ${
              addon.serviceName
            }\nExpiration Date: ${addon.expiredAt.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}\nStatus: Expired\nClick below to renew your subscription now:\n[https://www.automotivewebsolutions.com/add-ons]\nIf you need any help or have questions about your account, our support team is here for you.\nThank you for being a valued part of our community. We’d love to have you back!\n\nWarm regards,\nAutomotive Web Solutions\nCustomer Support Team\nsales@automotivewebsolutions.com\nhttps://www.automotivewebsolutions.com`,
          });

          await sendEmail({
            to: config.emailReceiver,
            subject: "Addon Expired Alert",
            text: `${addon.serviceName} of user ${user.email} has expired. Please take necessary action against following user: \n UserId: ${user._id} \n Name: ${user.name} \n Email: ${user.email} \n`,
          });

          addon.emailSent = true;
          await addon.save();
        }

        return addon;
      })
    );

    return NextResponse.json({ addons: updates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
