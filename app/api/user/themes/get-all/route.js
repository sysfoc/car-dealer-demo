import { connectToDatabase } from "@/app/api/utils/db";
import Theme from "@/app/model/theme.model";
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
    const themes = await Theme.find({ userId: id });

    if (!themes || themes.length === 0) {
      return NextResponse.json(
        { message: "No themes found, please create one" },
        { status: 404 }
      );
    }

    const today = new Date();

    const updates = await Promise.all(
      themes.map(async (theme) => {
        if (
          theme.expiredAt &&
          new Date(theme.expiredAt) <= today &&
          theme.isActive
        ) {
          theme.isActive = false;
          await theme.save();
        }
        return theme;
      })
    );

    return NextResponse.json({ themes: updates }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
