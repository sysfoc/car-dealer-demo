import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const adminToken = cookieStore.get("admin")?.value;

  if (!token || !adminToken) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  let decodedUser, decodedAdmin;

  try {
    decodedUser = jwt.verify(token, config.jwtSecretKey);
  } catch {
    return NextResponse.json({ error: "Invalid user token" }, { status: 403 });
  }

  try {
    decodedAdmin = jwt.verify(adminToken, config.jwtSecretKey);
  } catch {
    return NextResponse.json({ error: "Invalid admin token" }, { status: 403 });
  }
  if (!decodedUser?.id || !decodedAdmin?.admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }
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
