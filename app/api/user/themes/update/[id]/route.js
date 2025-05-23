import { connectToDatabase } from "@/app/api/utils/db";
import Theme from "@/app/model/theme.model";
import Notification from "@/app/model/notification.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { status } = await req.json();
  try {
    const findTheme = await Theme.findById(id);
    if (!findTheme) {
      return NextResponse.json({ message: "Theme not found" }, { status: 404 });
    }
    const updatedTheme = await Theme.findByIdAndUpdate(
      id,
      {
        activeTheme: status,
      },
      { new: true }
    );
    await Notification.create({
      userId: findTheme.userId,
      type: `${status ? "success" : "error"}`,
      title: "Theme Update",
      message: `Your subscribed theme "${findTheme.themeName}" has been ${
        status ? "enabled" : "disabled"
      }`,
    });
    return NextResponse.json({ updatedTheme }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
