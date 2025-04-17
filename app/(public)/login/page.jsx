"use client";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({});
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/user/dashboard");
      } else {
        console.log("Unknown User", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-700'>
          Login To Your Account
        </h2>

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
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
