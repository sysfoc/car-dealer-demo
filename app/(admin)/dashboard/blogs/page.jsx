"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blog() {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await fetch("/api/blog/all", {
        method: "GET",
      });
      const data = await res.json();
      setFormData(data.blogs);
    };
    getAllBlogs();
  }, []);
  return (
    <section className='my-5 p-5'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold mb-4'>Blogs</h2>
          <div>
            <Link href={"/dashboard/blogs/add"}>
              <Button
                size='md'
                className='bg-blue-500 hover:!bg-blue-600 text-white rounded-md'
              >
                Add Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Slug</TableHeadCell>
            <TableHeadCell>Author</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {formData &&
              formData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.slug}</TableCell>
                  <TableCell>{item.blogWriter}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/blogs/edit/${item._id}`}>
                      <Button
                        size='md'
                        className='bg-blue-500 hover:!bg-blue-600 text-white rounded-md'
                      >
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
