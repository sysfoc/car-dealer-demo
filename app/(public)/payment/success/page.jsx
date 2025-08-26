"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

export default function PaymentSuccessPage() {
  const [called, setCalled] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const data = searchParams.get("data");
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useRouter();
  const redirectURL = localStorage.getItem("RedirectURL");

  useEffect(() => {
    if (!token || called) return;

    setCalled(true);
    const capturePayment = async () => {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, data }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("Payment successfull!");
        if (redirectURL) {
          localStorage.removeItem("RedirectURL");
          window.location.href = redirectURL;
        } else {
          navigate.push("/user/dashboard");
        }
      } else {
        setStatus("Payment verification failed.");
        localStorage.removeItem("RedirectURL");
        navigate.push("/failed-payment");
      }
    };

    capturePayment();
  }, [token, called]);

  return (
    <main className='h-screen p-10'>
      {status === "Verifying payment..." && (
        <div>
          <div className='w-[100px] h-[100px] mx-auto flex items-center justify-center p-4 rounded-full bg-green-600'>
            <BiCheck size={70} color='white' />
          </div>
          <div className='mt-4 text-center flex flex-col gap-1'>
            <h1 className='text-3xl font-bold text-gray-700'>
              Verifying your payment
            </h1>
            <p className='text-lg font-semibold text-gray-400'>
              Please wait...
            </p>
          </div>
        </div>
      )}
      {status === "Payment successfull!" && (
        <div>
          <div className='w-[100px] h-[100px] mx-auto flex items-center justify-center p-4 rounded-full bg-green-600'>
            <BiCheck size={70} color='white' />
          </div>
          <div className='mt-4 text-center flex flex-col gap-1'>
            <h1 className='text-3xl font-bold text-gray-700'>
              Payment Successfull!
            </h1>
            <p className='text-lg font-semibold text-gray-400'>
              Please wait...
            </p>
          </div>
        </div>
      )}
      {status === "Payment verification failed." && (
        <div>
          <div className='w-[100px] h-[100px] mx-auto flex items-center justify-center p-4 rounded-full bg-red-600'>
            <IoClose size={70} color='white' />
          </div>
          <div className='mt-4 text-center flex flex-col gap-1'>
            <h1 className='text-3xl font-bold text-gray-700'>
              Your payment Failed
            </h1>
            <p className='text-lg font-semibold text-gray-400'>
              Please try again
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
