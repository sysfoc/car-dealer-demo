"use client";

import { Sidebar } from "flowbite-react";
import { BiSupport } from "react-icons/bi";
import { FaBlog } from "react-icons/fa6";
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
      className='hidden md:block w-[18rem] h-screen shadow sidebar'
    >
      <Sidebar.Logo href='/dashboard'>Admin Dashboard</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href='/dashboard'
            icon={HiChartPie}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href='/dashboard/invoices'
            icon={HiViewBoards}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Invoice
          </Sidebar.Item>
          <Sidebar.Item
            href='/dashboard/users'
            icon={HiUser}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Users
          </Sidebar.Item>
          <Sidebar.Item
            href='/dashboard/domains'
            icon={GrDomain}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Domains
          </Sidebar.Item>
          <Sidebar.Item
            href='/dashboard/payment/history'
            icon={HiShoppingBag}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Payment History
          </Sidebar.Item>
          <Sidebar.Item
            href='/dashboard/refund/requests'
            icon={HiArrowSmRight}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Refund requests
          </Sidebar.Item>
          <Sidebar.Item
            href='/dashboard/support'
            icon={BiSupport}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Support
          </Sidebar.Item>
          <Sidebar.Item
            href='/dashboard/blogs'
            icon={FaBlog}
            className='hover:!bg-[#0dcaf021] hover:!text-[#2899b0]'
          >
            Blogs
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSidebar;
