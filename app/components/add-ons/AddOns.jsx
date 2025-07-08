"use client";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCcStripe } from "react-icons/fa6";
import { SlPaypal } from "react-icons/sl";
const AddOns = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [addOns, setAddOns] = useState([]);

  const services = [
    {
      id: 1,
      image: "/09.png",
      alt: "Feature 7 - Google Fonts Integration",
      title: "Content Writing",
      description:
        "Sysfoc car dealer provides full of features for creating a perfect Business website. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit optio dicta nihil excepturi magni!",
      price: 300,
    },
    {
      id: 2,
      image: "/08.png",
      alt: "Feature 8 - SEO Optimization",
      title: "SEO Optimization",
      description:
        "Optimize your website for better search rankings and online visibility. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit optio dicta nihil excepturi magni!",
      price: 500,
    },
    {
      id: 3,
      image: "/07.png",
      alt: "Feature 9 - Social Media Marketing",
      title: "Social Media Marketing",
      description:
        "Boost your brand's for better search rankings and online visibility. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit optio dicta nihil excepturi magni",
      price: 400,
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
                            : "Purchase"}
                        </Button>
                      )}
                    </div>
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
