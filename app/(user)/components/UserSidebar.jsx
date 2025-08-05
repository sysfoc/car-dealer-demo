"use client";

import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { TiFlowMerge } from "react-icons/ti";
import { MdSubscriptions } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { BiSupport, BiWorld } from "react-icons/bi";
import { IoSettings, IoClose } from "react-icons/io5";
import { RiRefundFill } from "react-icons/ri";
import { FaMoneyBill1 } from "react-icons/fa6";
import { GrDomain } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";

const UserSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      if (res.ok) {
        dispatch(logoutSuccess());
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='md:hidden p-4 flex justify-between items-center bg-white shadow fixed top-0 w-full z-50'>
        <h2 className='text-base font-semibold text-gray-800 capitalize'>
          {currentUser?.name?.split(" ")[0]}'s Dashboard
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-2xl text-[#fb8b4c]'
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 z-40 h-screen w-[16rem] bg-[#fa7123] transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <Sidebar
          aria-label='Sidebar of a dashboard'
          className='w-full h-full shadow sidebar text-white pt-16 md:pt-0'
        >
          <Sidebar.Logo href='/user/dashboard' className="capitalize">
            {currentUser?.name?.split(" ")[0]}&apos;s Dashboard
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href='/'
                icon={BiWorld}
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
              >
                Visit Site
              </Sidebar.Item>
              <Sidebar.Item
                href='/user/dashboard'
                icon={HiChartPie}
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href='/user/dashboard/domain-setup'
                icon={GrDomain}
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
              >
                Domain setup
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={MdSubscriptions}
                label='Subscription'
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

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
                  href='/user/dashboard/subscription/details'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Upgrade Plan
                </Sidebar.Item>
                <Sidebar.Item
                  href='/user/dashboard/subscription/add-ons'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Add-ons
                </Sidebar.Item>
                <Sidebar.Item
                  href='/user/dashboard/subscription/themes'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Themes
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                icon={RiRefundFill}
                label='Refund'
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

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
                  href='/user/dashboard/refund/request'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Refund Request
                </Sidebar.Item>
                <Sidebar.Item
                  href='/user/dashboard/refund/cancel-subscription'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Cancel Subscription
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                icon={FaMoneyBill1}
                label='Billings'
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

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
                  href='/user/dashboard/billing/invoices'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Invoices
                </Sidebar.Item>
                <Sidebar.Item
                  href='/user/dashboard/billing/payment/history'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Payment History
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                icon={IoSettings}
                label='Settings'
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

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
                  href='/user/dashboard/settings/general'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  General
                </Sidebar.Item>
                <Sidebar.Item
                  href='/user/dashboard/settings/profile'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Profile
                </Sidebar.Item>
                <Sidebar.Item
                  href='/user/dashboard/settings/security'
                  className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
                >
                  Security
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item
                href='/user/dashboard/notifications'
                icon={IoMdNotifications}
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
              >
                Notifications
              </Sidebar.Item>
              <Sidebar.Item
                href='/user/dashboard/support'
                icon={BiSupport}
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white'
              >
                Support
              </Sidebar.Item>
              <Sidebar.Item
                icon={CiLogout}
                className='!text-white hover:!bg-[#fb8b4c] hover:!text-white cursor-pointer'
                onClick={handleLogout}
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
};

export default UserSidebar;
