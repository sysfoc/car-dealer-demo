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
      trim: true,
    },
    domainRegistrar: {
      type: String,
      trim: true,
    },
    domainStatus: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    domainUsername: {
      type: String,
      trim: true,
    },
    domainPassword: {
      type: String,
      trim: true,
    },
    customDomain: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Domain = mongoose.models.Domain || mongoose.model("Domain", domainSchema);
export default Domain;
