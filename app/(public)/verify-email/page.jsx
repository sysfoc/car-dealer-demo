"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, Button } from "flowbite-react";
import Image from "next/image";

export default function VerifyEmail() {
  const rawSearchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const tokenVal = rawSearchParams.get("token");
    const emailVal = rawSearchParams.get("email");
    setToken(tokenVal);
    setEmail(emailVal);
  }, [rawSearchParams]);

  useEffect(() => {
    if (token && email) {
      fetch(`/api/auth/verify-email?token=${token}&email=${email}`)
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage("Verification failed."));
    }
  }, [token, email]);

  return (
    <section className='my-10'>
      <div className='mx-auto w-[500px] bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-center'>
            <Image src={"/logo.png"} alt='logo' width={200} height={200} />
          </div>
          <div className='mt-3'>
            <h2 className='text-xl font-semibold'>Status:</h2>
            <Alert color='success'>
              <span className='font-medium'>{message}</span>
            </Alert>
          </div>
          <div>
            <Button color='success' href='/login'>Go back to Login</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
