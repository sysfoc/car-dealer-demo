import { connectToDatabase } from "@/app/api/utils/db";
import { NextResponse } from "next/server";
import Blog from "@/app/model/blog.model";
export async function GET() {
  await connectToDatabase();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    if (!blogs) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 });
    }
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
