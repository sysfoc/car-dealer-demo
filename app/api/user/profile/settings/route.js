import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import Setting from "@/app/model/setting.model";
import { NextResponse } from "next/server";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function PATCH(req) {
  await connectToDatabase();
  const { location, currency } = await req.json();
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
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const updateSettings = await Setting.findOneAndUpdate(
      { userId: id },
      { location, currency },
      { upsert: true, new: true }
    );
    if (!updateSettings) {
      return NextResponse.json(
        { message: "Failed to update settings" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Settings updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
