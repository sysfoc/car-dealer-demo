import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import Payment from "@/app/model/payment.model";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";

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
    await Subscription.create({
      userId,
      subscriptionType: plan,
      subscriptionPlan: "Monthly",
      startDate: new Date(),
    });

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
