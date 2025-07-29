"use client";
import {
  Button,
  Modal,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

const OrdersTable = () => {
  const [getAllUsers, setGetAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/all-users");
        const data = await response.json();
        setGetAllUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleViewButton = async (data) => {
    setOpenModal(true);
    setSelectedUser(data);
  };
  return (
    <section className='my-5 p-3 bg-white shadow'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHead>
            <TableHeadCell>Users</TableHeadCell>
            <TableHeadCell>Gmail</TableHeadCell>
            <TableHeadCell>Provider</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>
              <span>Actions</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className='text-center'>
                  <Spinner size='lg' aria-label='Center-aligned spinner example' />
                </TableCell>
              </TableRow>
            )}
            {getAllUsers.map((data, index) => (
              <TableRow
                key={index}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize'>
                  {data?.name}
                </TableCell>
                <TableCell>{data?.email}</TableCell>
                <TableCell className='capitalize'>
                  {data?.signupMethod}
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      data?.role === "admin" ? "bg-[#15CA20]" : "bg-red-600"
                    } rounded-lg p-2 text-xs text-white capitalize`}
                  >
                    {data?.role}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    color='gray'
                    size='sm'
                    onClick={() => handleViewButton(data)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>{selectedUser?.name} Profile</Modal.Header>
          <Modal.Body>
            {!selectedUser ? (
              <Spinner size='lg' />
            ) : (
              <div>
                <p>Email: {selectedUser?.email}</p>
                <p>Role: {selectedUser?.role}</p>
                <p>Signup Method: {selectedUser?.signupMethod}</p>
                <p>
                  Created At:{" "}
                  {new Date(selectedUser?.createdAt).toLocaleString()}
                </p>
                <p>
                  Updated At:{" "}
                  {new Date(selectedUser?.updatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default OrdersTable;
