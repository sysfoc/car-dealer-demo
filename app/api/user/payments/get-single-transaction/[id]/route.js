import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
import Payment from "@/app/model/payment.model";
import "@/app/model/user.model";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const transaction = await Payment.findById(id).populate("userId");
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ transaction }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
