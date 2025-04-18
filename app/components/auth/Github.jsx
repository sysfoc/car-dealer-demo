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
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

const Github = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const auth = getAuth(app);
  const githubProvider = new GithubAuthProvider();

  const handleGithubOauth = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      const result = await signInWithPopup(auth, githubProvider);
      const res = await fetch("/api/auth/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName || "no name",
          email: "noemail@gmail.com",
          profileImg: result.user.photoURL,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/user/dashboard");
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
