import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import Addon from "@/app/model/addon.model";
import Subscription from "@/app/model/subscription.model";
import Domain from "@/app/model/domain.model";
import Billing from "@/app/model/billing.model";
import Refund from "@/app/model/refund.model";
import Payment from "@/app/model/payment.model";
import Support from "@/app/model/support.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const user = await User.findById(id).select("-password");
  if (user) {
    const addons = await Addon.find({ userId: id }).select("-userId");
    const subscription = await Subscription.find({ userId: id }).populate(
      "themes"
    );
    const domain = await Domain.find({ userId: id }).select("-userId");
    const billing = await Billing.findOne({ userId: id }).select("-userId");
    const refunds = await Refund.find({ userId: id }).select("-userId");
    const payments = await Payment.find({ userId: id }).select("-userId");
    const support = await Support.find({ userId: id }).select("-userId");
    const record = {
      user,
      addons,
      subscription,
      domain,
      billing,
      refunds,
      payments,
      support,
    };
    return NextResponse.json({ record }, { status: 200 });
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
