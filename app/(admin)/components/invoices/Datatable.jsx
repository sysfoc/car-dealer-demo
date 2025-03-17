"use client";
import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRowSelect } from "@table-library/react-table-library/select";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { Button } from "flowbite-react";

const Datatable = () => {
  const data = {
    nodes: [
      {
        id: "1",
        invoiceId: "INV-1001",
        billingName: "John Doe",
        orderDate: new Date(2025, 2, 15),
        total: 250.75,
        paymentMethod: "Credit Card",
        status: "Paid",
      },
      {
        id: "2",
        invoiceId: "INV-1002",
        billingName: "Jane Smith",
        orderDate: new Date(2025, 2, 10),
        total: 89.99,
        paymentMethod: "PayPal",
        status: "Pending",
      },
      {
        id: "3",
        invoiceId: "INV-1003",
        billingName: "Michael Brown",
        orderDate: new Date(2025, 2, 25),
        total: 145.5,
        paymentMethod: "Bank Transfer",
        status: "Failed",
      },
      {
        id: "4",
        invoiceId: "INV-1004",
        billingName: "Emily Johnson",
        orderDate: new Date(2025, 2, 12),
        total: 320.0,
        paymentMethod: "Credit Card",
        status: "Paid",
      },
      {
        id: "5",
        invoiceId: "INV-1005",
        billingName: "Emily Johnson",
        orderDate: new Date(2025, 2, 12),
        total: 320.0,
        paymentMethod: "Credit Card",
        status: "Paid",
      },
      {
        id: "6",
        invoiceId: "INV-1006",
        billingName: "Emily Johnson",
        orderDate: new Date(2025, 2, 12),
        total: 320.0,
        paymentMethod: "Credit Card",
        status: "Paid",
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

  const COLUMNS = [
    {
      label: "Invoice ID",
      renderCell: (item) => item.invoiceId || "N/A",
      select: true,
    },
    { label: "Billing Name", renderCell: (item) => item.billingName || "N/A" },
    {
      label: "Order Date",
      renderCell: (item) =>
        item.orderDate
          ? new Date(item.orderDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : "N/A",
    },
    {
      label: "Total",
      renderCell: (item) =>
        item.total ? `$${item.total.toFixed(2)}` : "$0.00",
    },
    {
      label: "Payment Method",
      renderCell: (item) => item.paymentMethod || "Unknown",
    },
    {
      label: "Status",
      renderCell: (item) => (
        <span
          className={`px-3 py-2 text-white text-xs ${
            item.status === "Paid"
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
        <div className="flex items-center gap-2">
          <Link
            href={"/dashboard/invoices/view/2"}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            title="View"
          >
            <FaEye className="w-3 h-3" />
          </Link>
          <Link href={"/dashboard/invoices/edit/1"}>
            <button
              className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              title="Edit"
            >
              <FaEdit className="w-3 h-3" />
            </button>
          </Link>
          <button
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            title="Delete"
          >
            <FaTrash className="w-3 h-3" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-5 p-5 bg-white shadow">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Invoices List</h2>
          <div>
            <Link href={"/dashboard/invoices/create"}>
              <Button size={"sm"} color="blue">
                Create New
              </Button>
            </Link>
          </div>
        </div>
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={BASELINE_THEME}
          layout={{ custom: true }}
          select={select}
          className="w-full overflow-x-scroll"
        />
      </div>
    </div>
  );
};

export default Datatable;
