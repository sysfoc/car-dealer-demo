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
            subject: `Reminder: Your '${theme.themeName}' theme will expire soon`,
            text: `Dear user, your '${
              theme.themeName
            }' will expire on ${new Date(
              theme.expiredAt.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            )} at ${theme.expiredAt.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}. Please take action to renew.`,
          });

          theme.reminderSent = true;
          await theme.save();
        }
        if (theme.expiredAt && expiredAt <= today && theme.isActive) {
          theme.isActive = false;

          if (!theme.emailSent) {
            await sendEmail({
              to: user.email,
              subject: `Theme Expired: ${theme.themeName}`,
              text: `Your theme '${theme.themeName}' has expired. Please renew it to continue using our services.`,
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
