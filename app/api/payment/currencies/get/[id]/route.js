import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  try {
    const currency = await Currencie.findById(id);
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
