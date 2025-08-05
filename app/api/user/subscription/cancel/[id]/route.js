import { connectToDatabase } from "@/app/api/utils/db";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";
import Theme from "@/app/model/theme.model";
import { NextResponse } from "next/server";
import { config } from "@/app/api/utils/env-config";
import { sendEmail } from "@/app/api/utils/send-email";

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const subscription = await Subscription.findByIdAndDelete(id);
  if (!subscription) {
    return NextResponse.json(
      { message: "Subscription not found" },
      { status: 404 }
    );
  }
  await Theme.deleteMany({ userId: subscription.userId });
  await sendEmail({
    to: config.emailReceiver,
    subject: "Subscription Cancellation",
    text: `Dear Automotive Web Solutions!\n\nA user has just canceled their subscription. Please find the user details below:\n\nUserId: ${subscription.userId}\nSubscription Plan: ${subscription.subscriptionType}\nSubscription Cycle: ${subscription.subscriptionPlan}\n\nPlease take appropriate action.\n\nBest Regards,\nAutomotive Web Solutions`,
  });
  await Notification.create({
    type: "failure",
    title: "Subscription Canceled",
    message: `Your subscription has been canceled`,
    userId: subscription.userId,
  });
  return NextResponse.json(
    { message: "Subscription canceled successfully" },
    { status: 200 }
  );
}
