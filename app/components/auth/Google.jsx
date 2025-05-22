"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "flowbite-react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "@/app/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/lib/features/user/userSlice";

const Google = () => {
  const auth = getAuth(app);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { error: errorMessage, loading } = useSelector((state) => state.user);

  const handleGoogleOauth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      dispatch(loginStart());
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName || "",
          email: result.user.email || "",
          profileImg: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/user/dashboard";
        dispatch(loginSuccess(data.user));
      } else {
        setError(true);
        dispatch(loginFailure(data.message));
      }
    } catch (error) {
      setError(true);
      dispatch(loginFailure(error.message));
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
        disabled={loading}
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
