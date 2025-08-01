import { NextResponse } from "next/server";
import { connectToDatabase as dbConnect } from "@/app/api/utils/db";
import Theme from "@/app/model/theme.model";
import { sendEmail } from "@/app/api/utils/send-email";
import "@/app/model/user.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    const adminToken = cookieStore.get("admin")?.value;

    if (!token || !adminToken) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    let decodedUser, decodedAdmin;

    try {
      decodedUser = jwt.verify(token, config.jwtSecretKey);
    } catch {
      return NextResponse.json(
        { error: "Invalid user token" },
        { status: 403 }
      );
    }

    try {
      decodedAdmin = jwt.verify(adminToken, config.jwtSecretKey);
    } catch {
      return NextResponse.json(
        { error: "Invalid admin token" },
        { status: 403 }
      );
    }
    if (!decodedUser?.id || !decodedAdmin?.admin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    const threeDaysEnd = new Date(threeDaysFromNow);
    threeDaysEnd.setDate(threeDaysEnd.getDate() + 1);

    let remindersSent = 0;
    let expirationsSent = 0;

    const reminders = await Theme.find({
      expiredAt: { $gte: threeDaysFromNow, $lt: threeDaysEnd },
      activeTheme: true,
      reminderSent: false,
    }).populate("userId");

    for (const theme of reminders) {
      const user = theme.userId;
      if (!user || !user.email) continue;

      await sendEmail({
        to: user.email,
        subject: `Your Theme is Expiring Soon – Renew Now to Avoid Interruption`,
        text: `Dear ${
          user.name || "User"
        },\n\nWe hope you're enjoying the benefits of your subscription with us.\nThis is a friendly reminder that your current subscription is set to expire in 3 days — on ${theme.expiredAt.toLocaleDateString(
          "en-US",
          { month: "long", day: "numeric", year: "numeric" }
        )}. To ensure uninterrupted access to all features and services, we recommend renewing your subscription before it expires.\nSubscription Details:\nPlan: ${
          theme.themeName
        }\nExpiration Date: ${theme.expiredAt.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}\nTo renew your subscription, simply click the button below:\n[https://www.automotivewebsolutions.com]\nIf you have any questions or need assistance with the renewal process, please don’t hesitate to reach out to our support team.\nThank you for choosing us — we look forward to continuing to serve you.\n\nBest regards,\nAutomotive Web Solutions\nCustomer Support Team\nsales@automotivewebsolutions.com\nhttps://www.automotivewebsolutions.com`,
      });

      theme.reminderSent = true;
      await theme.save();
      remindersSent++;
    }
    const expirations = await Theme.find({
      expiredAt: { $gte: today, $lt: tomorrow },
      activeTheme: true,
      emailSent: false,
    }).populate("userId");

    for (const theme of expirations) {
      const user = theme.userId;
      if (!user || !user.email) continue;

      await sendEmail({
        to: user.email,
        subject: `Your Theme Has Expired – Reactivate to Continue Access`,
        text: `Dear ${
          user.name || "User"
        },\nWe wanted to inform you that your subscription with Automotive Web Solutions has expired as of ${theme.expiredAt.toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )}.\nAs a result, your access to premium features and services has been paused. To resume uninterrupted access and continue enjoying all benefits, we invite you to renew your subscription at your earliest convenience.\nSubscription Details:\nPlan: ${
          theme.themeName
        }Expiration Date: ${theme.expiredAt.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}\nStatus: Expired\nClick below to renew your subscription now:\n[https://www.automotivewebsolutions.com]\nIf you need any help or have questions about your account, our support team is here for you.\nThank you for being a valued part of our community. We’d love to have you back!\n\nWarm regards,\nAutomotive Web Solutions\nCustomer Support Team\nsales@automotivewebsolutions.com\nhttps://www.automotivewebsolutions.com`,
      });
      await sendEmail({
        to: config.emailReceiver,
        subject: `Theme Expired`,
        text: `A User's ${
          theme.themeName
        } has expired. Please take necessary actions against the following user:\n Userid: ${
          user._id
        }\n Name: ${user.name}\n Email: ${
          user.email
        }\n SubscribedAt: ${new Date(
          theme.subscribedAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        )} \n ExpiredAt: ${new Date(
          theme.expiredAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        )}`,
      });
      theme.emailSent = true;
      theme.activeTheme = false;
      theme.isActive = false;
      await theme.save();
      expirationsSent++;
    }

    const rowsAffected = remindersSent + expirationsSent;

    return NextResponse.json({
      success: true,
      remindersSent,
      expirationsSent,
      rowsAffected,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
