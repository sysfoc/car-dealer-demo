import { connectToDatabase } from "@/app/api/utils/db";
import Addon from "@/app/model/addon.model";
import Notification from "@/app/model/notification.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { status } = await req.json();
  try {
    const findAddon = await Addon.findById(id);
    if (!findAddon) {
      return NextResponse.json({ message: "Addon not found" }, { status: 404 });
    }
    const updatedAddon = await Addon.findByIdAndUpdate(
      id,
      {
        activeAddon: status,
      },
      { new: true }
    );
    await Notification.create({
      userId: findAddon.userId,
      type: `${status ? "success" : "error"}`,
      title: "Addon Update",
      message: `Addon "${findAddon.serviceName.slice(0, -6)}" has been ${
        status ? "enabled" : "disabled"
      }`,
    });
    return NextResponse.json({ updatedAddon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
