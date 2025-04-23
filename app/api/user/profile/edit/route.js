import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import { hashedPassword } from "@/app/api/utils/hashing";
import { NextResponse } from "next/server";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function PATCH(req) {
  await connectToDatabase();
  const { name, email, password, profileImg } = await req.json();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decoded = jwt.verify(token, config.jwtSecretKey);
    if (!decoded.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
    const id = decoded.id;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    let encryptedPassword = user.password;
    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { message: "Password should be at least 8 characters" },
          { status: 400 }
        );
      }
      encryptedPassword = await hashedPassword(password);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        profileImg,
        password: encryptedPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Error updating user" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          _id: updatedUser._id.toString(),
          name: updatedUser.name,
          email: updatedUser.email,
          profileImg: updatedUser.profileImg,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
