import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import Payment from "@/app/model/payment.model";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";
import Addon from "@/app/model/addon.model";
import User from "@/app/model/user.model";
import { connectToDatabase } from "@/app/api/utils/db";
import { sendEmail } from "@/app/api/utils/send-email";

const clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SANDBOX_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req) {
  await connectToDatabase();
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

    let userId = "";
    let plan = "";
    let price = null;
    let timePeriod = "";

    if (customId) {
      const parts = customId.split("__");
      if (parts.length === 4) {
        [userId, plan, price, timePeriod] = parts;
      }
    }
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
          text: `${user.name}! your "${plan.slice(
            0,
            -6
          )}" add-on subscription has been renewed.`,
        });
        await Notification.create({
          userId: user._id,
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
          text: `${
            user.name
          }! you have successfully subscribed to "${plan.slice(
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
          {
            error: `You already have the "${plan.slice(
              0,
              -6
            )}" theme subscribed.`,
          },
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
          text: `${user.name}! your "${plan.slice(
            0,
            -6
          )}" theme subscription has been renewed.`,
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
          text: `${
            user.name
          }! you have successfully subscribed to "${plan.slice(0, -6)}" theme.`,
        });
        await Notification.create({
          userId: user._id,
          type: "success",
          title: "Theme Subscription",
          message: `You have successfully subscribed to "${plan.slice(
            0,
            -6
          )}" theme.`,
        });
      }
    } else {
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
      customerId: "Paypal-user",
      product: plan,
      paymentMethod: "PayPal",
      productPrice: price,
      productPlan: timePeriod || "Monthly",
      transactionDate: new Date(),
    });
    await sendEmail({
      to: user.email,
      subject: "Subscription",
      text: `${user.name}! you have successfully subscribed to "${plan}" plan.`,
    });
    await Notification.create({
      userId: user._id,
      type: "success",
      title: "Subscription",
      message: `You have successfully subscribed to "${plan}" plan.`,
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
