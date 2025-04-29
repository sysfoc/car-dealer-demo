import { connectToDatabase } from "@/app/api/utils/db";
import Payment from "@/app/model/payment.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { config } from "@/app/api/utils/env-config";

export async function GET() {
  await connectToDatabase();
  try {
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
    const transactions = await Payment.find({ userId: id }).sort({
      createdAt: -1,
    });
    if (!transactions) {
      return NextResponse.json(
        { message: "No transactions found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
