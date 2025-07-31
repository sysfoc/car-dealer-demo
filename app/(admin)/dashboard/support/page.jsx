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
            <TableHeadCell className="!bg-[#182641] text-white">Subject</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Message</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Status</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Date</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Actions</TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  <Spinner size='lg' />
                </TableCell>
              </TableRow>
            )}
            {(issues.length > 0 &&
              issues?.map((issue) => (
                <TableRow key={issue?._id}>
                  <TableCell className='capitalize'>{issue?.subject}</TableCell>
                  <TableCell className='capitalize'>
                    {issue?.description.slice(0, 60)}
                  </TableCell>
                  <TableCell className='capitalize'>{issue?.status}</TableCell>
                  <TableCell>
                    {new Date(issue?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/support/update/${issue?._id}`}>
                      <Button size='sm' className="bg-green-500 hover:!bg-green-600">Update</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))) || (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  No issues found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
