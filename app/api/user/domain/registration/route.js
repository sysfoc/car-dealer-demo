import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
import Domain from "@/app/model/domain.model";
import { cookies } from "next/headers";
import { config } from "@/app/api/utils/env-config";
import Notification from "@/app/model/notification.model";
import jwt from "jsonwebtoken";
export async function POST(req) {
  await connectToDatabase();
  const { domainName, domainRegistrar, domainUsername, domainPassword } =
    await req.json();
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
  if (!domainName || !domainRegistrar || !domainUsername || !domainPassword) {
    return NextResponse.json(
      { message: "Please fill complete form" },
      { status: 400 }
    );
  }
  try {
    await Domain.create({
      userId: id,
      domainName,
      domainRegistrar,
      domainStatus: "Pending",
      domainUsername,
      domainPassword,
    });
    await Notification.create({
      type: "success",
      title: "Domain registration process",
      message: `Dear user, your domain has been registered, currently in a pending state. You will get confirmation email once approved by admin. Thanks for your patience.`,
      userId: id,
    });
    return NextResponse.json(
      { message: "Domain registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
