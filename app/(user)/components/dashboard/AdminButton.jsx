"use client";
import React from "react";
import { Button } from "flowbite-react";
import { MdLogin } from "react-icons/md";
import { useSelector } from "react-redux";
import Link from "next/link";

const AdminButton = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser?.role === "admin" && (
        <div className='flex items-center justify-end mb-3'>
          <Link href='/dashboard'>
            <Button color='info' size='sm' title='Admin Dashboard'>
              <MdLogin fontSize={20} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminButton;
