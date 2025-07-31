import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import Setting from "@/app/model/setting.model";
import { NextResponse } from "next/server";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectToDatabase();
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
  const settings = await Setting.findOne({ userId: id });
  if (!settings) {
    return NextResponse.json(
      { message: "Settings not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ settings }, { status: 200 });
}
