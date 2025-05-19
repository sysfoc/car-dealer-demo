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
import { useEffect, useState } from "react";

export default function Support() {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const getAllIssues = async () => {
      try {
        const response = await fetch("/api/user/support/get-all-issues");
        const data = await response.json();
        setIssues(data.issues);
      } catch (error) {
        console.error(error);
      }
    };
    getAllIssues();
  }, []);
  return (
    <section>
      <h1>Support</h1>
      <div>
        <Table>
          <TableHead>
            <TableHeadCell>Subject</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
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
                  <Button size="sm">Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
