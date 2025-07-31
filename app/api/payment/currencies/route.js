import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";

export async function GET() {
  await connectToDatabase();
  try {
    const currencies = await Currencie.find({}).sort({ createdAt: -1 });
    if (!currencies) {
      return NextResponse.json(
        { message: "No currencies found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ currencies }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
