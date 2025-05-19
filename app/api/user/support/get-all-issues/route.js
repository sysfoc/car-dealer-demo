import { connectToDatabase } from "@/app/api/utils/db";
import Support from "@/app/model/support.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();
  const issues = await Support.find({}).sort({ createdAt: -1 });
  if (!issues) {
    return NextResponse.json({ message: "No issues found" }, { status: 404 });
  }
  return NextResponse.json({ issues }, { status: 200 });
}
