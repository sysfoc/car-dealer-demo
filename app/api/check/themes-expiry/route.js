import { NextResponse } from "next/server";
import { connectToDatabase as dbConnect } from "@/app/api/utils/db";
import Theme from "@/app/model/theme.model";
import { sendEmail } from "@/app/api/utils/send-email";
import { config } from "@/app/api/utils/env-config";
import "@/app/model/user.model";

export async function GET() {
  try {
    await dbConnect();

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
        subject: `Reminder: ${theme.themeName} will expire soon`,
        text: `Hi ${user.name || "User"},\n\nYour theme (${
          theme.themeName
        }) will expire in 3 days.\nPlease renew to continue using it.\n\nThank you.`,
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
        subject: `Expired: ${theme.themeName} Subscription`,
        text: `Hi ${user.name || "User"},\n\nYour theme (${
          theme.themeName
        }) has expired today.\nPlease renew to continue using it.\n\nThanks.`,
      });
      await sendEmail({
        to: config.emailReceiver,
        subject: `Theme Expired Alert`,
        text: `'${theme.themeName}' of User ${
          user.email
        } has expired. Please take neccessary action against following user:\n Userid: ${
          user._id
        }\n Name: ${user.name}\n Email: ${
          user.email
        }\n SubscribedAt: ${new Date(
          theme.createdAt.toLocaleDateString("en-US", {
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
  } catch (error) {
    console.error("Theme Expiry Job Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
