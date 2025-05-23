import mongoose from "mongoose";

export const themeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    themeName: {
      type: String,
      required: true,
      trim: true,
    },
    themePrice: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activeTheme: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Theme = mongoose.models.Theme || mongoose.model("Theme", themeSchema);
export default Theme;
