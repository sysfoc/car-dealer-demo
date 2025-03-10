"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";
import React from "react";

const OrdersTable = () => {
  const tableData = [
    {
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      phone: "987-654-3210",
      status: "Inactive",
    },
    {
      name: "Michael Brown",
      email: "michael.brown@gmail.com",
      phone: "456-789-1234",
      status: "Active",
    },
    {
      name: "Emily Johnson",
      email: "emily.johnson@gmail.com",
      phone: "321-654-9870",
      status: "Active",
    },
    {
      name: "Chris Wilson",
      email: "chris.wilson@gmail.com",
      phone: "654-321-7890",
      status: "Active",
    },
    {
      name: "Sarah Davis",
      email: "sarah.davis@gmail.com",
      phone: "789-123-4560",
      status: "Inactive",
    },
  ];
  return (
    <section className="my-5 p-3 bg-white shadow">
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell>Users</TableHeadCell>
            <TableHeadCell>Gmail</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>
              <span>Actions</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {tableData.map((data, index) => (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {data.name}
                </TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>
                  <span
                    className={`${
                      data.status === "Active" ? "bg-[#15CA20]" : "bg-red-600"
                    } rounded-lg p-2 text-xs text-white`}
                  >
                    {data.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default OrdersTable;
