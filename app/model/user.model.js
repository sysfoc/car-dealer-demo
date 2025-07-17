import mongoose from "mongoose";

const userScheama = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    signupMethod: {
      type: String,
      enum: ["email", "google", "github"],
      default: "email",
    },
    profileImg: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/043/361/860/large_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg",
    },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userScheama);
export default User;
