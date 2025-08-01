import { connectToDatabase } from "@/app/api/utils/db";
import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  await connectToDatabase();
  const { name } = params;
  try {
    const country = await Currencie.findOne({ country: name });
    if (!country) {
      return NextResponse.json(
        { message: "country not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ country }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
