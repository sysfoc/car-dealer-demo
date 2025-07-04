import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/app/api/utils/db";
import Payment from "@/app/model/payment.model";
import Subscription from "@/app/model/subscription.model";
import Theme from "@/app/model/theme.model";
import Notification from "@/app/model/notification.model";
import Addon from "@/app/model/addon.model";
import User from "@/app/model/user.model";
import { sendEmail } from "@/app/api/utils/send-email";

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
  const timePeriod = session.metadata?.timePeriod;

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (plan.includes("add-on")) {
    const existingAddon = await Addon.findOne({
      userId: user._id,
      serviceName: plan,
    });

    if (existingAddon && existingAddon.isActive) {
      return NextResponse.json(
        { error: `You already have the "${plan}" add-on subscribed.` },
        { status: 400 }
      );
    }

    if (existingAddon && !existingAddon.isActive) {
      await Addon.findOneAndUpdate(
        { userId: user._id, serviceName: plan },
        {
          $set: {
            isActive: true,
            subscribedAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        }
      );
      await sendEmail({
        to: user.email,
        subject: "Addon Renewal",
        text: `You have successfully renewed your "${plan.slice(
          0,
          -6
        )}" add-on subscription.`,
      });
      await Notification.create({
        userId,
        type: "success",
        title: "Addon Renewal",
        message: `You have successfully renewed your "${plan.slice(
          0,
          -6
        )}" add-on subscription.`,
      });
    } else {
      await Addon.create({
        userId: user._id,
        serviceName: plan,
        servicePrice: price,
        subscribedAt: new Date(),
        expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      });
      await sendEmail({
        to: user.email,
        subject: "Addon Subscription",
        text: `You have successfully subscribed to "${plan.slice(
          0,
          -6
        )}" add-on.`,
      });
      await Notification.create({
        userId: user._id,
        type: "success",
        title: "Addon Subscription",
        message: `You have successfully subscribed to "${plan.slice(
          0,
          -6
        )}" add-on.`,
      });
    }
  } else if (plan.includes("theme")) {
    const existingTheme = await Theme.findOne({
      userId: user._id,
      themeName: plan,
    });

    if (existingTheme && existingTheme.isActive) {
      return NextResponse.json(
        { error: `You already have the "${plan}" theme subscribed.` },
        { status: 400 }
      );
    }

    if (existingTheme && !existingTheme.isActive) {
      await Theme.findOneAndUpdate(
        { userId: user._id, themeName: plan },
        {
          $set: {
            isActive: true,
            subscribedAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        }
      );
      await sendEmail({
        to: user.email,
        subject: "Theme Renewal",
        text: `You have successfully renewed your "${plan.slice(
          0,
          -6
        )}" theme subscription.`,
      });
      await Notification.create({
        userId: user._id,
        type: "success",
        title: "Theme Renewal",
        message: `You have successfully renewed your "${plan.slice(
          0,
          -6
        )}" theme subscription.`,
      });
    } else {
      await Theme.create({
        userId: user._id,
        themeName: plan,
        themePrice: price,
        subscribedAt: new Date(),
        expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      });
      await sendEmail({
        to: user.email,
        subject: "Theme Subscription",
        text: `You have successfully subscribed to "${plan.slice(
          0,
          -6
        )}" theme.`,
      });
      await Notification.create({
        userId,
        type: "success",
        title: "Theme Subscription",
        message: `You have successfully subscribed to "${plan.slice(
          0,
          -6
        )}" theme.`,
      });
    }
  } else {
    const existingSubscription = await Subscription.findOne({
      userId: user._id,
      subscriptionPlan: timePeriod,
      subscriptionType: plan,
    });

    if (existingSubscription && existingSubscription.isActive) {
      return NextResponse.json(
        { error: "You already have an active subscription." },
        { status: 400 }
      );
    }
    await Subscription.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          subscriptionType: plan,
          subscriptionPlan: timePeriod,
          startDate: new Date(),
          endDate: new Date(
            Date.now() +
              (timePeriod === "Yearly" ? 365 : 30) * 24 * 60 * 60 * 1000
          ),
          isActive: true,
        },
      },
      { upsert: true, new: true }
    );
  }
  await Payment.create({
    userId: user._id,
    customerId: session.customer,
    product: plan,
    paymentMethod: "Stripe",
    productPrice: price,
    productPlan: timePeriod || "Monthly",
    transactionDate: new Date(),
  });
  await sendEmail({
    to: user.email,
    subject: "Subscription",
    text: `You have successfully subscribed to "${plan}" plan.`,
  });
  await Notification.create({
    userId: user._id,
    type: "success",
    title: "Subscription",
    message: `You have successfully subscribed to "${plan}" plan.`,
  });
  return NextResponse.redirect(`${process.env.BASE_URL}/user/dashboard`);
}
