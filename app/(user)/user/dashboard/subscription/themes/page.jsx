"use client";

import { Alert, Button, Spinner, ToggleSwitch } from "flowbite-react";
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
      <div className='mb-5 w-full'>
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
                    <span className='font-semibold'>{theme?.themeName}</span> is
                    expiring on{" "}
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
                  {theme?.activeTheme && <div className="absolute top-1 left-1">
                    <span className="text-xs bg-yellow-100 px-2 py-1 text-yellow-500 font-semibold rounded capitalize">Live</span>
                  </div>}
                  <div className='w-full flex items-center justify-between flex-wrap md:flex-nowrap gap-5'>
                    <div className='py-2 flex flex-col gap-1'>
                      <h3 className='text-xl font-semibold'>
                        {theme?.themeName}
                      </h3>
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
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center justify-end'>
                        <ToggleSwitch color="failure" checked={theme?.activeTheme} onChange={() => handleThemeStatus(theme)} />
                      </div>
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
