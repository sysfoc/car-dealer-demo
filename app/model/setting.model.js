import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    emailOtp: {
      type: Boolean,
      default: true,
    },
    phoneOtp: {
      type: Boolean,
      default: false,
    },
    readOnlyAccount: {
      type: Boolean,
      default: false,
    },
    allowUsersToAddPaymentGateway: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
