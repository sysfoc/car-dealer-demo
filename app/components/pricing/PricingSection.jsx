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
import { dealers } from "@/lib/themes/theme";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
const PricingSection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTheme, setSelectedTheme] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const router = useRouter();
  const currentURL = window.location.href;

  const buySelectedPlan = () => {
    setShowThemeModal(true);
    setSelectedTheme([]);
  };

  const handleSelectedTheme = (theme) => {
    let maxThemes = 1;
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
  const fetchIpAndCurrency = async () => {
    try {
      const response1 = await fetch("api/track/ip");
      const data1 = await response1.json();

      if (response1.ok && data1?.country_code) {
        const country = data1.country_code;
        const response2 = await fetch(
          `/api/payment/currencies/get/country/${country}`
        );
        const data2 = await response2.json();

        if (response2.ok) {
          setSelectedCurrency(data2.country);
        }
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
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
  const fetchData = async () => {
    try {
      const response1 = await fetch("/api/user/get/settings");
      const data1 = await response1.json();

      if (response1.ok && data1.settings?.currency) {
        const currency = data1.settings.currency;
        const response2 = await fetch(
          `/api/payment/currencies/get/currency-name/${currency}`
        );
        const data2 = await response2.json();

        if (response2.ok) {
          setSelectedCurrency(data2.currency);
        }
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (currentUser?._id) {
      fetchUserSubscription();
      fetchData();
    } else {
      fetchIpAndCurrency();
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
        timePeriod: selectedPlan?.timePeriod,
        price: selectedCurrency.country
          ? selectedPlan?.price * selectedCurrency?.price
          : selectedPlan?.price,
        currency: selectedCurrency?.currency,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = data.url;
      localStorage.setItem("RedirectURL", currentURL);
    }
  };
  const handlePaypalPayment = async () => {
    try {
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
        localStorage.setItem("RedirectURL", currentURL);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
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
              <Link
                href='/login'
                className='animate-pulse text-red-600 mt-2 text-sm font-semibold'
              >
                Please login first to subscribe the plan
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='my-5 flex items-center justify-center'>
        <div className='w-full sm:w-[400px] rounded-lg border-t-4 bg-white border-[#fa7123] p-8 shadow-md'>
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
                <TableHeadCell className='bg-[#fa7123] text-white text-left'>
                  <div>
                    <h2 className='text-xl'>Features</h2>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#fa7123] text-white'>
                  <div>
                    {currentUser?._id ? (
                      <h2
                        className={`text-xl hover:underline cursor-pointer ${
                          subscription?.subscriptionType === "Basic" &&
                          subscription?.isActive
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() =>
                          buySelectedPlan(
                            setSelectedPlan({
                              plan: "Basic",
                              price: 74.99,
                              timePeriod: "Monthly",
                            })
                          )
                        }
                      >
                        Basic
                      </h2>
                    ) : (
                      <h2
                        className='text-xl hover:underline cursor-pointer'
                        onClick={() => router.push("/login")}
                      >
                        Basic
                      </h2>
                    )}
                    <h3 className='text-lg'>
                      (
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = Number(
                            74.99 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.
                              <sup>{sup}</sup>
                            </>
                          );
                        })()
                      ) : (
                        <>
                          USD 74.<sup>99</sup>
                        </>
                      )}
                      <sub className='text-xs font-normal'>/month</sub>)
                    </h3>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#fa7123] text-white'>
                  <div>
                    {currentUser?._id ? (
                      <h2
                        className={`text-xl hover:underline cursor-pointer ${
                          subscription?.subscriptionType === "Standard" &&
                          subscription?.isActive
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() =>
                          buySelectedPlan(
                            setSelectedPlan({
                              plan: "Standard",
                              price: 199.99,
                              timePeriod: "Monthly",
                            })
                          )
                        }
                      >
                        Standard
                      </h2>
                    ) : (
                      <h2
                        className='text-xl hover:underline cursor-pointer'
                        onClick={() => router.push("/login")}
                      >
                        Standard
                      </h2>
                    )}
                    <h3 className='text-lg'>
                      (
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = Number(
                            199.99 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.
                              <sup>{sup}</sup>
                            </>
                          );
                        })()
                      ) : (
                        <>
                          USD 199.<sup>99</sup>
                        </>
                      )}
                      <sub className='text-xs font-normal'>/month</sub>)
                    </h3>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#fa7123] text-white'>
                  <div>
                    {currentUser?._id ? (
                      <h2
                        className={`text-xl hover:underline cursor-pointer ${
                          subscription?.subscriptionType === "Premium" &&
                          subscription?.isActive
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() =>
                          buySelectedPlan(
                            setSelectedPlan({
                              plan: "Premium",
                              price: 349.99,
                              timePeriod: "Monthly",
                            })
                          )
                        }
                      >
                        Premium
                      </h2>
                    ) : (
                      <h2
                        className='text-xl hover:underline cursor-pointer'
                        onClick={() => router.push("/login")}
                      >
                        Premium
                      </h2>
                    )}
                    <h3 className='text-lg'>
                      (
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = Number(
                            349.99 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.
                              <sup>{sup}</sup>
                            </>
                          );
                        })()
                      ) : (
                        <>
                          USD 349.<sup>99</sup>
                        </>
                      )}
                      <sub className='text-xs font-normal'>/month</sub>)
                    </h3>
                  </div>
                </TableHeadCell>
              </TableHead>
              <TableBody className='text-left [&_tr:nth-child(odd)]:bg-[#fa7123]/10 text-gray-700'>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Setup Charges</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>
                        {selectedCurrency?.country ? (
                          (() => {
                            const converted = Number(
                              199 * selectedCurrency.price
                            ).toFixed(2);
                            const [main, sup] = converted.split(".");
                            return (
                              <>
                                {selectedCurrency.currency} {main}.
                                <sup>{sup}</sup>
                              </>
                            );
                          })()
                        ) : (
                          <>USD 199</>
                        )}{" "}
                        (Free for Limited Time)
                      </b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>
                        {selectedCurrency?.country ? (
                          (() => {
                            const converted = Number(
                              199 * selectedCurrency.price
                            ).toFixed(2);
                            const [main, sup] = converted.split(".");
                            return (
                              <>
                                {selectedCurrency.currency} {main}.
                                <sup>{sup}</sup>
                              </>
                            );
                          })()
                        ) : (
                          <>USD 199</>
                        )}{" "}
                        (Free for Limited Time)
                      </b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>
                        {selectedCurrency?.country ? (
                          (() => {
                            const converted = Number(
                              199 * selectedCurrency.price
                            ).toFixed(2);
                            const [main, sup] = converted.split(".");
                            return (
                              <>
                                {selectedCurrency.currency} {main}.
                                <sup>{sup}</sup>
                              </>
                            );
                          })()
                        ) : (
                          <>USD 199</>
                        )}{" "}
                        (Free for Limited Time)
                      </b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Themes Choices</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>3</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>6</b>
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
                            className='w-full uppercase bg-[#fa7123] hover:!bg-[#fa7123]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7123]'
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
                            className='w-full uppercase bg-[#fa7123] hover:!bg-[#fa7123]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7123]'
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
                            className='w-full uppercase bg-[#fa7123] hover:!bg-[#fa7123]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7123]'
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
                  {dealers
                    .filter((dealer, index) => {
                      if (selectedPlan?.plan === "Basic") {
                        return index < 2;
                      }
                      if (selectedPlan?.plan === "Standard") {
                        return index < 3;
                      }
                      if (selectedPlan?.plan === "Premium") {
                        return true;
                      }
                      return false;
                    })
                    .map((dealer) => (
                      <div
                        key={dealer.id}
                        className='relative rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-4 group'
                      >
                        {selectedTheme.includes(dealer.name) && (
                          <span className='p-2 bg-[#fa7123] rounded-md text-sm text-white absolute top-2 left-2'>
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
                              Theme {dealer.id} -{" "}
                              <span className='text-[#fa7123]'>
                                {dealer.name}
                              </span>
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
                              handleSelectedTheme(
                                dealer.name,
                                selectedPlan?.plan
                              )
                            }
                            size='sm'
                            className='bg-[#fa7123] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:!bg-[#fa7123]/90'
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
            size='xl'
            onClose={() => setShowPaymentModal(false)}
          >
            <ModalHeader>
              <p>Confirm Payment Details</p>
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <div className='mb-2'>
                  <h3 className='text-xl font-semibold text-center bg-black text-white p-2'>
                    {selectedPlan?.plan} (
                    {selectedTheme?.map((theme) => theme).join(", ")})
                  </h3>
                </div>
                <div className='flex flex-col gap-2 my-6'>
                  <div className='flex items-center justify-between'>
                    <p className='text-lg'>Subtotal:</p>
                    <p>
                      {selectedCurrency?.currency === "AUD"
                        ? `${selectedCurrency?.currency} ${Number(
                            (selectedPlan?.price / 1.1) *
                              selectedCurrency?.price
                          ).toFixed(2)}`
                        : `${selectedCurrency?.currency} ${Number(
                            selectedPlan?.price * selectedCurrency?.price
                          ).toFixed(2)}`}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-lg'>GST/VAT:</p>
                    <p>
                      {selectedCurrency?.currency === "AUD"
                        ? `${selectedCurrency?.currency} ${Number(
                            (selectedPlan?.price - selectedPlan?.price / 1.1) *
                              selectedCurrency?.price
                          ).toFixed(2)}`
                        : `${selectedCurrency?.currency} 0.00`}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-lg'>Total:</p>
                    <p className='font-semibold'>
                      {selectedCurrency?.currency &&
                        `${selectedCurrency?.currency} ${(
                          selectedPlan?.price * selectedCurrency?.price
                        ).toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full flex items-center justify-center'>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <Button
                      onClick={handleStripePayment}
                      className='w-full flex items-center justify-center gap-3 bg-[#635bff] hover:!bg-[#5146ff] text-white font-semibold rounded-md transition duration-300'
                    >
                      <FaCcStripe fontSize={22} className='text-white mr-2' />
                      <span>Pay now</span>
                    </Button>
                    <p className='mt-2 text-xs text-gray-500 text-justify'>
                      Credit/Debit Card (via Stripe) – No Stripe account
                      required
                    </p>
                  </div>
                  <div>
                    <Button
                      onClick={handlePaypalPayment}
                      className='w-full flex items-center justify-center gap-3 bg-[#FFC439] hover:!bg-[#ffb123] text-black font-semibold rounded-md transition duration-300'
                    >
                      <img
                        src='/payment-icons/PayPal.png'
                        alt='paypal'
                        width={80}
                      />
                    </Button>
                    <p className='mt-2 text-xs text-gray-500 text-justify'>
                      Credit/Debit Card or PayPal – Pay with your card or use
                      your PayPal account.
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <p className='text-xs text-gray-500 text-center'>
                Payments are securely processed by our parent company SYSFOC
                Web Solutions
              </p>
            </ModalFooter>
          </Modal>
        </div>
      ) : (
        <div className='my-10'>
          <div className='w-full overflow-x-scroll md:overflow-hidden shadow rounded-lg'>
            <Table striped className='min-w-[700px] md:w-full table-fixed'>
              <TableHead className='text-center'>
                <TableHeadCell className='bg-[#fa7123] text-white text-left'>
                  <div>
                    <h2 className='text-xl'>Features</h2>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#fa7123] text-white'>
                  <div>
                    {currentUser?._id ? (
                      <h2
                        className={`text-xl hover:underline cursor-pointer ${
                          subscription?.subscriptionType === "Yearly Basic" &&
                          subscription?.isActive
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() =>
                          buySelectedPlan(
                            setSelectedPlan({
                              plan: "Yearly Basic",
                              price: 764.99,
                              timePeriod: "Yearly",
                            })
                          )
                        }
                      >
                        Basic
                      </h2>
                    ) : (
                      <h2
                        className='text-xl hover:underline cursor-pointer'
                        onClick={() => router.push("/login")}
                      >
                        Basic
                      </h2>
                    )}
                    <h3 className='text-lg'>
                      (
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = Number(
                            764.99 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.
                              <sup>{sup}</sup>
                            </>
                          );
                        })()
                      ) : (
                        <>
                          USD 764.<sup>99</sup>
                        </>
                      )}
                      <sub className='text-xs font-normal'>/year</sub>)
                    </h3>
                    <span className='text-white animate-pulse'>
                      Saves upto{" "}
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = Number(
                            135 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.{sup}
                            </>
                          );
                        })()
                      ) : (
                        <>USD 135</>
                      )}{" "}
                      on 15% OFF
                    </span>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#fa7123] text-white'>
                  <div>
                    {currentUser?._id ? (
                      <h2
                        className={`text-xl hover:underline cursor-pointer ${
                          subscription?.subscriptionType ===
                            "Yearly Standard" && subscription?.isActive
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() =>
                          buySelectedPlan(
                            setSelectedPlan({
                              plan: "Yearly Standard",
                              price: 2029.99,
                              timePeriod: "Yearly",
                            })
                          )
                        }
                      >
                        Standard
                      </h2>
                    ) : (
                      <h2
                        className='text-xl hover:underline cursor-pointer'
                        onClick={() => router.push("/login")}
                      >
                        Standard
                      </h2>
                    )}
                    <h3 className='text-lg'>
                      (
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = Number(
                            2029.99 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.
                              <sup>{sup}</sup>
                            </>
                          );
                        })()
                      ) : (
                        <>
                          USD 2029.<sup>99</sup>
                        </>
                      )}
                      <sub className='text-xs font-normal'>/year</sub>)
                    </h3>
                    <span className='text-white animate-pulse'>
                      Saves upto{" "}
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = (
                            358 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.{sup}
                            </>
                          );
                        })()
                      ) : (
                        <>USD 358</>
                      )}{" "}
                      on 15% OFF
                    </span>
                  </div>
                </TableHeadCell>
                <TableHeadCell className='bg-[#fa7123] text-white'>
                  <div>
                    {currentUser?._id ? (
                      <h2
                        className={`text-xl hover:underline cursor-pointer ${
                          subscription?.subscriptionType === "Yearly Premium" &&
                          subscription?.isActive
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() =>
                          buySelectedPlan(
                            setSelectedPlan({
                              plan: "Yearly Premium",
                              price: 3558.99,
                              timePeriod: "Yearly",
                            })
                          )
                        }
                      >
                        Premium
                      </h2>
                    ) : (
                      <h2
                        className='text-xl hover:underline cursor-pointer'
                        onClick={() => router.push("/login")}
                      >
                        Premium
                      </h2>
                    )}

                    <h3 className='text-lg'>
                      (
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = (
                            3558.99 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.
                              <sup>{sup}</sup>
                            </>
                          );
                        })()
                      ) : (
                        <>
                          USD 3558.<sup>99</sup>
                        </>
                      )}
                      <sub className='text-xs font-normal'>/year</sub>)
                    </h3>
                    <span className='text-white animate-pulse'>
                      Saves upto{" "}
                      {selectedCurrency?.country ? (
                        (() => {
                          const converted = (
                            628 * selectedCurrency.price
                          ).toFixed(2);
                          const [main, sup] = converted.split(".");
                          return (
                            <>
                              {selectedCurrency.currency} {main}.{sup}
                            </>
                          );
                        })()
                      ) : (
                        <>USD 628</>
                      )}{" "}
                      on 15% OFF
                    </span>
                  </div>
                </TableHeadCell>
              </TableHead>
              <TableBody className='text-left [&_tr:nth-child(odd)]:bg-[#fa7123]/10 text-gray-700'>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Setup Charges</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>
                        {selectedCurrency?.country ? (
                          (() => {
                            const converted = Number(
                              199 * selectedCurrency.price
                            ).toFixed(2);
                            const [main, sup] = converted.split(".");
                            return (
                              <>
                                {selectedCurrency.currency} {main}.
                                <sup>{sup}</sup>
                              </>
                            );
                          })()
                        ) : (
                          <>USD 199</>
                        )}{" "}
                        (Free for Limited Time)
                      </b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>
                        {selectedCurrency?.country ? (
                          (() => {
                            const converted = Number(
                              199 * selectedCurrency.price
                            ).toFixed(2);
                            const [main, sup] = converted.split(".");
                            return (
                              <>
                                {selectedCurrency.currency} {main}.
                                <sup>{sup}</sup>
                              </>
                            );
                          })()
                        ) : (
                          <>USD 199</>
                        )}{" "}
                        (Free for Limited Time)
                      </b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>
                        {selectedCurrency?.country ? (
                          (() => {
                            const converted = Number(
                              199 * selectedCurrency.price
                            ).toFixed(2);
                            const [main, sup] = converted.split(".");
                            return (
                              <>
                                {selectedCurrency.currency} {main}.
                                <sup>{sup}</sup>
                              </>
                            );
                          })()
                        ) : (
                          <>USD 199</>
                        )}{" "}
                        (Free for Limited Time)
                      </b>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className='w-min bg-white'>
                  <TableCell>
                    <div>
                      <p className='text-sm'>Themes Choices</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>2</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>3</b>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <b>6</b>
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
                            className='w-full uppercase bg-[#fa7123] hover:!bg-[#fa7123]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7123]'
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
                            className='w-full uppercase bg-[#fa7123] hover:!bg-[#fa7123]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7123]'
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
                            className='w-full uppercase bg-[#fa7123] hover:!bg-[#fa7123]/90 text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#fa7123]'
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
                  {dealers
                    .filter((dealer, index) => {
                      if (selectedPlan?.plan === "Yearly Basic") {
                        return index < 2;
                      }
                      if (selectedPlan?.plan === "Yearly Standard") {
                        return index < 3;
                      }
                      if (selectedPlan?.plan === "Yearly Premium") {
                        return true;
                      }
                      return false;
                    })
                    .map((dealer) => (
                      <div
                        key={dealer.id}
                        className='relative rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-4 group'
                      >
                        {selectedTheme.includes(dealer.name) && (
                          <span className='p-2 bg-[#fa7123] rounded-md text-sm text-white absolute top-2 left-2'>
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
                              Theme {dealer.id} -{" "}
                              <span className='text-[#fa7123]'>
                                {dealer.name}
                              </span>
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
                              handleSelectedTheme(
                                dealer.name,
                                selectedPlan?.plan
                              )
                            }
                            size='sm'
                            className='bg-[#fa7123] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:!bg-[#fa7123]/90'
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
            size='xl'
            onClose={() => setShowPaymentModal(false)}
          >
            <ModalHeader>
              <p>Confirm Payment Details</p>
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <div className='mb-2'>
                  <h3 className='text-xl font-semibold text-center bg-black text-white p-2'>
                    {selectedPlan?.plan} (
                    {selectedTheme?.map((theme) => theme).join(", ")})
                  </h3>
                </div>
                <div className='flex flex-col gap-2 my-6'>
                  <div className='flex items-center justify-between'>
                    <p className='text-lg'>Subtotal:</p>
                    <p>
                      {selectedCurrency?.currency === "AUD"
                        ? `${selectedCurrency?.currency} ${Number(
                            (selectedPlan?.price / 1.1) *
                              selectedCurrency?.price
                          ).toFixed(2)}`
                        : `${selectedCurrency?.currency} ${Number(
                            selectedPlan?.price * selectedCurrency?.price
                          ).toFixed(2)}`}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-lg'>GST/VAT:</p>
                    <p>
                      {selectedCurrency?.currency === "AUD"
                        ? `${selectedCurrency?.currency} ${Number(
                            (selectedPlan?.price - selectedPlan?.price / 1.1) *
                              selectedCurrency?.price
                          ).toFixed(2)}`
                        : `${selectedCurrency?.currency} 0.00`}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-lg'>Total:</p>
                    <p className='font-semibold'>
                      {selectedCurrency?.currency &&
                        `${selectedCurrency?.currency} ${(
                          selectedPlan?.price * selectedCurrency?.price
                        ).toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full flex items-center justify-center'>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <Button
                      onClick={handleStripePayment}
                      className='w-full flex items-center justify-center gap-3 bg-[#635bff] hover:!bg-[#5146ff] text-white font-semibold rounded-md transition duration-300'
                    >
                      <FaCcStripe fontSize={22} className='text-white mr-2' />
                      <span>Pay now</span>
                    </Button>
                    <p className='mt-2 text-xs text-gray-500 text-justify'>
                      Credit/Debit Card (via Stripe) – No Stripe account
                      required
                    </p>
                  </div>
                  <div>
                    <Button
                      onClick={handlePaypalPayment}
                      className='w-full flex items-center justify-center gap-3 bg-[#FFC439] hover:!bg-[#ffb123] text-black font-semibold rounded-md transition duration-300'
                    >
                      <img
                        src='/payment-icons/PayPal.png'
                        alt='paypal'
                        width={80}
                      />
                    </Button>
                    <p className='mt-2 text-xs text-gray-500 text-justify'>
                      Credit/Debit Card or PayPal – Pay with your card or use
                      your PayPal account.
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <p className='text-xs text-gray-500 text-center'>
                Payments are securely processed by our parent company SYSFOC
                Web Solutions
              </p>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </section>
  );
};

export default PricingSection;
