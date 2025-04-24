import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const users = await User.find({}).sort({ createdAt: -1 });
  if (!users) {
    return NextResponse.json({ message: "No users found" }, { status: 404 });
  }
  return NextResponse.json({ users }, { status: 200 });
}
