import { connectToDatabase } from "@/app/api/utils/db";
import Addon from "@/app/model/addon.model";
import { config } from "@/app/api/utils/env-config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
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
    const addons = await Addon.find({ userId: id, isActive: true });
    if (!addons) {
      return NextResponse.json(
        { message: "No addons found, please create one" },
        { status: 404 }
      );
    }
    const today = new Date();

    const updates = await Promise.all(
      addons.map(async (addon) => {
        if (
          addon.expiredAt &&
          new Date(addon.expiredAt) <= today &&
          addon.isActive
        ) {
          addon.isActive = false;
          await addon.save();
        }
        return addon;
      })
    );
    return NextResponse.json({ addons: updates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
