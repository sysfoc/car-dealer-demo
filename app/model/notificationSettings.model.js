import mongoose from "mongoose";

const NotificationSettingSchema = new mongoose.Schema(
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
const NotificationSetting =  mongoose.models.Notification_Setting || mongoose.model("Notification_Setting", NotificationSettingSchema);
export default NotificationSetting;
