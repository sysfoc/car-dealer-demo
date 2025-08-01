"use client";
import { useState } from "react";
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import Google from "@/app/components/auth/Google";
import Github from "@/app/components/auth/Github";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setSuccess(true);
        setSuccessMessage(data.message);
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
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-700'>
          Create an Account
        </h2>
        {success && (
          <Alert className='mb-3' color='success' icon={HiInformationCircle}>
            <span className='font-medium'>{successMessage}</span>
          </Alert>
        )}
        {error && (
          <Alert className='mb-3' color='failure' icon={HiInformationCircle}>
            <span className='font-medium'>{errorMessage}</span>
          </Alert>
        )}
        <form className='space-y-4' onSubmit={handleFormData}>
          <div>
            <Label htmlFor='name' value='Full Name' />
            <TextInput
              id='name'
              type='text'
              placeholder='John Doe'
              required
              autoComplete='on'
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              autoComplete='on'
              placeholder='john@gmail.com'
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor='password' value='Password' />
            <TextInput
              id='password'
              type='password'
              placeholder='********'
              required
              autoComplete='on'
              onChange={handleChange}
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
              "Register Now"
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
            Already have an account?{" "}
            <Link className='text-[#fa7123]' href='/login'>
              Login now
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
