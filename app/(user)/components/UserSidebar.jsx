"use client";

import { Sidebar } from "flowbite-react";
import { HiChartPie, HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { TiFlowMerge } from "react-icons/ti";
import { MdSubscriptions, MdOutlinePayment } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { RiRefundFill } from "react-icons/ri";
import { FaMoneyBill1 } from "react-icons/fa6";

const UserSidebar = () => {
  return (
    <Sidebar
      aria-label="Sidebar of a dashboard"
      className="hidden md:block w-[18rem] h-screen shadow sidebar"
    >
      <Sidebar.Logo href="/user/dashboard">User Dashboard</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/user/dashboard"
            icon={HiChartPie}
            className="hover:!bg-[#EA96FF] hover:!text-black"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={MdSubscriptions}
            label="Subscription"
            className="hover:!bg-[#EA96FF] hover:!text-black"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return (
                <IconComponent
                  aria-hidden
                  className={TiFlowMerge(
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Plan Details
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Upgrade Plan
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Add-ons
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Trial Status
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={RiRefundFill}
            label="Refund"
            className="hover:!bg-[#EA96FF] hover:!text-black"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return (
                <IconComponent
                  aria-hidden
                  className={TiFlowMerge(
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Refund Request
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Cancel Subscription
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={FaMoneyBill1}
            label="Billings"
            className="hover:!bg-[#EA96FF] hover:!text-black"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return (
                <IconComponent
                  aria-hidden
                  className={TiFlowMerge(
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <Sidebar.Item
              href="/user/dashboard/billing/invoices"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Invoices
            </Sidebar.Item>
            <Sidebar.Item
              href="/user/dashboard/billing/payment/history"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Payment History
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Billing Details
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={MdOutlinePayment}
            label="Payments"
            className="hover:!bg-[#EA96FF] hover:!text-black"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return (
                <IconComponent
                  aria-hidden
                  className={TiFlowMerge(
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Gateways
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Saved
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Default Gateway
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={IoSettings}
            label="Settings"
            className="hover:!bg-[#EA96FF] hover:!text-black"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return (
                <IconComponent
                  aria-hidden
                  className={TiFlowMerge(
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <Sidebar.Item
              href="/user/dashboard/settings/profile"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              href="/user/dashboard/settings/security"
              className="hover:!bg-[#EA96FF] hover:!text-black"
            >
              Security
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            href="/dashboard/payment/history"
            icon={IoMdNotifications}
            className="hover:!bg-[#EA96FF] hover:!text-black"
          >
            Notifications
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/payment/history"
            icon={BiSupport}
            className="hover:!bg-[#EA96FF] hover:!text-black"
          >
            Support
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default UserSidebar;
