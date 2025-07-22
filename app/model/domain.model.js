import mongoose from "mongoose";

const domainSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    domainName: {
      type: String,
      required: true,
      trim: true,
    },
    domainRegistrar: {
      type: String,
      required: true,
      trim: true,
    },
    domainStatus: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    domainUsername: {
      type: String,
      required: true,
      trim: true,
    },
    domainPassword: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Domain = mongoose.models.Domain || mongoose.model("Domain", domainSchema);
export default Domain;
