import { connectToDatabase } from "@/app/api/utils/db";

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
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { message: "Error deleting notification" },
      { status: 500 }
    );
  }
}
