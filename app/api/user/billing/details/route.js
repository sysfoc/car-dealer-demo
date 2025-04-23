import { connectToDatabase } from "@/app/api/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { config } from "@/app/api/utils/env-config";
import User from "@/app/model/user.model";
import Billing from "@/app/model/billing.model";

export async function POST(req) {
  await connectToDatabase();
  const { fullName, email, address, phone } = await req.json();
  if (!fullName || !email || !address || !phone) {
    return NextResponse.json(
      { message: "Please fill complete form" },
      { status: 400 }
    );
  }
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, config.jwtSecretKey);
    if (!decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
    const id = decoded.id;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isBillingExist = await Billing.findOne({ userId: id });
    if (isBillingExist) {
      return NextResponse.json({ message: "Billing details already exist" }, { status: 404 });
    }
    const createBilling = await Billing.create({
      userId: id,
      fullName,
      email,
      address,
      phone,
    });
    return NextResponse.json({
      message: "Billing details created successfully",
      billing: createBilling,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
