import { connectToDatabase } from "@/app/api/utils/db";
import Support from "@/app/model/support.model";
import Notification from "@/app/model/notification.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();
  const { subject, description } = await req.json();
  if (!subject || !description) {
    return NextResponse.json(
      { message: "Please fill complete form" },
      { status: 400 }
    );
  }
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
    const support = await Support.create({
      userId: id,
      subject,
      description,
    });
    await Notification.create({
      type: "success",
      title: "Issue raised",
      message: "Issue raised successfully",
      userId: id,
    });
    return NextResponse.json(support, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
