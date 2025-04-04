"use client";
import React, { useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRowSelect } from "@table-library/react-table-library/select";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

export default function PaymentHistory() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const data = {
    nodes: [
      {
        id: "1",
        invoiceId: "TID-1001",
        description: "Payment from Client",
        orderDate: new Date(2025, 2, 15),
        transactionAmount: 250.75,
        type: "Income",
        status: "Completed",
      },
      {
        id: "2",
        invoiceId: "TID-1002",
        description: "Office Supplies",
        orderDate: new Date(2025, 2, 10),
        transactionAmount: 89.99,
        type: "Expense",
        status: "Pending",
      },
      {
        id: "3",
        invoiceId: "TID-1003",
        description: "Payment from Client",
        orderDate: new Date(2025, 2, 25),
        transactionAmount: 145.5,
        type: "Expense",
        status: "Completed",
      },
      {
        id: "4",
        invoiceId: "TID-1004",
        description: "Payment from Client",
        orderDate: new Date(2025, 2, 12),
        transactionAmount: 320.0,
        type: "Income",
        status: "Completed",
      },
      {
        id: "5",
        invoiceId: "TID-1005",
        description: "Advertising Campaign",
        orderDate: new Date(2025, 2, 12),
        transactionAmount: 320.0,
        type: "Income",
        status: "Completed",
      },
      {
        id: "6",
        invoiceId: "TID-1006",
        description: "Website Maintenance",
        orderDate: new Date(2025, 2, 12),
        transactionAmount: 320.0,
        type: "Income",
        status: "Pending",
      },
    ],
  };
  const BASELINE_THEME = {
    Table: `
                  border-radius: 8px;
                  overflow: hidden;
                  background-color: white;
                  --data-table-library_grid-template-columns: 80px 150px 120px 100px 140px 100px 80px; /* Adjust Column Widths */
                `,
    Header: `
                  background-color: #f8fafc; /* Light Gray Background */
                `,
    Body: `
                  background-color: white;
                `,
    BaseRow: `
                  font-size: 14px;
                `,
    HeaderRow: `
                  color: #1f2937; /* Dark Gray */
                  font-weight: bold;
                  text-transform: uppercase;
                `,
    Row: `
                  color: #374151; /* Medium Gray */
                  transition: background-color 0.2s ease-in-out;
              
                  &:hover {
                    background-color: #f1f5f9; /* Light Gray Hover */
                  }
              
                  &:not(:last-of-type) > .td {
                    border-bottom: 1px solid #e2e8f0; /* Soft Border */
                  }
                `,
    BaseCell: `
                  padding: 8px 10px; /* Reduced padding for compact look */
                  text-align: left;
                `,
    HeaderCell: `
                  font-weight: bold;
                  border-bottom: 2px solid #e2e8f0;
                  padding: 10px 12px;
                  text-align: left;
                  
                  .resizer-handle {
                    background-color: #cbd5e1;
                  }
              
                  svg,
                  path {
                    fill: currentColor;
                  }
                `,
    Cell: `
                  &:focus {
                    outline: 2px dashed #60a5fa;
                    outline-offset: -2px;
                  }
                `,
  };

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const COLUMNS = [
    {
      label: "Transaction ID",
      renderCell: (item) => item.invoiceId || "N/A",
      select: true,
    },
    {
      label: "Date",
      renderCell: (item) =>
        item.orderDate
          ? new Date(item.orderDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : "N/A",
    },
    { label: "Description", renderCell: (item) => item.description || "N/A" },
    {
      label: "Amount",
      renderCell: (item) =>
        item.transactionAmount
          ? `$${item.transactionAmount.toFixed(2)}`
          : "$0.00",
    },
    {
      label: "Type",
      renderCell: (item) => item.type || "Unknown",
    },
    {
      label: "Status",
      renderCell: (item) => (
        <span
          className={`px-3 py-2 text-white text-xs ${
            item.status === "Completed"
              ? "bg-[#15CA20]"
              : item.status === "Pending"
              ? "bg-[#FA7123]"
              : "bg-[#FD3550]"
          }`}
        >
          {item.status || "Unknown"}
        </span>
      ),
    },
    {
      label: "Action",
      renderCell: (item) => (
        <div className='flex items-center gap-2'>
          <button
            className='p-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            title='View'
            onClick={() => handleViewTransaction(item)}
          >
            <FaEye className='w-3 h-3' />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className='my-5 p-5 bg-white shadow'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold mb-4'>Transactions</h2>
        </div>
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={BASELINE_THEME}
          layout={{ custom: true }}
          select={select}
          className='w-full overflow-x-scroll'
        />
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader>
            Transaction Details of{" "}
            {selectedTransaction ? selectedTransaction.invoiceId : ""}
          </ModalHeader>
          <ModalBody>
            {selectedTransaction ? (
              <div className='space-y-3'>
                <p>
                  <strong>Transaction ID:</strong>
                  {selectedTransaction.invoiceId}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedTransaction.orderDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedTransaction.description}
                </p>
                <p>
                  <strong>Amount:</strong> $
                  {selectedTransaction.transactionAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Type:</strong> {selectedTransaction.type}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 text-white rounded ${
                      selectedTransaction.status === "Completed"
                        ? "bg-green-500"
                        : selectedTransaction.status === "Pending"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  >
                    {selectedTransaction.status}
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
