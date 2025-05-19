import { connectToDatabase } from "@/app/api/utils/db";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

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
    const subscription = await Subscription.findOne({
      userId: id,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(1);
    const today = new Date();

    if (
      subscription &&
      subscription.endDate &&
      new Date(subscription.endDate) <= today
    ) {
      await Subscription.findByIdAndUpdate(subscription._id, {
        isActive: false,
      });
      subscription.isActive = false;
      await Notification.create({
        type: "error",
        title: "Subscription Expired",
        message: `Your subscription that has to be expired on ${new Date(
          subscription.endDate
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} has expired. Please renew your subscription to continue using our services. Thank you for your support!`,
        userId: id,
      });
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
