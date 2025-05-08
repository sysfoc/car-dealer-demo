import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import Notification from "@/app/model/notification.model";
import { hashedPassword } from "@/app/api/utils/hashing";
import { config } from "@/app/api/utils/env-config";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();
  const { name, email, profileImg } = await req.json();
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      const token = jwt.sign({ id: isUserExist._id }, config.jwtSecretKey);
      const response = NextResponse.json(
        {
          message: "User logged in successfully",
          user: {
            _id: isUserExist._id,
            name: isUserExist.name,
            email: isUserExist.email,
            role: isUserExist.role,
            signupMethod: "google",
            userAgent: req.headers.get("user-agent"),
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
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        name: name,
        email: email,
        signupMethod: "google",
        password: await hashedPassword(generatedPassword),
        profileImg: profileImg,
      });
      try {
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, config.jwtSecretKey);
        const response = NextResponse.json(
          {
            message: "User created successfully",
            user: {
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              signupMethod: newUser.signupMethod,
              userAgent: req.headers.get("user-agent"),
              createdAt: newUser.createdAt,
              updatedAt: newUser.updatedAt,
              profileImg: newUser.profileImg,
            },
          },
          { status: 200 }
        );
        response.cookies.set("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
          path: "/",
          priority: "high",
        });
        await Notification.create({
          userId: newUser._id,
          type: "success",
          title: "Account Created",
          message: `Welcome aboard! ${newUser.name}`,
        });
        return response;
      } catch (error) {
        return NextResponse.json(
          { message: "Failed to create user", error: error.message },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "User does not exist", error },
      { status: 400 }
    );
  }
}
