import { connectToDatabase } from "@/app/api/utils/db";
import Currencie from "@/app/model/currencie.model";
import User from "@/app/model/user.model";
import { NextResponse } from "next/server";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { name } = params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = jwt.verify(token, config.jwtSecretKey);
  if (!decoded.id) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
  const id = decoded.id;
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  try {
    const currency = await Currencie.findOne({ currency: name });
    if (!currency) {
      return NextResponse.json(
        { message: "Currency not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ currency }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
