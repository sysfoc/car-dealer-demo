"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const Datatable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        setloading(true);
        const res = await fetch("/api/user/payments/all-transactions");
        const data = await res.json();
        setloading(false);
        if (res.ok) {
          setTransactions(data.transactions);
          setloading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserTransactions();
  }, []);
  return (
    <div className='my-5 p-5 bg-white shadow'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold mb-4'>Transactions</h2>
        </div>
        <Table>
          <TableHead>
            <TableHeadCell className="!bg-[#182641] text-white">Transaction ID</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Date</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Product</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Amount</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Payment Method</TableHeadCell>
            <TableHeadCell className="!bg-[#182641] text-white">Action</TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  <Spinner size='lg' />
                </TableCell>
              </TableRow>
            )}
            {(transactions.length > 0 &&
              transactions.map((transaction) => (
                <TableRow key={transaction?._id}>
                  <TableCell>{transaction?._id}</TableCell>
                  <TableCell>
                    {new Date(transaction?.transactionDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </TableCell>
                  <TableCell>{transaction?.product}</TableCell>
                  <TableCell>${transaction?.productPrice}</TableCell>
                  <TableCell>{transaction?.paymentMethod}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Link
                        href={`/dashboard/invoices/view/${transaction?._id}`}
                        className='p-2 bg-[#182641] text-white rounded hover:!bg-[#182641]/90'
                        title='View'
                      >
                        <FaEye className='w-3 h-3' />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))) || (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Datatable;
