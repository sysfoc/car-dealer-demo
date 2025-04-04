"use client";
import React, { useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRowSelect } from "@table-library/react-table-library/select";
import { FaEdit, FaEye } from "react-icons/fa";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { Modal, Button } from "flowbite-react";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const data = {
    nodes: [
      {
        id: "1",
        userId: "UID-1001",
        username: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8901",
      },
      {
        id: "2",
        userId: "UID-1002",
        username: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 987 654 3210",
      },
      {
        id: "3",
        userId: "UID-1003",
        username: "Michael Brown",
        email: "michael.brown@example.com",
        phone: "+1 456 789 0123",
      },
      {
        id: "4",
        userId: "UID-1004",
        username: "Emily Johnson",
        email: "emily.johnson@example.com",
        phone: "+1 321 654 9870",
      },
      {
        id: "5",
        userId: "UID-1005",
        username: "David Wilson",
        email: "david.wilson@example.com",
        phone: "+1 555 666 7777",
      },
      {
        id: "6",
        userId: "UID-1006",
        username: "Olivia Martinez",
        email: "olivia.martinez@example.com",
        phone: "+1 888 999 0000",
      },
    ],
  };
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
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
      label: "User ID",
      renderCell: (item) => item.userId || "N/A",
      select: true,
    },
    { label: "Username", renderCell: (item) => item.username || "N/A" },
    { label: "Email", renderCell: (item) => item.email || "N/A" },
    { label: "Phone", renderCell: (item) => item.phone || "N/A" },
    {
      label: "Action",
      renderCell: (item) => (
        <div className='flex items-center gap-2'>
          <button
            className='p-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            title='View'
            onClick={() => handleViewUser(item)}
          >
            <FaEye className='w-3 h-3' />
          </button>
          <Link href={`/dashboard/users/edit/${item.userId}`}>
            <button
              className='p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
              title='Edit'
            >
              <FaEdit className='w-3 h-3' />
            </button>
          </Link>
          <button
            className='p-2 bg-red-500 text-white rounded hover:bg-red-600'
            title='Delete'
          >
            <FaTrash className='w-3 h-3' />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className='my-5 p-5 bg-white shadow'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold mb-4'>Users List</h2>
          <div>
            <Link href={"/dashboard/users/create"}>
              <Button size={"sm"} color='blue'>
                Add User
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
          className='w-full overflow-x-scroll'
        />
        <Modal show={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>User Details</Modal.Header>
          <Modal.Body>
            {selectedUser ? (
              <div className='space-y-2'>
                <p>
                  <strong>User ID:</strong> {selectedUser.userId}
                </p>
                <p>
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
              </div>
            ) : (
              <p>No user selected.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)} color='gray'>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
