import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueAmount: {
      type: Number,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    addedPaymentGateways: [
      {
        cardType: {
          type: String,
          enum: ["Visa", "MasterCard", "Paypal", "Stripe"],
          required: true,
        },
        cardNumber: {
          type: String,
          required: true,
        },
        expiryDate: {
          type: String,
          required: true,
        },
        cvv: {
          type: String,
          required: true,
        },
        cardHolderName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const billing = mongoose.model("Billing", billingSchema);
export default billing;
