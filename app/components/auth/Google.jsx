"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Alert, Button } from "flowbite-react";
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
      let customErrorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/account-exists-with-different-credential") {
        customErrorMessage =
          "Account already exists with different credentials.";
      }
      if (error.code === "auth/popup-closed-by-user") {
        customErrorMessage =
          "You closed the popup before completing the sign-in.";
      }

      dispatch(loginFailure(customErrorMessage));
    }
  };
  return (
    <>
      {error && (
        <Alert
          color='failure'
          className='fixed top-5 right-5 max-w-[400px] z-50'
          role='alert'
        >
          {errorMessage}
        </Alert>
      )}
      <Button
        disabled={loading}
        onClick={handleGoogleOauth}
        className='w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:!bg-gray-50'
      >
        <FcGoogle className='text-xl mr-2' />{" "}
        {loading ? "Loading..." : "Continue with Google"}
      </Button>
    </>
  );
};

export default Google;
