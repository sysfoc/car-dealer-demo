import mongoose from "mongoose";

const addonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    subscribedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

const Addon = mongoose.models.Addon || mongoose.model("Addon", addonSchema);
export default Addon;
