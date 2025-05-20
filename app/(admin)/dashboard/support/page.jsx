"use client";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Support() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllIssues = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/support/get-all-issues");
        const data = await response.json();
        setLoading(false);
        setIssues(data.issues);
      } catch (error) {
        console.error(error);
      }
    };
    getAllIssues();
  }, []);
  return (
    <section>
      <div className='my-5'>
        <Table>
          <TableHead>
            <TableHeadCell>Subject</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  <Spinner size='lg' />
                </TableCell>
              </TableRow>
            )}
            {issues?.map((issue) => (
              <TableRow key={issue?._id}>
                <TableCell>{issue?.subject}</TableCell>
                <TableCell>{issue?.description}</TableCell>
                <TableCell>{issue?.status}</TableCell>
                <TableCell>
                  {new Date(issue?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/support/update/${issue?._id}`}>
                    <Button size='sm'>Update</Button>
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
