"use client";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Addons() {
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUserAddons = async () => {
      try {
        const response = await fetch("/api/user/add-ons/get-all");
        const data = await response.json();
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
    const res = await fetch(`/api/user/add-ons/update/${addon?._id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: !addon?.isActive }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.reload();
    } else {
      console.log(data.message);
    }
  };
  return (
    <>
      <section className='my-10 w-full flex items-center justify-center relative'>
        <div className='text-center'>
          <div className='mt-5'>
            <h2 className='text-2xl font-bold md:text-3xl'>Manage Add-ons</h2>
            <p className='mt-1'>
              Manage your add-ons, activate or deactivate them
            </p>
          </div>
        </div>
      </section>
      <div className='w-full'>
        <div className='mx-auto flex flex-col items-center gap-5'>
          {addOns.map((addon) => (
            <div
              key={addon?._id}
              className='w-[90%] shadow-md px-8 py-6 rounded-lg bg-white'
            >
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
          ))}
        </div>
      </div>
    </>
  );
}
