"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const UserButton = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='my-2 bg-[#182641] rounded-md'>
      {currentUser?.role === "admin" && (
        <div className='flex items-center justify-end p-5'>
          <span className='text-sm text-white'>
            Want to visit the user dashboard?{" "}
            <Link className='text-white animate-pulse' href='/user/dashboard'>
              Click Here
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default UserButton;
