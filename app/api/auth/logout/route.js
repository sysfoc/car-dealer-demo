import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
import Notification from "@/app/model/notification.model";
import { cookies } from "next/headers";
import { config } from "@/app/api/utils/env-config";
import jwt from "jsonwebtoken";

export async function POST() {
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
  const response = NextResponse.json(
    { message: "Successfully logged out." },
    { status: 200 }
  );
  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  });

  response.cookies.set({
    name: "admin",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  });

  await Notification.create({
    type: "error",
    title: "Logged out",
    message: "Your current session was logged out",
    userId: id,
  });
  return response;
}
