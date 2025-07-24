import User from "@/app/model/user.model";
import Notification from "@/app/model/notification.model";
import Payment from "@/app/model/payment.model";
import Domain from "@/app/model/domain.model";
import Refund from "@/app/model/refund.model";
import Subscription from "@/app/model/subscription.model";
import Addon from "@/app/model/addon.model";
import Contact from "@/app/model/contact.model";
import Support from "@/app/model/support.model";
import Theme from "@/app/model/theme.model";
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
  await Domain.deleteMany({ userId: id });
  await Payment.deleteMany({ userId: id });
  await Refund.deleteMany({ userId: id });
  await Addon.deleteMany({ userId: id });
  await Subscription.deleteMany({ userId: id });
  await Contact.deleteMany({ userId: id });
  await Support.deleteMany({ userId: id });
  await Theme.deleteMany({ userId: id });

  const response = NextResponse.json(
    { message: "User deleted successfully" },
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

  return response;
}
