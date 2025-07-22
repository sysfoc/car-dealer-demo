import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import Addon from "@/app/model/addon.model";
import Subscription from "@/app/model/subscription.model";
import Domain from "@/app/model/domain.model";
import Billing from "@/app/model/billing.model";
import Refund from "@/app/model/refund.model";
import Payment from "@/app/model/payment.model";
import Support from "@/app/model/support.model";
import Theme from "@/app/model/theme.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const user = await User.findById(id).select("-password");
  if (user) {
    const [addons, subscription, domain, billing, refunds, payments, support] =
      await Promise.all([
        Addon.find({ userId: id }).select("-userId").lean(),
        Subscription.find({ userId: id }).populate("themes").lean(),
        Domain.find({ userId: id }).select("-userId").lean(),
        Billing.findOne({ userId: id }).select("-userId").lean(),
        Refund.find({ userId: id }).select("-userId").lean(),
        Payment.find({ userId: id }).select("-userId").lean(),
        Support.find({ userId: id }).select("-userId").lean(),
      ]);

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
