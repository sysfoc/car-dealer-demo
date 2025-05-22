"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import {
  GithubAuthProvider,
  signOut,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { app } from "@/app/firebase/firebase";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/lib/features/user/userSlice";

const Github = () => {
  const [error, setError] = useState(false);
  const auth = getAuth(app);
  const githubProvider = new GithubAuthProvider();
  const dispatch = useDispatch();
  const { error: errorMessage, loading } = useSelector((state) => state.user);

  const handleGithubOauth = async () => {
    try {
      dispatch(loginStart());
      await signOut(auth);
      const result = await signInWithPopup(auth, githubProvider);
      const res = await fetch("/api/auth/github", {
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
        onClick={handleGithubOauth}
        className='w-full flex items-center justify-center gap-2 bg-black text-white hover:!bg-gray-800'
      >
        <FaGithub className='text-xl mr-2' />{" "}
        {loading ? "Loading..." : "Sign in with Github"}
      </Button>
    </>
  );
};

export default Github;
