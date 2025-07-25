import { connectToDatabase } from "@/app/api/utils/db";
import Refund from "@/app/model/refund.model";
import { NextResponse } from "next/server";
import Notification from "@/app/model/notification.model";
import User from "@/app/model/user.model";
import { sendEmail } from "@/app/api/utils/send-email";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(req, { params }) {
  await connectToDatabase();
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const adminToken = cookieStore.get("admin")?.value;

  if (!token || !adminToken) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  let decodedUser, decodedAdmin;

  try {
    decodedUser = jwt.verify(token, config.jwtSecretKey);
  } catch (err) {
    return NextResponse.json({ error: "Invalid user token" }, { status: 403 });
  }

  try {
    decodedAdmin = jwt.verify(adminToken, config.jwtSecretKey);
  } catch (err) {
    return NextResponse.json({ error: "Invalid admin token" }, { status: 403 });
  }
  if (!decodedUser?.id || !decodedAdmin?.admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }
  const { id } = params;
  const status = await req.json();
  const refund = await Refund.findById(id);
  if (!refund) {
    return NextResponse.json({ message: "Refund not found" }, { status: 404 });
  }
  const updatedRefund = await Refund.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true }
  );
  const user = await User.findById(refund.userId);
  if (status === "approved") {
    await sendEmail({
      to: user.email,
      subject: "Refund approved",
      text: `Hello ${user.name}, your refund request against order ${refund.orderId} has been approved.`,
    });
    await Notification.create({
      type: "success",
      title: "Refund approved",
      message: "Your refund request has been approved",
      userId: updatedRefund.userId,
    });
  } else if (status === "rejected") {
    await sendEmail({
      to: user.email,
      subject: "Refund rejected",
      text: `Hello ${user.name}, your refund request against order ${refund.orderId} has been Rejected.`,
    });
    await Notification.create({
      type: "error",
      title: "Refund rejected",
      message: "Your refund request has been rejected",
      userId: updatedRefund.userId,
    });
  }
  return NextResponse.json({ updatedRefund }, { status: 200 });
}
