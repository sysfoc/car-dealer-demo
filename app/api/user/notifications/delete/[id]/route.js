import { connectToDatabase } from "@/app/api/utils/db";
import Notification from "@/app/model/notification.model";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectToDatabase();
  try {
    const { id } = params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Notification deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
