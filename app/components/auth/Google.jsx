"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "flowbite-react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/lib/features/user/userSlice";

const Google = () => {
  const auth = getAuth(app);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleOauth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName || "no name",
          email: result.user.email || "noemail@gmail.com",
          profileImg: result.user.photoURL,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/user/dashboard");
        dispatch(loginSuccess(data.user));
      } else {
        setError(true);
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };
  return (
    <>
      {error && (
        <div
          className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 fixed top-5 right-5 max-w-[400px]'
          role='alert'
        >
          <span className='font-medium'>Oops!</span> {errorMessage}
        </div>
      )}
      <Button
        onClick={handleGoogleOauth}
        className='w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:!bg-gray-50'
      >
        <FcGoogle className='text-xl mr-2' />{" "}
        {loading ? "Loading..." : "Sign up with Google"}
      </Button>
    </>
  );
};

export default Google;
