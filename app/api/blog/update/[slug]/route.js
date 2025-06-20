import { connectToDatabase } from "@/app/api/utils/db";
import { NextResponse } from "next/server";
import Blog from "@/app/model/blog.model";
import path from "path";
import { writeFile, unlink } from "fs/promises";

export async function PATCH(req, { params }) {
  await connectToDatabase();

  const { slug } = params;
  const formData = await req.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const metaTitle = formData.get("metaTitle");
  const metaDescription = formData.get("metaDescription");
  const writer = formData.get("writer");
  const image = formData.get("image");

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let imagePath = blog.image;

    // ✅ If a new image is uploaded
    if (image && typeof image === "object" && image.name) {
      const buffer = Buffer.from(await image.arrayBuffer());

      // ✅ Delete old image if it exists
      if (blog.image && blog.image !== "") {
        const oldPath = path.join(process.cwd(), "public", blog.image);
        try {
          await unlink(oldPath);
        } catch (err) {
          console.warn("Failed to delete old image (may not exist):", oldPath);
        }
      }

      // ✅ Save new image in /public/blog
      const extension = path.extname(image.name);
      const filename = `${Date.now()}-${image.name}`;
      const fullPath = path.join(process.cwd(), "public", "blog", filename);
      await writeFile(fullPath, buffer);

      imagePath = `/blog/${filename}`;
    }

    // ✅ Update the blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        title,
        content,
        metaTitle,
        metaDescription,
        blogWriter: writer,
        image: imagePath,
      },
      { new: true }
    );

    return NextResponse.json({ blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
