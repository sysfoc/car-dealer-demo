import { NextResponse } from "next/server";
import Stripe from "stripe";
import {connectToDatabase} from '@/app/api/utils/db';
import Payment from "@/app/model/payment.model";
import Subscription from "@/app/model/subscription.model";
import Notification from '@/app/model/notification.model';

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

  
  await Subscription.create({
    userId,
    subscriptionType: plan,
    subscriptionPlan: "Monthly",
    startDate: new Date(),
  });

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
