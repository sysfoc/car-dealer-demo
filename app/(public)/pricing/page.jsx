"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  const buySelectedPlan = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  useEffect(() => {
    setLoading(true);
    if (currentUser?._id) {
      const fetchUserSubscription = async () => {
        try {
          const response = await fetch("/api/user/subscription/detail");
          const data = await response.json();
          if (response.ok) {
            setSubscription(data.subscription);
            setLoading(false);
          }
          if (response.status === 404) {
            setLoading(false);
          }
        } catch (error) {
          console.error(error.message);
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
        price: selectedPlan?.price,
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
        price: selectedPlan?.price,
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
            Simple Pricing, Unbeatable Value
          </h1>
          <p className='mt-3 text-center'>Join 1000+ Happy Users</p>
          {!currentUser && (
            <div>
              <p className='text-red-600 my-2 text-sm font-semibold'>
                Please login first to purchase plan
              </p>
            </div>
          )}
        </div>
      </div>
      <div className='my-10'>
        <div className='w-full overflow-x-scroll md:overflow-hidden shadow rounded-lg'>
          <Table striped className='min-w-[700px] md:w-full table-fixed'>
            <TableHead className='text-center'>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Features</h2>
                </div>
              </TableHeadCell>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Basic</h2>
                  <h3 className='text-lg'>
                    ($99.<sup>99</sup>
                    <sub className='text-xs font-normal'>/month</sub>)
                  </h3>
                </div>
              </TableHeadCell>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Standard</h2>
                  <h3 className='text-lg'>
                    ($249.<sup>99</sup>
                    <sub className='text-xs font-normal'>/month</sub>)
                  </h3>
                </div>
              </TableHeadCell>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Premium</h2>
                  <h3 className='text-lg'>
                    ($499.<sup>99</sup>
                    <sub className='text-xs font-normal'>/month</sub>)
                  </h3>
                </div>
              </TableHeadCell>
            </TableHead>
            <TableBody className='text-left'>
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
                    <b>30 cars</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>200 cars</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Unlimited</b>
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
                    <b>Unlimited</b>
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
                    <p className='text-sm'>Phone Support </p>
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
                    <TableCell>
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
                          disabled={subscription?.subscriptionType === "Basic"}
                          onClick={() =>
                            buySelectedPlan(
                              setSelectedPlan({ plan: "Basic", price: "99.99" })
                            )
                          }
                          color='dark'
                          className='w-full uppercase'
                        >
                          {subscription?.subscriptionType === "Basic"
                            ? "Current Plan"
                            : "Buy Basic"}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center justify-center'>
                        <Button
                          disabled={
                            subscription?.subscriptionType === "Standard"
                          }
                          onClick={() =>
                            buySelectedPlan(
                              setSelectedPlan({
                                plan: "Standard",
                                price: "249.99",
                              })
                            )
                          }
                          color='dark'
                          className='w-full uppercase'
                        >
                          {subscription?.subscriptionType === "Standard"
                            ? "Current Plan"
                            : "Buy Standard"}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center justify-center'>
                        <Button
                          disabled={
                            subscription?.subscriptionType === "Premium"
                          }
                          onClick={() =>
                            buySelectedPlan(
                              setSelectedPlan({
                                plan: "Premium",
                                price: "499.99",
                              })
                            )
                          }
                          color='dark'
                          className='w-full uppercase'
                        >
                          {subscription?.subscriptionType === "Premium"
                            ? "Current Plan"
                            : "Buy Premium"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
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
                  Pay Using Stripe
                </Button>
                <Button
                  onClick={handlePaypalPayment}
                  color='blue'
                  className='w-full uppercase'
                >
                  Pay Using Paypal
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </section>
  );
}
