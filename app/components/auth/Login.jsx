"use client";
import { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Google from "@/app/components/auth/Google";
import Github from "@/app/components/auth/Github";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/lib/features/user/userSlice";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { error: errorMessage, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-700'>
          Login To Your Account
        </h2>
        {error && (
          <Alert className='mb-3' color='failure' icon={HiInformationCircle}>
            <span className='font-medium'>{errorMessage}</span>
          </Alert>
        )}
        <form className='space-y-4' onSubmit={handleFormData}>
          <div>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              autoComplete='on'
              placeholder='Enter your email'
              required
              onChange={handleChange}
            />
          </div>

          <div className='relative'>
            <Label htmlFor='password' value='Password' />
            <TextInput
              id='password'
              type='password'
              placeholder='Enter your password'
              required
              autoComplete='on'
              onChange={handleChange}
            />
            <FaEye
              fontSize={16}
              className='absolute right-3 top-[55%] cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("password").type =
                  document.getElementById("password").type === "password"
                    ? "text"
                    : "password";
              }}
            />
          </div>

          <Button
            disabled={loading}
            type='submit'
            className='w-full bg-[#fa7123] hover:!bg-[#fa7123]/90'
          >
            {loading ? (
              <Spinner color='warning' aria-label='Spinning' size='md' />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className='relative my-4 flex items-center'>
          <div className='flex-grow border-t border-gray-300'></div>
          <span className='mx-4 flex-shrink text-gray-600'>or</span>
          <div className='flex-grow border-t border-gray-300'></div>
        </div>
        <div className='space-y-4'>
          <Google />
          <Github />
        </div>
        <div className='mt-3'>
          <span className='text-sm'>
            Don't have an account?{" "}
            <Link className='text-[#fa7123]' href='/register'>
              Register Here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
