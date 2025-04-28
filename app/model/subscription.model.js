import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriptionType: {
      type: String,
      enum: ["Basic", "Standard", "Premium"],
      default: "Basic",
    },
    subscriptionPlan: {
      type: String,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },
    addOnServices: [
      {
        serviceName: {
          type: String,
          required: true,
        },
        servicePrice: {
          type: Number,
          required: true,
        },
        isActive: {
          type: Boolean,
          default: false,
        },
      },
    ],
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.models.Subscription ||mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
