import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import Addon from "@/app/model/addon.model";
import Subscription from "@/app/model/subscription.model";
import Domain from "@/app/model/domain.model";
import Refund from "@/app/model/refund.model";
import Payment from "@/app/model/payment.model";
import Support from "@/app/model/support.model";
import "@/app/model/theme.model";
import { NextResponse } from "next/server";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
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
  const user = await User.findById(id).select("-password");
  if (user) {
    const [addons, subscription, domain, refunds, payments, support] =
      await Promise.all([
        Addon.find({ userId: id })
          .sort({ createdAt: -1 })
          .select("-userId")
          .lean(),
        Subscription.find({ userId: id }).populate("themes").lean(),
        Domain.find({ userId: id })
          .sort({ createdAt: -1 })
          .select("-userId")
          .lean(),
        Refund.find({ userId: id })
          .sort({ createdAt: -1 })
          .select("-userId")
          .lean(),
        Payment.find({ userId: id })
          .sort({ createdAt: -1 })
          .select("-userId")
          .lean(),
        Support.find({ userId: id })
          .sort({ createdAt: -1 })
          .select("-userId")
          .lean(),
      ]);

    const record = {
      user,
      addons,
      subscription,
      domain,
      refunds,
      payments,
      support,
    };
    return NextResponse.json({ record }, { status: 200 });
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
