import User from "@/app/model/user.model";
import Notification from "@/app/model/notification.model";
import Payment from "@/app/model/payment.model";
import Billing from "@/app/model/billing.model";
import Refund from "@/app/model/refund.model";
import Subscription from "@/app/model/subscription.model";
import Addon from "@/app/model/addon.model";
import { connectToDatabase } from "@/app/api/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  await Notification.deleteMany({ userId: id });
  await Billing.deleteMany({ userId: id });
  await Payment.deleteMany({ userId: id });
  await Refund.deleteMany({ userId: id });
  await Addon.deleteMany({ userId: id });
  await Subscription.deleteMany({ userId: id });
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
