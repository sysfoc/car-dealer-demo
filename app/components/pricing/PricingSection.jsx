"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  ToggleSwitch,
} from "flowbite-react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaCcStripe } from "react-icons/fa6";
import { SlPaypal } from "react-icons/sl";
import { dealers } from "@/lib/themes/theme";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
const PricingSection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTheme, setSelectedTheme] = useState([]);

  const buySelectedPlan = () => {
    setShowThemeModal(true);
    setSelectedTheme([]);
  };

  const handleSelectedTheme = (theme, selectedPlan) => {
    let maxThemes = 1;
    if (selectedPlan === "Standard" || selectedPlan === "Yearly Standard")
      maxThemes = 2;
    if (selectedPlan === "Premium" || selectedPlan === "Yearly Premium")
      maxThemes = 3;
    setSelectedTheme((prevThemes) => {
      const alreadySelected = prevThemes.includes(theme);
      let updatedThemes = alreadySelected
        ? prevThemes.filter((t) => t !== theme)
        : [...prevThemes, theme];
      if (updatedThemes.length > maxThemes) {
        updatedThemes = updatedThemes.slice(-maxThemes);
      }
      return updatedThemes;
    });
  };

  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };

  useEffect(() => {
    setLoading(true);
    if (currentUser?._id) {
      const fetchUserSubscription = async () => {
        try {
          const response = await fetch("/api/user/subscription/detail");
          const data = await response.json();
          setLoading(false);
          if (response.ok) {
            setSubscription(data.subscription);
            setLoading(false);
          }
          if (response.status === 404) {
            setLoading(false);
          }
        } catch (error) {
          alert(error.message);
        }
      };
      fetchUserSubscription();
    }
  }, [currentUser]);
  const handleStripePayment = async () => {
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser?._id,
        plan: selectedPlan?.plan,
        themes: selectedTheme,
        price: selectedPlan?.price,
        timePeriod: selectedPlan?.timePeriod,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = data.url;
    }
  };
  const handlePaypalPayment = async () => {
    const res = await fetch("/api/paypal/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser?._id,
        plan: selectedPlan?.plan,
        themes: selectedTheme,
        price: selectedPlan?.price,
        timePeriod: selectedPlan?.timePeriod,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = data.url;
    }
  };

  return (
    <section className='mx-4 my-10 sm:mx-8'>
      <div className='text-center'>
        <div className='mt-5'>
          <h1 className='text-2xl font-bold md:text-4xl'>
            Choose a Plan That Fits Your Dealership
          </h1>
          <p className='mt-3 text-center'>We're excited to serve you!</p>
          {!currentUser && (
            <div>
              <p className='text-red-600 my-2 text-sm font-semibold'>
                Please login first to purchase plan
              </p>
            </div>
          )}
        </div>
      </div>
      <div className='my-8 flex items-center justify-center'>
        <div className='w-full sm:w-[400px] rounded-lg border-t-4 bg-white border-[#e56c16] p-8 shadow-md'>
          <h2 className='text-center'>Subscription Term</h2>
          <div className='flex items-center justify-center'>
            <div className='mt-4 flex flex-row items-center gap-5'>
              <p className='text-sm'>Monthly</p>
              <ToggleSwitch
                label='Annual'
                color='yellow'
                checked={yearly}
                onChange={() => setYearly(!yearly)}
                sizing='sm'
              />
            </div>
          </div>
        </div>
      </div>
      {!yearly ? (
        <div className='my-10'>
          <div className='w-full overflow-x-scroll md:overflow-hidden shadow rounded-lg'>
            <Table striped className='min-w-[700px] md:w-full table-fixed'>
              <TableHead className='text-center'>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Features</h2>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Basic</h2>
                    <h3 className='text-lg'>
                      ($74.<sup>99</sup>
                      <sub className='text-xs font-normal'>/month</sub>)
                    </h3>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Standard</h2>
                    <h3 className='text-lg'>
                      ($199.<sup>99</sup>
                      <sub className='text-xs font-normal'>/month</sub>)
                    </h3>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Premium</h2>
                    <h3 className='text-lg'>
                      ($349.<sup>99</sup>
                      <sub className='text-xs font-normal'>/month</sub>)
                    </h3>
                  </div>
                </TableHeadCell>
              </TableHead>
              <TableBody className='text-left [&_tr:nth-child(odd)]:bg-[#e56c16]/10 text-gray-700'>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Themes Subscriptions</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>1</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 3</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Hard Disk Limit</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>10 GB</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>25 GB</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>50 GB</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Car Listing Limit</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>25 cars</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>100 cars</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>350 cars</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Google Listing</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Number of Videos</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>15</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>50</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>User Accounts</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 5</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 10</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Email Accounts</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 5</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 10</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Fully Operational Website</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Inventory Management</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Integrated Blog</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>VPS Hosting</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Google Analytics</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Ongoing Maintenance & Bug Fixes</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Responsive Design</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Basic SEO Optimization</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Advanced SEO Tools</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Email & Chat Support</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>24 hour</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>12 hour</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>12 hour</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Basic Customization</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Car Leasing</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Car Finance</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Website Backups</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Monthly</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Weekly</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Daily</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Migration</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Performance Optimization</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Third-Party Integrations</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Dedicated Account Manager</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                {currentUser &&
                  (loading ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className='flex items-center justify-center'>
                          <Spinner />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow className='w-min bg-white'>
                      <TableCell>
                        <div></div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center justify-center'>
                          <Button
                            disabled={
                              subscription?.subscriptionType === "Basic" &&
                              subscription?.isActive
                            }
                            onClick={() =>
                              buySelectedPlan(
                                setSelectedPlan({
                                  plan: "Basic",
                                  price: "74.99",
                                  timePeriod: "Monthly",
                                })
                              )
                            }
                            className='w-full uppercase bg-[#e56c16] hover:!bg-[#e56c16]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#e56c16]'
                          >
                            {subscription?.subscriptionType === "Basic" &&
                            subscription?.isActive
                              ? "Current Plan"
                              : "Subscribe Basic"}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center justify-center'>
                          <Button
                            disabled={
                              subscription?.subscriptionType === "Standard" &&
                              subscription?.isActive
                            }
                            onClick={() =>
                              buySelectedPlan(
                                setSelectedPlan({
                                  plan: "Standard",
                                  price: "199.99",
                                  timePeriod: "Monthly",
                                })
                              )
                            }
                            className='w-full uppercase bg-[#e56c16] hover:!bg-[#e56c16]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#e56c16]'
                          >
                            {subscription?.subscriptionType === "Standard" &&
                            subscription?.isActive
                              ? "Current Plan"
                              : "Subscribe Standard"}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center justify-center'>
                          <Button
                            disabled={
                              subscription?.subscriptionType === "Premium" &&
                              subscription?.isActive
                            }
                            onClick={() =>
                              buySelectedPlan(
                                setSelectedPlan({
                                  plan: "Premium",
                                  price: "349.99",
                                  timePeriod: "Monthly",
                                })
                              )
                            }
                            className='w-full uppercase bg-[#e56c16] hover:!bg-[#e56c16]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#e56c16]'
                          >
                            {subscription?.subscriptionType === "Premium" &&
                            subscription?.isActive
                              ? "Current Plan"
                              : "Subscribe Premium"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <Modal
            size='3xl'
            show={showThemeModal}
            onClose={() => setShowThemeModal(false)}
          >
            <ModalHeader>
              <p>Please select a theme for a {selectedPlan?.plan} plan</p>
            </ModalHeader>
            <ModalBody>
              <div className='w-full py-5 flex items-center justifiy-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {dealers.map((dealer) => (
                    <div
                      key={dealer.id}
                      className='relative rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-4 group'
                    >
                      {selectedTheme.includes(dealer.name) && (
                        <span className='p-2 bg-[#e56c16] rounded-md text-sm text-white absolute top-2 left-2'>
                          Selected
                        </span>
                      )}
                      <Link href={dealer.link} target='_blank'>
                        <div className='p-4 bg-white'>
                          <Image
                            src={dealer.image}
                            alt={dealer.alt}
                            width={500}
                            height={500}
                            className='size-auto'
                          />
                        </div>
                        <div className='px-2 py-3'>
                          <h3 className='text-center font-semibold text-xl'>
                            {dealer.name}
                          </h3>
                        </div>
                      </Link>
                      <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-y-4 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <Link href={dealer.link} target='_blank'>
                          <button className='flex items-center gap-2 bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-200'>
                            <AiOutlineEye className='text-lg' />
                            View Demo
                          </button>
                        </Link>
                        <Button
                          onClick={() =>
                            handleSelectedTheme(dealer.name, selectedPlan?.plan)
                          }
                          size='sm'
                          className='bg-[#e56c16] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:!bg-[#e56c16]/80'
                        >
                          {selectedTheme.includes(dealer.name)
                            ? "Unselect Theme"
                            : "Select Theme"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => handleProceedToPayment()}
                disabled={selectedTheme.length === 0}
                color='dark'
                className='w-full uppercase'
              >
                Proceed To Payment
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            show={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
          >
            <ModalHeader>
              <p>
                Select Payment Method For {selectedPlan?.plan} at $
                {selectedPlan?.price}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className='w-full py-5 flex items-center justifiy-center'>
                <div className='w-full flex flex-col gap-4'>
                  <Button
                    onClick={handleStripePayment}
                    color='dark'
                    className='w-full uppercase'
                  >
                    <FaCcStripe fontSize={22} className='text-white' />
                    <span className='ml-3'>Pay Using Stripe</span>
                  </Button>
                  <Button
                    onClick={handlePaypalPayment}
                    color='blue'
                    className='w-full uppercase'
                  >
                    <SlPaypal fontSize={20} className='text-white' />
                    <span className='ml-3'>Pay Using Paypal</span>
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      ) : (
        <div className='my-10'>
          <div className='w-full overflow-x-scroll md:overflow-hidden shadow rounded-lg'>
            <Table striped className='min-w-[700px] md:w-full table-fixed'>
              <TableHead className='text-center'>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Features</h2>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Basic</h2>
                    <h3 className='text-lg'>
                      ($764.<sup>99</sup>
                      <sub className='text-xs font-normal'>/year</sub>)
                    </h3>
                    <span className='text-white animate-pulse'>
                      Saves upto $135 on 15% OFF
                    </span>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Standard</h2>
                    <h3 className='text-lg'>
                      ($2,029.<sup>99</sup>
                      <sub className='text-xs font-normal'>/year</sub>)
                    </h3>
                    <span className='text-white animate-pulse'>
                      Saves upto $358 on 15% OFF
                    </span>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#e56c16] text-white'>
                  <div>
                    <h2 className='text-xl'>Premium</h2>
                    <h3 className='text-lg'>
                      ($3,559.<sup>99</sup>
                      <sub className='text-xs font-normal'>/year</sub>)
                    </h3>
                    <span className='text-white animate-pulse'>
                      Saves upto $628 on 15% OFF
                    </span>
                  </div>
                </TableHeadCell>
              </TableHead>
              <TableBody className='text-left [&_tr:nth-child(odd)]:bg-[#e56c16]/10 text-gray-700'>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Themes Subscription</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>1</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 3</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Hard Disk Limit</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>10 GB</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>25 GB</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>50 GB</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Car Listing Limit</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>25 cars</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>100 cars</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>350 cars</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Google Listing</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Number of Videos</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>15</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>50</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>User Accounts</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 5</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 10</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Email Accounts</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 5</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Upto 10</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Fully Operational Website</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Inventory Management</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Integrated Blog</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>VPS Hosting</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Google Analytics</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Ongoing Maintenance & Bug Fixes</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Responsive Design</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Basic SEO Optimization</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Advanced SEO Tools</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Email & Chat Support</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>24 hour</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>12 hour</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>12 hour</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Basic Customization</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Car Leasing</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Car Finance</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Website Backups</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Monthly</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Weekly</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>Daily</b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Migration</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Performance Optimization</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Third-Party Integrations</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Dedicated Account Manager</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'></div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <FaCheck fontSize='25' />
                    </div>
                  </TableCell>
                </TableRow>
                {currentUser &&
                  (loading ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className='flex items-center justify-center'>
                          <Spinner />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow className='w-min bg-white'>
                      <TableCell>
                        <div></div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center justify-center'>
                          <Button
                            disabled={
                              subscription?.subscriptionType ===
                                "Yearly Basic" && subscription?.isActive
                            }
                            onClick={() =>
                              buySelectedPlan(
                                setSelectedPlan({
                                  plan: "Yearly Basic",
                                  price: "764.99",
                                  timePeriod: "Yearly",
                                })
                              )
                            }
                            className='w-full uppercase bg-[#e56c16] hover:!bg-[#e56c16]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#e56c16]'
                          >
                            {subscription?.subscriptionType ===
                              "Yearly Basic" && subscription?.isActive
                              ? "Current Plan"
                              : "Subscribe Yearly Basic"}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center justify-center'>
                          <Button
                            disabled={
                              subscription?.subscriptionType ===
                                "Yearly Standard" && subscription?.isActive
                            }
                            onClick={() =>
                              buySelectedPlan(
                                setSelectedPlan({
                                  plan: "Yearly Standard",
                                  price: "2029.99",
                                  timePeriod: "Yearly",
                                })
                              )
                            }
                            className='w-full uppercase bg-[#e56c16] hover:!bg-[#e56c16]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#e56c16]'
                          >
                            {subscription?.subscriptionType ===
                              "Yearly Standard" && subscription?.isActive
                              ? "Current Plan"
                              : "Subscribe Yearly Standard"}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center justify-center'>
                          <Button
                            disabled={
                              subscription?.subscriptionType ===
                                "Yearly Premium" && subscription?.isActive
                            }
                            onClick={() =>
                              buySelectedPlan(
                                setSelectedPlan({
                                  plan: "Yearly Premium",
                                  price: "3558.99",
                                  timePeriod: "Yearly",
                                })
                              )
                            }
                            className='w-full uppercase bg-[#e56c16] hover:!bg-[#e56c16]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#e56c16]'
                          >
                            {subscription?.subscriptionType ===
                              "Yearly Premium" && subscription?.isActive
                              ? "Current Plan"
                              : "Subscribe Yearly Premium"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <Modal
            size='3xl'
            show={showThemeModal}
            onClose={() => setShowThemeModal(false)}
          >
            <ModalHeader>
              <p>Please select a theme for a {selectedPlan?.plan} plan</p>
            </ModalHeader>
            <ModalBody>
              <div className='w-full py-5 flex items-center justifiy-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {dealers.map((dealer) => (
                    <div
                      key={dealer.id}
                      className='relative rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-4 group'
                    >
                      {selectedTheme.includes(dealer.name) && (
                        <span className='p-2 bg-[#e56c16] rounded-md text-sm text-white absolute top-2 left-2'>
                          Selected
                        </span>
                      )}
                      <Link href={dealer.link} target='_blank'>
                        <div className='p-4 bg-white'>
                          <Image
                            src={dealer.image}
                            alt={dealer.alt}
                            width={500}
                            height={500}
                            className='size-auto'
                          />
                        </div>
                        <div className='px-2 py-3'>
                          <h3 className='text-center font-semibold text-xl'>
                            {dealer.name}
                          </h3>
                        </div>
                      </Link>
                      <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-y-4 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <Link href={dealer.link} target='_blank'>
                          <button className='flex items-center gap-2 bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-200'>
                            <AiOutlineEye className='text-lg' />
                            View Demo
                          </button>
                        </Link>
                        <Button
                          onClick={() =>
                            handleSelectedTheme(dealer.name, selectedPlan?.plan)
                          }
                          size='sm'
                          className='bg-[#e56c16] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:!bg-[#e56c16]/80'
                        >
                          {selectedTheme.includes(dealer.name)
                            ? "Unselect Theme"
                            : "Select Theme"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => handleProceedToPayment()}
                disabled={selectedTheme.length === 0}
                color='dark'
                className='w-full uppercase'
              >
                Proceed To Payment
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            show={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
          >
            <ModalHeader>
              <p>
                Select Payment Method For {selectedPlan?.plan} at $
                {selectedPlan?.price}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className='w-full py-10 flex items-center justifiy-center'>
                <div className='w-full flex flex-col gap-4'>
                  <Button
                    onClick={handleStripePayment}
                    color='dark'
                    className='w-full uppercase'
                  >
                    <FaCcStripe fontSize={22} className='text-white' />
                    <span className='ml-3'>Pay Using Stripe</span>
                  </Button>
                  <Button
                    onClick={handlePaypalPayment}
                    color='blue'
                    className='w-full uppercase'
                  >
                    <SlPaypal fontSize={20} className='text-white' />
                    <span className='ml-3'>Pay Using Paypal</span>
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      )}
    </section>
  );
};

export default PricingSection;
