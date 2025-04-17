"use client";
import { useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/login");
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error);
    }
  };
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-700'>
          Create an Account
        </h2>
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

          <Button type='submit' color='blue' className='w-full'>
            Sign Up
          </Button>
        </form>

        {/* <div className='relative my-5 flex items-center'>
          <div className='flex-grow border-t border-gray-300'></div>
          <span className='mx-4 flex-shrink text-gray-600'>or</span>
          <div className='flex-grow border-t border-gray-300'></div>
        </div>
        <div className='space-y-4'>
          <Button className='w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:!bg-gray-50'>
            <FcGoogle className='text-xl mr-2' /> Sign up with Google
          </Button>

          <Button className='w-full flex items-center justify-center gap-2 bg-black text-white hover:!bg-gray-800'>
            <FaGithub className='text-xl mr-2' /> Sign up with GitHub
          </Button>
        </div> */}
      </div>
    </div>
  );
}
