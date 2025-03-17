"use client";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <Sidebar
      aria-label="Sidebar of a dashboard"
      className="hidden md:block w-[18rem] h-screen shadow sidebar"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/dashboard"
            icon={HiChartPie}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/invoices"
            icon={HiViewBoards}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Invoice
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiInbox}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Payment Gateways
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiUser}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Users
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/payment/history"
            icon={HiShoppingBag}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Payment History
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiArrowSmRight}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Billings
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSidebar;
