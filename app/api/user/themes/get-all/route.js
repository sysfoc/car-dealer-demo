import { connectToDatabase } from "@/app/api/utils/db";
import Theme from "@/app/model/theme.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/app/model/user.model";
import { sendEmail } from "@/app/api/utils/send-email";

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
    const themes = await Theme.find({ userId: id });
    const user = await User.findById(id);
    if (!themes || themes.length === 0) {
      return NextResponse.json(
        { message: "No themes found, please create one" },
        { status: 404 }
      );
    }

    const today = new Date();

    const updates = await Promise.all(
      themes.map(async (theme) => {
        const expiredAt = new Date(theme.expiredAt);
        const threeDaysBefore = new Date(expiredAt);
        threeDaysBefore.setDate(expiredAt.getDate() - 3);

        if (
          theme.isActive &&
          !theme.reminderSent &&
          today >= threeDaysBefore &&
          today < expiredAt
        ) {
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
            })}\nTo renew your subscription, simply click the button below:\n[https://www.automotivewebsolutions.com]\nIf you have any questions or need assistance with the renewal process, please don’t hesitate to reach out to our support team.\nThank you for choosing us — we look forward to continuing to serve you.\n\nBest regards,\nAutomotiv Web Solutions\nCustomer Support Team\ninfo@sysfoc.com\nhttps://www.automotivewebsolutions.com`,
          });

          theme.reminderSent = true;
          await theme.save();
        }
        if (theme.expiredAt && expiredAt <= today && theme.isActive) {
          theme.isActive = false;

          if (!theme.emailSent) {
            await sendEmail({
              to: user.email,
              subject: `Your Theme Has Expired – Reactivate to Continue Access`,
              text: `Dear ${
                user.name || "User"
              },\nWe wanted to inform you that your subscription with Automotiv Web Solutions has expired as of ${theme.expiredAt.toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}.\nAs a result, your access to premium features and services has been paused. To resume uninterrupted access and continue enjoying all benefits, we invite you to renew your subscription at your earliest convenience.\nSubscription Details:\nPlan: ${
                theme.themeName
              }\nExpiration Date: ${theme.expiredAt.toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}\nStatus: Expired\nClick below to renew your subscription now:\n[https://www.automotivewebsolutions.com]\nIf you need any help or have questions about your account, our support team is here for you.\nThank you for being a valued part of our community. We’d love to have you back!\n\nWarm regards,\nAutomotiv Web Solutions\nCustomer Support Team\ninfo@sysfoc.com\nhttps://www.automotivewebsolutions.com`,
            });

            await sendEmail({
              to: config.emailReceiver,
              subject: `Theme Expired Alert`,
              text: `'${theme.themeName}' of User ${user.email} has expired. Please take neccessary action against following user:\n Userid: ${user._id}\n Name: ${user.name}\n Email: ${user.email}`,
            });

            theme.emailSent = true;
          }

          await theme.save();
        }

        return theme;
      })
    );
    return NextResponse.json({ themes: updates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
