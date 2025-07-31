import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  currency: {
    type: String,
    trim: true,
    default: "USD",
  },
  location: {
    type: String,
    trim: true,
    default: "Pakistan",
  },
  ipAddress: {
    type: String,
    trim: true,
  },
});

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);
export default Setting;
