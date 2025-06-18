import { connectToDatabase } from "@/app/api/utils/db";
import { NextResponse } from "next/server";
import Blog from "@/app/model/blog.model";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  await connectToDatabase();

  const formData = await req.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const metaTitle = formData.get("metaTitle");
  const metaDescription = formData.get("metaDescription");
  const slug = formData.get("slug");
  const writer = formData.get("writer");
  const image = formData.get("image");

  if (
    !title ||
    !content ||
    !metaTitle ||
    !metaDescription ||
    !image ||
    !slug ||
    !writer
  ) {
    return NextResponse.json(
      { message: "Please fill complete form" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const imagePath = path.join(process.cwd(), "public", "blog", filename);
    await writeFile(imagePath, buffer);

    const blog = await Blog.create({
      title,
      content,
      metaTitle,
      metaDescription,
      image: `/blog/${filename}`,
      slug,
      blogWriter: writer,
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
