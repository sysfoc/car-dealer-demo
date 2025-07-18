import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    themes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Theme" }],
    subscriptionType: {
      type: String,
      enum: [
        "Basic",
        "Standard",
        "Premium",
        "Yearly Basic",
        "Yearly Standard",
        "Yearly Premium",
      ],
      default: "Basic",
    },
    subscriptionPlan: {
      type: String,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    emailSent: { type: Boolean, default: false },
    reminderSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
