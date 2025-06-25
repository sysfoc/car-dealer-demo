"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useSelector } from "react-redux";
const ProjectTemplates = () => {
  const dealers = [
    {
      id: 1,
      name: "Autocar Dealer Theme Next Js Template",
      image: "/demo-1.png",
      alt: "Car dealership showroom with multiple vehicles - Dealer One",
      price: 1000,
      link: "https://car-dealer-app-nextjs1.vercel.app/",
    },
    {
      id: 2,
      name: "Website for Automotive Dealers Built to Sell Cars",
      image: "/demo-2.png",
      alt: "Exterior view of a modern car dealership - Dealer Two",
      price: 500,
      link: "https://car-dealer-app-nextjs-demo2.vercel.app/",
    },
    {
      id: 3,
      name: "Dealer Three",
      image: "/demo-3.webp",
      alt: "Luxury cars displayed at a high-end car dealership - Dealer Three",
      price: 2000,
      link: "/",
    },
  ];
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const buySelectedPlan = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchUserThemes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/themes/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
          setThemes(data.themes);
          setLoading(false);
        }
        if (response.status === 404) {
          setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserThemes();
  }, []);

  const handleStripePayment = async () => {
    setLoading(true);
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
    setLoading(false);
    if (res.ok) {
      window.location.href = data.url;
    }
  };

  const handlePaypalPayment = async () => {
    setLoading(true);
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
    setLoading(false);
    if (res.ok) {
      window.location.href = data.url;
    }
  };
  return (
    <section className='my-14 mx-4 md:mx-12'>
      <div className='py-5 flex items-center justify-center'>
        <div className='text-center w-full md:w-[50%]'>
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            Great packs of ready-made templates.
          </h2>
          <p className='mt-5 text-gray-500'>
            Choose one of the existing styles or follow your ideas and customize
            your site
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='flex items-center gap-x-10 gap-y-5 justify-between flex-wrap'>
          <div className='flex items-center gap-3'>
            <FaCheck fontSize={20} className='text-red-600' />
            <span className='font-semibold'>Tailwind Css Supported</span>
          </div>
          <div className='flex items-center gap-3'>
            <FaCheck fontSize={20} className='text-red-600' />
            <span className='font-semibold'>
              Change Fonts & Colors Globally
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <FaCheck fontSize={20} className='text-red-600' />
            <span className='font-semibold'>Fully Responsive Layout</span>
          </div>
        </div>
      </div>
      <div className='my-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              className='relative rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-4 group'
            >
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
                <div className='py-3'>
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
                  disabled={themes.some(
                    (theme) =>
                      theme.isActive && theme.themeName?.includes(dealer.name)
                  )}
                  onClick={() =>
                    buySelectedPlan(
                      setSelectedPlan({
                        plan: `${dealer.name} theme`,
                        price: `${dealer.price}`,
                      })
                    )
                  }
                  size='sm'
                  className={`${
                    !currentUser && "hidden"
                  } bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:!bg-red-700`}
                >
                  {themes.some(
                    (theme) =>
                      theme.isActive && theme.themeName?.includes(dealer.name)
                  )
                    ? "Already Subscribed"
                    : "Purchase Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>
          <p>
            Select Payment Method For {selectedPlan?.plan.slice(0, -6)} at $
            {selectedPlan?.price}
          </p>
        </ModalHeader>
        <ModalBody>
          <div
            className={`${
              !currentUser && "hidden"
            } w-full py-10 flex items-center justifiy-center`}
          >
            <div className='w-full flex flex-col gap-4'>
              <Button
                onClick={handleStripePayment}
                color='dark'
                className='w-full uppercase'
                disabled={loading}
              >
                Pay Using Stripe
              </Button>
              <Button
                onClick={handlePaypalPayment}
                color='blue'
                className='w-full uppercase'
                disabled={loading}
              >
                Pay Using Paypal
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </section>
  );
};

export default ProjectTemplates;
