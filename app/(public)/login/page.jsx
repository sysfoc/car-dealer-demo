"use client";
import { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";
import Google from "@/app/components/auth/Google";
import Github from "@/app/components/auth/Github";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/lib/features/user/userSlice";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
            {loading ? (
              <Spinner color='warning' aria-label='Spinning' size='md' />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className='relative my-5 flex items-center'>
          <div className='flex-grow border-t border-gray-300'></div>
          <span className='mx-4 flex-shrink text-gray-600'>or</span>
          <div className='flex-grow border-t border-gray-300'></div>
        </div>
        <div className='space-y-4'>
          <Google />
          <Github />
        </div>
      </div>
    </div>
  );
}
