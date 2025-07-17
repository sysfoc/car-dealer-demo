import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import Notification from "@/app/model/notification.model";
import { NextResponse } from "next/server";
import { comparePassword } from "@/app/api/utils/hashing";
import { config } from "@/app/api/utils/env-config";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectToDatabase();
  const { email, password } = await req.json();
  if (!email || !password) {
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
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist.isVerified) {
      return NextResponse.json(
        { message: "Please check your email and verify your account first!" },
        { status: 400 }
      );
    }
    if (!isUserExist) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    } else {
      const isPasswordMatch = await comparePassword(
        password,
        isUserExist.password
      );
      if (!isPasswordMatch) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 400 }
        );
      } else {
        const token = jwt.sign({ id: isUserExist._id }, config.jwtSecretKey);
        const response = NextResponse.json(
          {
            message: "User logged in successfully",
            user: {
              _id: isUserExist._id,
              name: isUserExist.name,
              email: isUserExist.email,
              role: isUserExist.role,
              userAgent: req.headers.get("user-agent"),
              signupMethod: isUserExist.signupMethod,
              createdAt: isUserExist.createdAt,
              updatedAt: isUserExist.updatedAt,
              profileImg: isUserExist.profileImg,
            },
          },
          { status: 200 }
        );
        if (isUserExist.role === "admin") {
          const token = jwt.sign({ admin: true }, config.jwtSecretKey);
          response.cookies.set("admin", token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            path: "/",
            priority: "high",
          });
        }
        response.cookies.set("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
          path: "/",
          priority: "high",
        });
        await Notification.create({
          userId: isUserExist._id,
          type: "success",
          title: "Login",
          message: `Welcome back! ${isUserExist.name} to your account`,
        });
        return response;
      }
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error logging in user", error: err },
      { status: 500 }
    );
  }
}
