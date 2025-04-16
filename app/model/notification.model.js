import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    billingUpdates: {
      type: Boolean,
      default: false,
    },
    newAddons: {
      type: Boolean,
      default: false,
    },
    paymentsReminder: {
      type: Boolean,
      default: true,
    },
    failedPayments: {
      type: Boolean,
      default: false,
    },
    subscriptionExpiry: {
      type: Boolean,
      default: true,
    },
    upgradePlan: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
