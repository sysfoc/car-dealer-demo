import Currencie from "@/app/model/currencie.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(req) {
  await connectToDatabase();
  const { name, country, currency, symbol, price } = await req.json();
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
  try {
    const newCurrency = await Currencie.create({
      name,
      country,
      currency,
      symbol,
      price,
    });
    if (!newCurrency)
      return NextResponse.json(
        { message: "Error adding currency" },
        { status: 500 }
      );
    return NextResponse.json(
      { message: "Currency added successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
