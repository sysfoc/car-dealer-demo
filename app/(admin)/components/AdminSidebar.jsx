"use client";

import { Sidebar } from "flowbite-react";
import { BiSupport } from "react-icons/bi";
import { FaBlog } from "react-icons/fa6";
import { FaBitcoin } from "react-icons/fa";
import { GrDomain } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useState } from "react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='md:hidden p-4 flex justify-between items-center bg-white shadow fixed top-0 w-full z-50'>
        <h2 className='text-base font-semibold text-gray-800'>
          Admin Dashboard
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-2xl text-[#182641]'
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 z-40 h-screen w-[16rem] bg-[#182641] transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <Sidebar
          aria-label='Sidebar of a dashboard'
          className='w-full h-full shadow admin-sidebar text-white pt-16 md:pt-0'
        >
          <Sidebar.Logo href='/dashboard'>Admin Dashboard</Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href='/dashboard'
                icon={HiChartPie}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/invoices'
                icon={HiViewBoards}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Invoice
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/users'
                icon={HiUser}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Users
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/domains'
                icon={GrDomain}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Domains
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/payment/history'
                icon={HiShoppingBag}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Payment History
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/refund/requests'
                icon={HiArrowSmRight}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Refund requests
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/currencies'
                icon={FaBitcoin}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Currencies
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/support'
                icon={BiSupport}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Support
              </Sidebar.Item>
              <Sidebar.Item
                href='/dashboard/blogs'
                icon={FaBlog}
                className='!text-white hover:!bg-[#344b76] hover:!text-white'
              >
                Blogs
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
};

export default AdminSidebar;
