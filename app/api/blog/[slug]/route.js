import { connectToDatabase } from "@/app/api/utils/db";
import Blog from "@/app/model/blog.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { slug } = params;
  const blog = await Blog.findOne({ slug });
  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json({ blog }, { status: 200 });
}
