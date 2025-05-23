"use client";

import { Alert, Button, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Themes() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUserThemes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/themes/get-all");
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

  const handleThemeStatus = async (theme) => {
    setLoading(true);
    const res = await fetch(`/api/user/themes/update/${theme?._id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: !theme?.activeTheme }),
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
            <h2 className='text-2xl font-bold md:text-3xl'>Manage Themes</h2>
          </div>
        </div>
      </section>
      <div className='w-full'>
        <div className='mx-auto flex flex-col items-center gap-5'>
          {loading && (
            <Spinner aria-label='Loading Spinner' size='xl' color='blue' />
          )}
          <div className='w-[90%] flex flex-col gap-3 shadow-md px-8 py-6 rounded-lg bg-white'>
            {themes.length > 0 &&
              themes.map((theme) => (
                <Alert key={theme?._id} color='failure'>
                  <span>
                    <span className='font-medium'>Note:</span> Your subscription
                    for{" "}
                    <span className='font-semibold'>
                      {theme?.themeName.slice(0, -6)}
                    </span>{" "}
                    is expiring on{" "}
                    {new Date(theme?.expiredAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(theme?.expiredAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </Alert>
              ))}
          </div>
          {themes.length > 0 ? (
            themes.map((theme) => (
              <div
                key={theme?._id}
                className='relative w-[90%] shadow-md px-8 py-6 rounded-lg bg-white'
              >
                {theme?.expiredAt &&
                  new Date(theme?.expiredAt) < new Date() && (
                    <div className='absolute inset-0 bg-black/70 z-10 flex items-center justify-center'>
                      <span className='text-white text-lg font-semibold'>
                        Theme Expired! Want to renew?{" "}
                        <Link href={"/"} className='text-red-600'>
                          Click here
                        </Link>
                      </span>
                    </div>
                  )}
                <div className='flex items-center gap-8 flex-wrap md:flex-nowrap'>
                  <div className='w-full flex items-end justify-between flex-wrap md:flex-nowrap gap-5'>
                    <div className='flex flex-col gap-1'>
                      <h3 className='text-xl font-semibold'>
                        {theme?.themeName.slice(0, -6)}
                      </h3>
                      <p>
                        Status:{" "}
                        {theme?.activeTheme ? (
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
                        {new Date(theme?.subscribedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                        at{" "}
                        {new Date(theme?.subscribedAt)
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
                        ${theme?.themePrice}/month
                      </span>
                      <Button
                        onClick={() => handleThemeStatus(theme)}
                        size='sm'
                        className={`${
                          theme?.activeTheme
                            ? "bg-red-500 hover:!bg-red-600"
                            : "bg-green-500 hover:!bg-green-600"
                        }`}
                      >
                        {theme?.activeTheme ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='w-[90%] shadow-md px-8 py-6 rounded-lg bg-white'>
              <p className='text-center font-semibold'>
                No theme found! Please purchase one from{" "}
                <Link href={"/"} className='text-red-600'>
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
