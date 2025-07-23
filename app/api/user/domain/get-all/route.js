import { connectToDatabase } from "@/app/api/utils/db";
import Domain from "@/app/model/domain.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const domains = await Domain.find({}).sort({ createdAt: -1 });
  if (!domains) {
    return NextResponse.json({ message: "Domains not found" }, { status: 404 });
  }
  return NextResponse.json({ domains }, { status: 200 });
}
