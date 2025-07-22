"use client";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCcStripe } from "react-icons/fa6";
import { SlPaypal } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import ContentWriting from "./content/ContentWritting";
import SEO from "./content/Seo";
import SocialMedia from "./content/SocialMedia";
const AddOns = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [addOns, setAddOns] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const toggleDropdown = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const services = [
    {
      id: 1,
      image: "/09.png",
      alt: "Feature 7 - Google Fonts Integration",
      title: "Content Writing",
      description:
        "We create clear, engaging, and SEO-friendly content tailored for car dealers — designed to increase traffic, build authority, and turn visitors into customers.",
      price: 300,
      detail: <ContentWriting />,
    },
    {
      id: 2,
      image: "/08.png",
      alt: "Feature 8 - SEO Optimization",
      title: "SEO Optimization",
      description:
        "Our SEO services will improve your website so it appears higher on Google when people search for Vehicles. The higher your site appears, the more people click and visit — which means more leads and more sales.",
      price: 500,
      detail: <SEO />,
    },
    {
      id: 3,
      image: "/07.png",
      alt: "Feature 9 - Social Media Marketing",
      title: "Social Media Marketing",
      description:
        "We manage your Facebook and Instagram and other social media accounts to build your online presence, engage local buyers, and generate more leads — all while you focus on running your business.",
      price: 400,
      detail: <SocialMedia />,
    },
  ];

  useEffect(() => {
    setLoading(true);
    if (currentUser?._id) {
      const fetchUserAddons = async () => {
        try {
          const response = await fetch("/api/user/add-ons/details");
          const data = await response.json();
          setLoading(false);
          if (response.ok) {
            setAddOns(data.addons);
            setLoading(false);
          }
          if (response.status === 404) {
            setLoading(false);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchUserAddons();
    }
  }, [currentUser]);
  const buySelectedPlan = () => {
    setShowModal(true);
  };

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
    <section className='mx-4 md:mx-12 my-5'>
      <div className='flex items-center justify-center'>
        <div className='w-full md:w-[80%]'>
          <div className='flex flex-col items-center gap-5'>
            {services.map((service) => (
              <div
                key={service.id}
                className='w-full shadow-md px-8 py-6 rounded-lg bg-white'
              >
                <div className='flex items-center gap-8 flex-wrap md:flex-nowrap'>
                  <div className='w-[100px] h-[100px] flex-shrink-0'>
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={100}
                      height={100}
                      className='rounded-full p-5 bg-gray-50/95'
                    />
                  </div>
                  <div className='w-full flex items-end justify-between flex-wrap md:flex-nowrap gap-5'>
                    <div className='flex flex-col gap-1'>
                      <h3 className='text-xl font-semibold'>{service.title}</h3>
                      <p className='text-gray-500'>{service.description}</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <span className='px-5 py-2 rounded-md text-sm bg-gray-100'>
                        ${service.price}/month
                      </span>
                      {currentUser && (
                        <Button
                          className='w-full bg-red-600 hover:!bg-red-700 text-white'
                          disabled={addOns.some(
                            (addon) =>
                              addon.isActive &&
                              addon.serviceName?.includes(service.title)
                          )}
                          onClick={() =>
                            buySelectedPlan(
                              setSelectedPlan({
                                plan: `${service.title} add-on`,
                                price: `${service.price}`,
                              })
                            )
                          }
                        >
                          {addOns.some(
                            (addon) =>
                              addon.isActive &&
                              addon.serviceName?.includes(service.title)
                          )
                            ? "Subscribed"
                            : "Subscribe Now"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className='mt-2 flex items-center justify-center cursor-pointer'
                    onClick={() => toggleDropdown(service.id)}
                  >
                    <IoIosArrowDown
                      fontSize={26}
                      className={`text-gray-500 transition-transform duration-300 ${
                        activeId === service.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-auto ${
                      activeId === service.id
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {service?.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                disabled={loading}
              >
                <FaCcStripe fontSize={22} className='text-white' />
                <span className='ml-3'>Pay Using Stripe</span>
              </Button>
              <Button
                onClick={handlePaypalPayment}
                color='blue'
                className='w-full uppercase'
                disabled={loading}
              >
                <SlPaypal fontSize={20} className='text-white' />
                <span className='ml-3'>Pay Using Paypal</span>
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </section>
  );
};

export default AddOns;
