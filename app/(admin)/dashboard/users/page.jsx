"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
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
  TextInput,
} from "flowbite-react";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [getAllUsers, setGetAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsers = searchTerm
    ? getAllUsers.filter((user) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          user._id?.toString().toLowerCase().includes(lowerSearch) ||
          user.name?.toLowerCase().includes(lowerSearch) ||
          user.email?.toLowerCase().includes(lowerSearch) ||
          user.role?.toLowerCase().includes(lowerSearch) ||
          user.signupMethod?.toLowerCase().includes(lowerSearch)
        );
      })
    : getAllUsers;
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
        <div className='flex flex-wrap items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold mb-4'>Users List</h2>
          <div className='flex items-center gap-2'>
            <TextInput
              id='search'
              type='search'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link href='/dashboard/users/create'>
              <Button size='sm' className='bg-[#e56c16] hover:!bg-[#e56c16]/90'>
                Add User
              </Button>
            </Link>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Image
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Username
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Email
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Role
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Signup Method
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Actions
            </TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  <Spinner
                    size='lg'
                    aria-label='Center-aligned spinner example'
                  />
                </TableCell>
              </TableRow>
            )}
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Image
                      src={user.profileImg}
                      alt={user.name}
                      width={30}
                      height={30}
                      className='rounded-full size-auto object-cover'
                    />
                  </TableCell>
                  <TableCell className='capitalize'>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className='capitalize'>{user.role}</TableCell>
                  <TableCell className='capitalize'>
                    {user.signupMethod}
                  </TableCell>
                  <TableCell>
                    <div key={user?._id} className='flex items-center gap-2'>
                      <Link href={`/dashboard/users/view/${user?._id}`}>
                        <button
                          className='p-2 rounded bg-[#182641] hover:!bg-[#182641]/90 text-white'
                          title='View'
                        >
                          <FaEye className='w-3 h-3' />
                        </button>
                      </Link>
                      <Link href={`/dashboard/users/edit/${user?._id}`}>
                        <button
                          className='p-2 bg-green-500 hover:!bg-green-600 text-white rounded'
                          title='Edit'
                        >
                          <FaEdit className='w-3 h-3' />
                        </button>
                      </Link>
                      <button
                        className='p-2 bg-red-600 text-white rounded hover:bg-red-700'
                        title='Delete'
                        onClick={() => handleDeleteUser(user)}
                      >
                        <FaTrash className='w-3 h-3' />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
            <Button onClick={() => setIsDeleteModalOpen(false)} color='dark'>
              Cancel
            </Button>
            <Button
              onClick={() => deleteUser(selectedUser?._id)}
              color='failure'
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
