import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import Payment from "@/app/model/payment.model";
import Subscription from "@/app/model/subscription.model";
import Notification from "@/app/model/notification.model";
import Addon from "@/app/model/addon.model";
import User from "@/app/model/user.model";
import Theme from "@/app/model/theme.model";
import { connectToDatabase } from "@/app/api/utils/db";
import { sendEmail } from "@/app/api/utils/send-email";

const clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SANDBOX_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req) {
  await connectToDatabase();
  try {
    const { token, data } = await req.json();
    if (!token || !data) {
      return NextResponse.json(
        { error: "Missing token or payload" },
        { status: 400 }
      );
    }

    const payloadStr = Buffer.from(data, "base64").toString();
    const { userId, plan, price, timePeriod, themes } = JSON.parse(payloadStr);

    const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
    captureRequest.requestBody({});
    const capture = await client.execute(captureRequest);

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
          )}" add-on subscription.\nThank you for continuing to use our services. Your subscription has been extended, and all associated features remain active. If you have any questions or need support, feel free to reach out to us.\n\nBest regards,\nAutomotive Web Solutions\nCustomer Support Team\ninfo@sysfoc.com\nhttps://www.automotivewebsolutions.com`,
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
          subject: "Addon Subscription – Activation & Details",
          text: `Dear ${
            user.name || "User"
          },\n\nWe would like to inform you that your Addon Subscription has been successfully activated!. This subscription gives you access to additional features designed to enhance your experience and streamline your workflow.\n\nSubscription Summary:\nAddon Name: ${plan.slice(
            0,
            -6
          )}\nStart Date: ${new Date().toLocaleDateString()}\nBilling Cycle: Monthly\nAmount: $${price}\n\nYou can manage your subscription, update billing details, or cancel anytime by visiting your Account Settings or contacting our support team.\nIf you have any questions or require assistance, feel free to reply to this email or reach out to our support team at sysfoc@gmail.com.\n\nThank you for choosing us!\n\nBest regards,\nAutomotive Web Solutions\nCustomer Support Team\ninfo@sysfoc.com\nhttps://www.automotivewebsolutions.com`,
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
      const themeDocs = await Promise.all(
        themes.map((themeName) =>
          Theme.findOneAndUpdate(
            { userId: user._id, themeName },
            {
              $set: {
                isActive: true,
                subscribedAt: new Date(),
                expiredAt: new Date(
                  Date.now() +
                    (timePeriod === "Yearly" ? 365 : 30) * 24 * 60 * 60 * 1000
                ),
              },
            },
            { upsert: true, new: true }
          )
        )
      );
      const themeIds = themeDocs.map((themeDoc) => themeDoc._id);
      await Subscription.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            subscriptionType: plan,
            subscriptionPlan: timePeriod,
            themes: themeIds,
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

      await sendEmail({
        to: user.email,
        subject: "Subscription",
        text: `Dear ${
          user.name || "User"
        },\n\nWe would like to inform you that your Subscription has been successfully activated!. This subscription gives you access to additional features designed to enhance your experience and streamline your workflow.\n\nSubscription Summary:\nSubscription Name: ${plan}\nStart Date: ${new Date().toLocaleDateString()}\nBilling Cycle: Monthly\nAmount: $${price}\n\nYou can manage your subscription, update billing details, or cancel anytime by visiting your Account Settings or contacting our support team.\nIf you have any questions or require assistance, feel free to reply to this email or reach out to our support team at sysfoc@gmail.com.\n\nThank you for choosing us!\n\nBest regards,\nAutomotive Web Solutions\nCustomer Support Team\ninfo@sysfoc.com\nhttps://www.automotivewebsolutions.com`,
      });
    }

    await Payment.create({
      userId: user._id,
      customerId: "Paypal-user",
      product: `${plan}${themes?.length > 0 ? " Themes: " : ""}${
        themes?.length > 0 ? ` (${themes?.join(", ")})` : ""
      }`,
      paymentMethod: "PayPal",
      productPrice: price,
      productPlan: timePeriod || "Monthly",
      transactionDate: new Date(),
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
