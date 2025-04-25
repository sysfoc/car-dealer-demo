import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import { NextResponse } from "next/server";
import { hashedPassword } from "@/app/api/utils/hashing";

export async function PATCH(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { name, email, password, role } = await req.json();
  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    let encryptedPassword = findUser.password;
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
        role,
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
