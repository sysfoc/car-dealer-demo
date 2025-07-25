import { connectToDatabase } from "@/app/api/utils/db";
import Support from "@/app/model/support.model";
import { NextResponse } from "next/server";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function GET(req, { params }) {
  await connectToDatabase();
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const adminToken = cookieStore.get("admin")?.value;

  if (!token || !adminToken) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  let decodedUser, decodedAdmin;

  try {
    decodedUser = jwt.verify(token, config.jwtSecretKey);
  } catch (err) {
    return NextResponse.json({ error: "Invalid user token" }, { status: 403 });
  }

  try {
    decodedAdmin = jwt.verify(adminToken, config.jwtSecretKey);
  } catch (err) {
    return NextResponse.json({ error: "Invalid admin token" }, { status: 403 });
  }
  if (!decodedUser?.id || !decodedAdmin?.admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }
  const { id } = params;
  const issue = await Support.findById(id);
  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }
  return NextResponse.json({ issue }, { status: 200 });
}
