"use client";

import { Sidebar } from "flowbite-react";
import { BiSupport } from "react-icons/bi";
import { FaBlog } from "react-icons/fa6";
import { FaBitcoin } from "react-icons/fa";
import { GrDomain } from "react-icons/gr";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <Sidebar
      aria-label='Sidebar of a dashboard'
      className='hidden md:block w-[18rem] h-screen shadow admin-sidebar'
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
            icon={FaBitcoin }
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
  );
};

export default AdminSidebar;
