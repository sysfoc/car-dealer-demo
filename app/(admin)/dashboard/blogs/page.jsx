"use client";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";

export default function Blog() {
  return (
    <section className='my-5 p-5'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold mb-4'>Blogs</h2>
          <div>
           <Link href={'/dashboard/blogs/add'}>
            <Button size="md" className='bg-blue-500 hover:!bg-blue-600 text-white rounded-md'>Add Blog</Button></Link>
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
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>John Doe</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
