"use client";
import React, { useEffect, useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRowSelect } from "@table-library/react-table-library/select";
import { FaEdit, FaEye } from "react-icons/fa";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { Modal, Button } from "flowbite-react";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [getAllUsers, setGetAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/all-users");
        const data = await response.json();
        setGetAllUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const data = { nodes: getAllUsers || [] };

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const COLUMNS = [
    {
      label: "User ID",
      renderCell: (item) => item?._id || "N/A",
      select: true,
    },
    { label: "Name", renderCell: (item) => item?.name || "N/A" },
    { label: "Email", renderCell: (item) => item?.email || "N/A" },
    { label: "Role", renderCell: (item) => item?.role || "N/A" },
    {
      label: "Action",
      renderCell: (item) => (
        <div key={item?._id} className="flex items-center gap-2">
          <button
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            title="View"
            onClick={() => handleViewUser(item)}
          >
            <FaEye className="w-3 h-3" />
          </button>
          <Link href={`/dashboard/users/edit/${item?._id}`}>
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

  const BASELINE_THEME = {
    Table: `
      border-radius: 8px;
      overflow: hidden;
      background-color: white;
      --data-table-library_grid-template-columns: 80px 150px 120px 100px 140px 100px 80px;
    `,
    Header: `background-color: #f8fafc;`,
    Body: `background-color: white;`,
    BaseRow: `font-size: 14px;`,
    HeaderRow: `
      color: #1f2937;
      font-weight: bold;
      text-transform: uppercase;
    `,
    Row: `
      color: #374151;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: #f1f5f9;
      }
      &:not(:last-of-type) > .td {
        border-bottom: 1px solid #e2e8f0;
      }
    `,
    BaseCell: `padding: 8px 10px; text-align: left;`,
    HeaderCell: `
      font-weight: bold;
      border-bottom: 2px solid #e2e8f0;
      padding: 10px 12px;
      text-align: left;
      .resizer-handle {
        background-color: #cbd5e1;
      }
      svg, path {
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

  return (
    <div className="my-5 p-5 bg-white shadow">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          <div>
            <Link href="/dashboard/users/create">
              <Button size="sm" color="blue">
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
          className="w-full overflow-x-scroll"
        />

        <Modal show={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>User Details</Modal.Header>
          <Modal.Body>
            {selectedUser ? (
              <div className="space-y-2">
                <p>
                  <strong>User ID:</strong> {selectedUser?._id}
                </p>
                <p>
                  <strong>Username:</strong> {selectedUser?.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser?.role}
                </p>
                <p>
                  <strong>Signup Method:</strong> {selectedUser?.signupMethod}
                </p>
              </div>
            ) : (
              <p>No user selected.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)} color="gray">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
