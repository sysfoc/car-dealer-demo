import { connectToDatabase } from "@/app/api/utils/db";
import Subscription from "@/app/model/subscription.model";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const subscription = await Subscription.findByIdAndDelete(id);
  if (!subscription) {
    return NextResponse.json(
      { message: "Subscription not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Subscription canceled successfully" },
    { status: 200 }
  );
}
