"use client";
import {
  Alert,
  Button,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function ContactUs() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: `${currentUser?.name || ""}`,
    email: `${currentUser?.email || ""}`,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setError(false);
        setSuccess(true);
        setSuccessMessage(data.message);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setLoading(false);
      } else {
        setSuccess(false);
        setError(true);
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setSuccess(false);
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen bg-gray-50 py-10 dark:bg-gray-800'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <h1 className='mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white'>
          Contact Us
        </h1>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-800 dark:text-white'>
              Get in Touch
            </h2>
            <p className='mb-6 text-gray-600 dark:text-gray-300'>
              Have questions or want to work with us? Fill out the form below,
              and we’ll get back to you as soon as possible.
            </p>
            <form onSubmit={handleFormSubmission}>
              {error && (
                <Alert color='failure' className='w-full mb-4'>
                  {errorMessage}
                </Alert>
              )}
              {success && (
                <Alert color='success' className='w-full mb-4'>
                  {successMessage}
                </Alert>
              )}
              <div className='mb-4'>
                <Label
                  htmlFor='name'
                  className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Name
                </Label>
                <TextInput
                  type='text'
                  id='name'
                  name='name'
                  autoComplete='on'
                  placeholder='John Doe'
                  defaultValue={formData?.name || ""}
                  disabled={formData?.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <Label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Email
                </Label>
                <TextInput
                  type='email'
                  id='email'
                  name='email'
                  placeholder='john@gmail.com'
                  autoComplete='on'
                  defaultValue={formData?.email || ""}
                  disabled={formData?.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <Label
                  htmlFor='message'
                  className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Message
                </Label>
                <Textarea
                  id='message'
                  name='message'
                  rows='4'
                  placeholder='Your Message'
                  required
                  onChange={handleChange}
                ></Textarea>
              </div>
              <Button
                disabled={loading}
                type='submit'
                className='w-full bg-[#fa7123] hover:!bg-[#fa7123]/90'
              >
                {loading ? <Spinner size='sm' color='white' /> : "Send Message"}
              </Button>
            </form>
          </div>
          <div className='rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-800 dark:text-white'>
              Contact Information
            </h2>
            <p className='mb-6 text-gray-600 dark:text-gray-300'>
              You can also reach us through the following contact methods.
            </p>
            <div className='mb-4'>
              <h3 className='text-lg font-medium text-gray-800 dark:text-white'>
                Email:
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                sales@automotivewebsolutions.com
              </p>
            </div>
            <div className='mb-4'>
              <h3 className='text-lg font-medium text-gray-800 dark:text-white'>
                Phone:
              </h3>
              <div className='flex items-center gap-2'>
                <Image
                  src={"/whatsapp.png"}
                  alt='whatsapp-icon'
                  width={24}
                  height={24}
                  className='object-cover object-center'
                />
                <p className='text-gray-600 dark:text-gray-300'>
                  (+92) 300 6904440
                </p>
              </div>
              <p className='text-gray-600 dark:text-gray-300'>
                (+61) 466778515
              </p>
            </div>
            <div className='mb-4 flex flex-col gap-y-2'>
              <h3 className='text-lg font-medium text-gray-800 dark:text-white'>
                Working Hours:
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Monday - Thursday: 9:00 AM - 5:00 PM
              </p>
              <p className='text-gray-600 dark:text-gray-300'>
                Friday: 9:00 AM - 6:00 PM
              </p>
              <p className='text-gray-600 dark:text-gray-300'>
                Saturday: Closed
              </p>
              <p className='text-gray-600 dark:text-gray-300'>Sunday: Closed</p>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-800 dark:text-white'>
            Find Us Here
          </h2>
          <div className='overflow-hidden rounded-lg shadow-md'>
            <iframe
              className='h-96 w-full border-0'
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4995.515162886476!2d73.12134500000003!3d30.67271440000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1751020101181!5m2!1sen!2s'
              allowFullScreen
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
