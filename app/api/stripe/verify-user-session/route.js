import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/app/api/utils/db";
import Payment from "@/app/model/payment.model";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";
import Addon from "@/app/model/addon.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  await connectToDatabase();
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return NextResponse.json(
      { error: "Payment not successful" },
      { status: 400 }
    );
  }

  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan;
  const price = Number(session.amount_total) / 100;

  if (plan.includes("add-on")) {
    const existingAddon = await Addon.findOne({ userId, serviceName: plan, isActive: true });

    if (existingAddon) {
      return NextResponse.json(
        { error: `You already have the "${plan}" add-on subscribed.` },
        { status: 400 }
      );
    }
    await Addon.create({
      userId,
      serviceName: plan,
      servicePrice: price,
      subscribedAt: new Date(),
      expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: true,
    });
  } else {
    await Subscription.findOneAndUpdate(
      { userId },
      {
        $set: {
          subscriptionType: plan,
          subscriptionPlan: "Monthly",
          startDate: new Date(),
        },
      },
      { upsert: true, new: true }
    );
  }
  await Payment.create({
    userId,
    customerId: session.customer,
    product: plan,
    paymentMethod: "Stripe",
    productPrice: price,
    transactionDate: new Date(),
  });

  await Notification.create({
    userId,
    type: "success",
    title: "Subscription",
    message: `You have successfully subscribed to ${plan} plan.`,
  });
  return NextResponse.redirect(`${process.env.BASE_URL}/user/dashboard`);
}
