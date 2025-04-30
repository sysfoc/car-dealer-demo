import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
import Payment from "@/app/model/payment.model";
import User from "@/app/model/user.model";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const transaction = await Payment.findById(id);
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    const user = await User.findById(transaction.userId);

    return NextResponse.json(
      { transaction, user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
