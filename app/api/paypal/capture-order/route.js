import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import Payment from "@/app/model/payment.model";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";
import Addon from "@/app/model/addon.model";

const clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SANDBOX_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client.execute(request);

    const purchaseUnit = capture.result.purchase_units?.[0];
    const customId =
      purchaseUnit?.payments?.captures?.[0]?.custom_id ||
      purchaseUnit?.custom_id;

    let userId = null;
    let plan = null;
    let price = null;

    if (customId) {
      const parts = customId.split("__");
      if (parts.length === 3) {
        [userId, plan, price] = parts;
      }
    }
    if (plan.includes("add-on")) {
      const existingAddon = await Addon.findOne({ userId, serviceName: plan });

      if (existingAddon && existingAddon.isActive) {
        return NextResponse.json(
          { error: `You already have the "${plan}" add-on subscribed.` },
          { status: 400 }
        );
      }

      if (existingAddon && !existingAddon.isActive) {
        await Addon.findOneAndUpdate(
          { userId, serviceName: plan },
          {
            $set: {
              isActive: true,
              subscribedAt: new Date(),
              expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          }
        );

        await Notification.create({
          userId,
          type: "success",
          title: "Addon Renewal",
          message: `You have successfully renewed your ${plan} add-on subscription.`,
        });
      } else {
        await Addon.create({
          userId,
          serviceName: plan,
          servicePrice: price,
          subscribedAt: new Date(),
          expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          isActive: true,
        });

        await Notification.create({
          userId,
          type: "success",
          title: "Addon Subscription",
          message: `You have successfully subscribed to ${plan} add-on.`,
        });
      }
    } else if (plan.includes("theme")) {
      const existingTheme = await Theme.findOne({ userId, themeName: plan });

      if (existingTheme && existingTheme.isActive) {
        return NextResponse.json(
          { error: `You already have the "${plan}" theme subscribed.` },
          { status: 400 }
        );
      }

      if (existingTheme && !existingTheme.isActive) {
        await Theme.findOneAndUpdate(
          { userId, themeName: plan },
          {
            $set: {
              isActive: true,
              subscribedAt: new Date(),
              expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          }
        );

        await Notification.create({
          userId,
          type: "success",
          title: "Theme Renewal",
          message: `You have successfully renewed your ${plan} theme subscription.`,
        });
      } else {
        await Theme.create({
          userId,
          themeName: plan,
          themePrice: price,
          subscribedAt: new Date(),
          expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          isActive: true,
        });
        await Notification.create({
          userId,
          type: "success",
          title: "Theme Subscription",
          message: `You have successfully subscribed to ${plan} theme.`,
        });
      }
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
      customerId: "Paypal-user",
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

    return NextResponse.json({
      status: "success",
      details: capture.result,
    });
  } catch (error) {
    console.error("PayPal Capture Error:", error);
    return NextResponse.json({ error: "Capture failed" }, { status: 500 });
  }
}
