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
      <Sidebar.Logo href="/dashboard">User Dashboard</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/dashboard"
            icon={HiChartPie}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={MdSubscriptions}
            label="Subscription"
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
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
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Plan Details
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Upgrade Plan
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Add-ons
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Trial Status
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={RiRefundFill}
            label="Refund"
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
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
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Refund Request
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Cancel Subscription
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={FaMoneyBill1}
            label="Billings"
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
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
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Invoices
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Payment History
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Billing Details
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={MdOutlinePayment}
            label="Payments"
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
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
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Gateways
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Saved
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Default Gateway
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={IoSettings}
            label="Settings"
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
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
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              Security
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
            >
              2F Auth
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            href="/dashboard/payment/history"
            icon={IoMdNotifications}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Notifications
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/payment/history"
            icon={BiSupport}
            className="hover:!bg-[#0dcaf021] hover:!text-[#2899b0]"
          >
            Support
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default UserSidebar;
