import { connectToDatabase } from "@/app/api/utils/db";
import { NextResponse } from "next/server";
import Refund from "@/app/model/refund.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { config } from "@/app/api/utils/env-config";
import Notification from "@/app/model/notification.model";
import User from "@/app/model/user.model";
import { sendEmail } from "@/app/api/utils/send-email";

export async function POST(req) {
  await connectToDatabase();
  const { orderId, amount, email, refundMethod, reason } = await req.json();
  if (!orderId || !amount || !email || !refundMethod || !reason) {
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
    const user = await User.findById(id);
    await Refund.create({
      userId: id,
      orderId,
      amount,
      email,
      refundMethod,
      reason,
    });
    await sendEmail({
      to: config.emailReceiver,
      subject: "Refund Request - Automotive Web Solutions",
      text: `A User has submitted a refund request, Please take neccessary actions:\nName: ${user.name}\nEmail: ${user.email}\nOrder ID: ${orderId}\nRequested Email: ${email}\nAmount: $${amount}\nRefund Method: ${refundMethod}\nReason: ${reason}`,
    });
    await Notification.create({
      type: "success",
      title: "Refund Request",
      message: `Your refund request has been sent and will be processed soon`,
      userId: id,
    });
    return NextResponse.json(
      { message: "Refund request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
