import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    reply: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Support =
  mongoose.models.Support || mongoose.model("Support", supportSchema);
export default Support;
