import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
export async function POST(req) {
  await connectToDatabase();
  const { name, country, currency, symbol, price } = await req.json();
  try {
    const newCurrency = await Currencie.create({
      name,
      country,
      currency,
      symbol,
      price,
    });
    if (!newCurrency)
      return NextResponse.json(
        { message: "Error adding currency" },
        { status: 500 }
      );
    return NextResponse.json(
      { message: "Currency added successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
