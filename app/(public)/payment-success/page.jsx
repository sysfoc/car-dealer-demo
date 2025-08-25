"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BiCheck } from "react-icons/bi";
import { TiLocationArrowOutline } from "react-icons/ti";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const hasVerified = useRef(false);
  const redirectURL = localStorage.getItem("RedirectURL");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || hasVerified.current) return;
      hasVerified.current = true;

      try {
        const res = await fetch(
          `/api/stripe/verify-user-session?session_id=${sessionId}`
        );
        if (res.ok) {
          if (redirectURL) {
            localStorage.removeItem("RedirectURL");
            window.location.href = redirectURL;
          }
          router.push("/user/dashboard");
        } else {
          const data = await res.json();
          alert(data.error || "Payment verification failed");
          localStorage.removeItem("RedirectURL");
          router.push("/failed-payment");
        }
      } catch (err) {
        alert("Something went wrong verifying your payment.");
        localStorage.removeItem("RedirectURL");
        router.push("/failed-payment");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, router]);

  return (
    <div className='h-screen p-10 text-center'>
      {loading ? (
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
      ) : (
        <div>
          <div className='w-[100px] h-[100px] mx-auto flex items-center justify-center p-4 rounded-full bg-green-600'>
            <TiLocationArrowOutline size={70} color='white' />
          </div>
          <div className='mt-4 text-center flex flex-col gap-1'>
            <h1 className='text-3xl font-bold text-gray-700'>Redirecting</h1>
            <p className='text-lg font-semibold text-gray-400'>
              Please wait...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
