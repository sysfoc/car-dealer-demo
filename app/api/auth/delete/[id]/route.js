import User from "@/app/model/user.model";
import { connectToDatabase } from "@/app/api/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
