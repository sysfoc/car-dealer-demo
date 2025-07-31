import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";

export async function PATCH(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { name, country, currency, symbol, price } = await req.json();
  await Currencie.findByIdAndUpdate(
    id,
    {
      name,
      country,
      currency,
      symbol,
      price,
    },
    { new: true }
  );
  return NextResponse.json(
    { message: "Currency updated successfully" },
    { status: 200 }
  );
}
