"use client";
import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRowSelect } from "@table-library/react-table-library/select";
import { usePagination } from "@table-library/react-table-library/pagination";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { Button } from "flowbite-react";

const Datatable = () => {
  let data = {
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
  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter((item) =>
      item.invoiceId.toLowerCase().includes(search.toLowerCase())
    ),
  };
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }
  const BASELINE_THEME = {
    Table: `
              border-radius: 8px;
              overflow: hidden;
              background-color: white;
              --data-table-library_grid-template-columns: 60px 80px 100px 100px 80px 80px 100px 200px; /* Adjust Column Widths */
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
            href={`/user/dashboard/billing/invoices/view/${item.invoiceId}`}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            title="View"
          >
            <FaEye className="w-3 h-3" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="my-5 p-5 bg-white shadow">
      <div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Invoices</h2>
        </div>
        <label htmlFor="search">
          Search by ID:&nbsp;
          <input
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
            className="p-1 border border-gray-400 outline-none text-sm"
          />
        </label>
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={BASELINE_THEME}
          layout={{ custom: true }}
          select={select}
          pagination={pagination}
          className="w-full overflow-x-scroll"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm">
            Total Pages: {pagination.state.getTotalPages(data.nodes)}
          </span>

          <span>
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                key={index}
                type="button"
                className={`px-3 py-1 border text-sm ${
                  pagination.state.page === index
                    ? "bg-blue-700 text-white"
                    : ""
                }`}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Datatable;
