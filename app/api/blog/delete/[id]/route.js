import { connectToDatabase } from "@/app/api/utils/db";
import Blog from "@/app/model/blog.model";
import { NextResponse } from "next/server";
export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Blog deleted successfully" },
    { status: 200 }
  );
}
