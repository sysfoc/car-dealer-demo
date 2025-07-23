"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import {
  Modal,
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Alert,
} from "flowbite-react";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [getAllUsers, setGetAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleDeleteUser = (user) => {
    setError(false);
    setIsDeleteModalOpen(true);
    setSelectedUser(user);
  };
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/auth/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setError(false);
        setIsDeleteModalOpen(false);
        setGetAllUsers(getAllUsers.filter((user) => user._id !== id));
      } else {
        setError(true);
        setIsDeleteModalOpen(false);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setError(true);
      setIsDeleteModalOpen(false);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='my-5 p-5 bg-white shadow'>
      {error && (
        <Alert color='failure' className='absolute top-5 right-5'>
          <span>
            <span className='font-medium'>{errorMessage}</span>
          </span>
        </Alert>
      )}
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold mb-4'>Users List</h2>
          <div>
            <Link href='/dashboard/users/create'>
              <Button size='sm' color='blue'>
                Add User
              </Button>
            </Link>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>Signup Method</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {getAllUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className='capitalize'>
                  {user.signupMethod}
                </TableCell>
                <TableCell>
                  <div key={user?._id} className='flex items-center gap-2'>
                    <Link href={`/dashboard/users/view/${user?._id}`}>
                      <button
                        className='p-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                        title='View'
                      >
                        <FaEye className='w-3 h-3' />
                      </button>
                    </Link>
                    <Link href={`/dashboard/users/edit/${user?._id}`}>
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
                      onClick={() => handleDeleteUser(user)}
                    >
                      <FaTrash className='w-3 h-3' />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && <Spinner size='xl' color='blue' />}
        <Modal
          show={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <Modal.Header>Delete {selectedUser?.name}</Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsDeleteModalOpen(false)} color='gray'>
              Cancel
            </Button>
            <Button onClick={() => deleteUser(selectedUser?._id)} color='red'>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
