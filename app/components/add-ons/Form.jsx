"use client";
import {
  Alert,
  Button,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Form = () => {
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
    <section className='my-14 py-10 bg-white'>
      <div className='mx-4 md:mx-16'>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold'>
            Not Mentioned! What You Are Looking For? Contact Us Now
          </h3>
          <p className='mt-1'>
            Add-ons are additional services that you can purchase to enhance
            your website
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-full md:w-[80%]'>
            <form
              className='flex flex-col gap-5 mt-5'
              onSubmit={handleFormSubmission}
            >
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
              <div>
                <Label htmlFor='name'>Name</Label>
                <TextInput
                  id='name'
                  name='name'
                  type='text'
                  placeholder='John Doe'
                  className='w-full'
                  autoComplete='on'
                  defaultValue={formData?.name || ""}
                  disabled={formData?.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <TextInput
                  id='email'
                  name='email'
                  type='email'
                  placeholder='john@gmail.com'
                  className='w-full'
                  autoComplete='on'
                  defaultValue={formData?.email || ""}
                  disabled={formData?.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor='message'>Addons Suggestion</Label>
                <Textarea
                  id='message'
                  name='message'
                  placeholder='Write your suggestion here'
                  className='w-full focus:border-[#e56c16] focus:ring-[#e56c16]'
                  rows={5}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='flex items-center justify-center'>
                <Button
                  disabled={loading}
                  type='submit'
                  className='w-full bg-[#e56c16] hover:!bg-[#e56c16]/80'
                  size='md'
                >
                  {loading ? <Spinner size='sm' color='white' /> : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
