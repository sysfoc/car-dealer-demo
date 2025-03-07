"use client";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <Sidebar
      aria-label="Sidebar of a dashboard"
      className="w-[18rem] h-screen shadow-lg sidebar"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="#"
            icon={HiChartPie}
            className="text-white hover:!bg-white hover:!text-black"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiViewBoards}
            className="text-white hover:!bg-white hover:!text-black"
          >
            Invoice
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiInbox}
            className="text-white hover:!bg-white hover:!text-black"
          >
            Payment Gateways
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiUser}
            className="text-white hover:!bg-white hover:!text-black"
          >
            Users
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiShoppingBag}
            className="text-white hover:!bg-white hover:!text-black"
          >
            Payment History
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiArrowSmRight}
            className="text-white hover:!bg-white hover:!text-black"
          >
            Billings
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default AdminSidebar;
