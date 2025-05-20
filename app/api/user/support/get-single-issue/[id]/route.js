import { connectToDatabase } from "@/app/api/utils/db";
import Support from "@/app/model/support.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const issue = await Support.findById(id);
  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }
  return NextResponse.json({ issue }, { status: 200 });
}
