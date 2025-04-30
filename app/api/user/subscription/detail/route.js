import { connectToDatabase } from "@/app/api/utils/db";
import Subscription from "@/app/model/subscription.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function GET(req) {
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
    const subscription = await Subscription.findOne({ userId: id, isActive: true }).sort({ createdAt: -1 }).limit(1);
    if (!subscription) {
      return NextResponse.json(
        { message: "No subscription not found, please create one" },
        { status: 404 }
      );
    }
    return NextResponse.json({ subscription }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
