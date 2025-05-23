import { connectToDatabase } from "@/app/api/utils/db";
import Notification from "@/app/model/notification.model";
import Support from "@/app/model/support.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { status, reply } = await req.json();
  const issue = await Support.findByIdAndUpdate(
    id,
    { status, reply },
    { new: true }
  );
  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }
  await Notification.create({
    type: "info",
    title: "Issue update",
    message: `You have a new update on issue ${issue.subject}. Team Replied: "${issue.reply}"`,
    userId: issue.userId,
  });
  return NextResponse.json({ issue }, { status: 200 });
}
