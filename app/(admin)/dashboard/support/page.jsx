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
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Support() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredResults = searchTerm
    ? issues.filter((issue) => {
        const lowerSearch = searchTerm.toLowerCase();
        const createdAtMatch = issue?.createdAt
          ? new Date(issue.createdAt)
              .toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .toLowerCase()
              .includes(lowerSearch)
          : false;
        return (
          issue?.subject?.toLowerCase()?.includes(lowerSearch) ||
          issue?.description?.toLowerCase()?.includes(lowerSearch) ||
          issue?.status?.toLowerCase()?.includes(lowerSearch) ||
          createdAtMatch
        );
      })
    : issues;
  return (
    <section>
      <div className='flex items-center justify-between flex-wrap my-5'>
        <h1 className='text-2xl font-bold'>Support</h1>
        <TextInput
          id='search'
          type='search'
          placeholder='Search'
          className='w-[300px]'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='overflow-x-auto my-5'>
        <Table>
          <TableHead>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Subject
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Message
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Status
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Date
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Actions
            </TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  <Spinner size='lg' />
                </TableCell>
              </TableRow>
            )}
            {(filteredResults.length > 0 &&
              filteredResults?.map((issue) => (
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
                      <Button
                        size='sm'
                        className='bg-green-500 hover:!bg-green-600'
                      >
                        Update
                      </Button>
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
