"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaEye } from "react-icons/fa6";

export default function PaymentHistory() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        setloading(true);
        const res = await fetch("/api/user/payments/get-transactions");
        const data = await res.json();
        setloading(false);
        if(res.ok){
          setTransactions(data.transactions);
          setloading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserTransactions();
  }, []);
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };
  return (
    <div className='my-5 p-5 bg-white shadow'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold mb-4'>Transactions</h2>
        </div>
        <Table>
          <TableHead>
            <TableHeadCell>Transaction ID</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Product</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Payment Method</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody>
            {
              transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction._id}</TableCell>
                  <TableCell>
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </TableCell>
                  <TableCell>{transaction.product}</TableCell>
                  <TableCell>${transaction.productPrice}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewTransaction(transaction)}>
                      <FaEye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader>
            Transaction Details of{" "}
            {selectedTransaction ? selectedTransaction._id : ""}
          </ModalHeader>
          <ModalBody>
            {selectedTransaction ? (
              <div className='space-y-3'>
                <p>
                  <strong>Transaction ID: </strong>
                  {selectedTransaction._id}
                </p>
                <p>
                  <strong>Customer ID: </strong>
                  {selectedTransaction.customerId}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedTransaction.transactionDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </p>
                <p>
                  <strong>Purchased plan:</strong>{" "}
                  {selectedTransaction.product} Package
                </p>
                <p>
                  <strong>Amount:</strong> $
                  {selectedTransaction.productPrice}
                </p>
                <p>
                  <strong>Plan:</strong> {selectedTransaction.productPlan}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 text-white rounded bg-green-500`}
                  >
                    completed
                  </span>
                </p>
              </div>
            ) : (
              <p>No transaction selected.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color='gray' onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
