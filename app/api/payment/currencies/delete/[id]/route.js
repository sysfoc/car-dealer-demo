import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const currency = await Currencie.findByIdAndDelete(id);
  if (!currency) {
    return NextResponse.json(
      { message: "Currency not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Currency deleted successfully" },
    { status: 200 }
  );
}
