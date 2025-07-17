import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import { NextResponse } from "next/server";
import { hashedPassword } from "@/app/api/utils/hashing";
import { nanoid } from "nanoid";
import { sendEmail } from "@/app/api/utils/send-email";
export async function POST(req) {
  await connectToDatabase();
  const { name, email, password, profileImg, billingDetails } =
    await req.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }
  if (!email.includes("@")) {
    return NextResponse.json(
      { message: "Please enter a valid email address" },
      { status: 400 }
    );
  }
  if (name.length < 3) {
    return NextResponse.json(
      { message: "Name must be at least 3 characters long" },
      { status: 400 }
    );
  }
  try {
    const isExisted = await User.find({ email });
    if (isExisted.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    } else {
      const encryptedPassword = await hashedPassword(password);
      const verifyToken = nanoid();
      const verifyTokenExpiry = Date.now() + 3600000;
      const verifyUrl = `${process.env.BASE_URL}/verify-email?token=${verifyToken}&email=${email}`;
      await User.create({
        name,
        email,
        password: encryptedPassword,
        profileImg,
        billingDetails,
        verifyToken,
        verifyTokenExpiry,
      });

      await sendEmail({
        to: email,
        subject: "Verify your email - Automotiv Web Solutions",
        text: `Please click the link below to verify your email address:\n${verifyUrl}\n\nIf you did not request this email, please ignore it.`,
      });
      return NextResponse.json(
        {
          message:
            "Please check your email! We have sent you a verification link. Once you verify your email, you can log in to your account.",
        },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating user", error: err },
      { status: 500 }
    );
  }
}
