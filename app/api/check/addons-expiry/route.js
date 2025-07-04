import { NextResponse } from "next/server";
import { connectToDatabase as dbConnect } from "@/app/api/utils/db";
import Addon from "@/app/model/addon.model";
import "@/app/model/user.model";
import { sendEmail } from "@/app/api/utils/send-email";
import { config } from "@/app/api/utils/env-config";

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

    const reminders = await Addon.find({
      expiredAt: { $gte: threeDaysFromNow, $lt: threeDaysEnd },
      activeAddon: true,
      reminderSent: false,
    }).populate("userId");

    for (const addon of reminders) {
      const user = addon.userId;
      if (!user || !user.email) continue;

      await sendEmail({
        to: user.email,
        subject: `Reminder: ${addon.serviceName} will expire soon`,
        text: `Hi ${user.name || "User"},\n\nYour add-on (${
          addon.serviceName
        }) will expire in 3 days.\nPlease renew to continue using the service.\n\nThank you.`,
      });

      addon.reminderSent = true;
      await addon.save();
      remindersSent++;
    }

    const expirations = await Addon.find({
      expiredAt: { $gte: today, $lt: tomorrow },
      activeAddon: true,
      emailSent: false,
    }).populate("userId");

    for (const addon of expirations) {
      const user = addon.userId;
      if (!user || !user.email) continue;

      await sendEmail({
        to: user.email,
        subject: `Expired: ${addon.serviceName} Subscription`,
        text: `Hi ${user.name || "User"},\n\nYour add-on (${
          addon.serviceName
        }) has expired today.\nPlease renew to continue using it.\n\nThanks.`,
      });
      await sendEmail({
        to: config.emailReceiver,
        subject: "Addon Expired Alert",
        text: `${addon.serviceName} of user ${
          user.email
        } has expired. Please take necessary action against following user: \n UserId: ${
          user._id
        } \n Name: ${user.name} \n Email: ${
          user.email
        } \n SubscribedAt: ${new Date(
          addon.createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        )} \n ExpiredAt: ${new Date(
          addon.expiredAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        )}`,
      });
      addon.emailSent = true;
      addon.activeAddon = false;
      addon.isActive = false;
      await addon.save();
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
    console.error("Addon Expiry Job Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
