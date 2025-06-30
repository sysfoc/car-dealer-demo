import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import User from "@/app/model/user.model";

const clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SANDBOX_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req) {
  try {
    const { userId, plan, price, timePeriod } = await req.json();

    if (!userId || !plan || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const userExist = await User.findById(userId);
    if (userExist) {
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price.toString(),
            },
            description: `Subscription plan: ${plan}`,
            custom_id: `${userId}__${plan}__${price}__${timePeriod}`,
          },
        ],
        application_context: {
          return_url: `${process.env.BASE_URL}/payment/success`,
          cancel_url: `${process.env.BASE_URL}/failed-payment`,
        },
      });

      const order = await client.execute(request);

      const approvalUrl = order.result.links.find(
        (link) => link.rel === "approve"
      )?.href;

      if (!approvalUrl) {
        return NextResponse.json(
          { error: "Unable to create PayPal session" },
          { status: 500 }
        );
      }

      return NextResponse.json({ url: approvalUrl });
    }
  } catch (error) {
    console.error("PayPal Checkout Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
