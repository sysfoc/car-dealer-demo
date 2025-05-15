import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productPlan: {
      type: String,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },
    paymentMethod: {
      type: String,
      enum: ["Paypal", "Stripe"],
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
