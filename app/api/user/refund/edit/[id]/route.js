import { connectToDatabase } from "@/app/api/utils/db";
import Refund from "@/app/model/refund.model";
import { NextResponse } from "next/server";
import Notification from "@/app/model/notification.model";

export async function POST(req, { params }) {
  await connectToDatabase();
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
  if (status === "approved") {
    await Notification.create({
      type: "success",
      title: "Refund approved",
      message: "Your refund request has been approved",
      userId: updatedRefund.userId,
    });
  } else if (status === "rejected") {
    await Notification.create({
      type: "error",
      title: "Refund rejected",
      message: "Your refund request has been rejected",
      userId: updatedRefund.userId,
    });
  }
  return NextResponse.json({ updatedRefund }, { status: 200 });
}
