import { connectToDatabase } from "@/app/api/utils/db";
import Addon from "@/app/model/addon.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
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
    const addons = await Addon.find({ userId: id });

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

        // 3 days before expiration
        const threeDaysBefore = new Date(expiredDate);
        threeDaysBefore.setDate(expiredDate.getDate() - 3);

        // === Reminder 3 days before expiration ===
        if (
          addon.isActive &&
          !addon.reminderSent &&
          today >= threeDaysBefore &&
          today < expiredDate
        ) {
          await sendEmail({
            to: "hamzafullstackdev1@gmail.com", // assume addon has a userEmail field
            subject: "Reminder: Addon Expiring Soon",
            text: `Your addon will expire on ${expiredDate.toDateString()}. Please take necessary action.`,
          });

          addon.reminderSent = true;
          await addon.save();
        }

        // === Expiration Handling ===
        if (addon.isActive && expiredDate <= today && !addon.emailSent) {
          addon.isActive = false;

          await sendEmail({
            to: "hamzafullstackdev1@gmail.com",
            subject: "Addon Expired",
            text: `Your addon expired has expired. Please renew to continue using the service.`,
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
