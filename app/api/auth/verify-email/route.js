import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  try {
    const user = await User.findOne({ email, verifyToken: token });

    if (!user || user.verifyTokenExpiry < Date.now()) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully! You can now login" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
