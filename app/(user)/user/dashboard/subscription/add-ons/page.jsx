"use client";
import { Alert, Button, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Addons() {
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUserAddons = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/add-ons/get-all");
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
  }, []);

  const handleAddonStatus = async (addon) => {
    setLoading(true);
    const res = await fetch(`/api/user/add-ons/update/${addon?._id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: !addon?.isActive }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      window.location.reload();
    } else {
      alert(data.message);
    }
  };
  return (
    <>
      <section className='my-5 w-full flex items-center justify-center relative'>
        <div className='text-center'>
          <div className='mt-5'>
            <h2 className='text-2xl font-bold md:text-3xl'>Manage Add-ons</h2>
          </div>
        </div>
      </section>
      <div className='w-full'>
        <div className='mx-auto flex flex-col items-center gap-5'>
          {loading && (
            <Spinner aria-label='Loading Spinner' size='xl' color='blue' />
          )}
          <div className='w-[90%] flex flex-col gap-3 shadow-md px-8 py-6 rounded-lg bg-white'>
            <Alert color='info'>
              <span>
                <span className='font-medium'>Note:</span> You can activate or
                deactivate add-ons from here.
              </span>
            </Alert>
            {addOns.length > 0 &&
              addOns.map((addon) => (
                <Alert color='failure'>
                  <span>
                    <span className='font-medium'>Note:</span> Your subscription
                    for{" "}
                    <span className='font-semibold'>{addon?.serviceName}</span>{" "}
                    is expiring on{" "}
                    {new Date(addon?.expiredAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(addon?.expiredAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </Alert>
              ))}
          </div>
          {addOns.length > 0 ? (
            addOns.map((addon) => (
              <div
                key={addon?._id}
                className='relative w-[90%] shadow-md px-8 py-6 rounded-lg bg-white'
              >
                {addon?.expiredAt &&
                  new Date(addon?.expiredAt) < new Date() && (
                    <div className='absolute inset-0 bg-black/70 z-10 flex items-center justify-center'>
                      <span className='text-white text-lg font-semibold'>
                        Addon Expired! Want to renew?{" "}
                        <Link href={"/add-ons"} className='text-red-600'>
                          Click here
                        </Link>
                      </span>
                    </div>
                  )}
                <div className='flex items-center gap-8 flex-wrap md:flex-nowrap'>
                  <div className='w-[100px] h-[100px] flex-shrink-0'>
                    <Image
                      src={`${
                        addon?.serviceName.includes("add-on") ===
                        "Content Writing"
                          ? "/07.png"
                          : addon.serviceName.includes("SEO")
                          ? "/08.png"
                          : "/09.png"
                      }`}
                      alt={addon?.serviceName}
                      width={100}
                      height={100}
                      className='rounded-full p-5 bg-gray-50/95'
                    />
                  </div>
                  <div className='w-full flex items-end justify-between flex-wrap md:flex-nowrap gap-5'>
                    <div className='flex flex-col gap-1'>
                      <h3 className='text-xl font-semibold'>
                        {addon?.serviceName}
                      </h3>
                      <p>
                        Status:{" "}
                        {addon?.isActive ? (
                          <span className='text-green-600 font-semibold'>
                            Active
                          </span>
                        ) : (
                          <span className='text-red-600 font-semibold'>
                            Inactive
                          </span>
                        )}
                      </p>
                      <p className='text-sm'>
                        Subscribed At:{" "}
                        {new Date(addon?.subscribedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                        at{" "}
                        {new Date(addon?.subscribedAt)
                          .toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .toLowerCase()}
                      </p>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <span className='px-5 py-2 rounded-md text-sm bg-gray-100'>
                        ${addon?.servicePrice}/month
                      </span>
                      <Button
                        onClick={() => handleAddonStatus(addon)}
                        size='sm'
                        className={`${
                          addon?.isActive
                            ? "bg-red-500 hover:!bg-red-600"
                            : "bg-green-500 hover:!bg-green-600"
                        }`}
                      >
                        {addon?.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='w-[90%] shadow-md px-8 py-6 rounded-lg bg-white'>
              <p className='text-center font-semibold'>
                No add-ons found! Please purchase one from{" "}
                <Link href={"/add-ons"} className='text-red-600'>
                  here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
