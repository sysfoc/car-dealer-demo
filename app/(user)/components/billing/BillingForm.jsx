"use client";
import React, { useEffect, useState } from "react";
import { Card, Label, TextInput, Button, Alert } from "flowbite-react";

const BillingForm = () => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [billing, setBilling] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUserBilling = async () => {
      const res = await fetch("/api/user/billing/details");
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setBilling(data.billing);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(data.message);
      }
    };
    getUserBilling();
  }, [error, success]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/user/billing/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setSuccess(true);
        setSuccessMessage(data.message);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <Card>
      {error && (
        <Alert color='failure'>
          <strong className='font-bold'>Error! </strong>
          <span className='block sm:inline'>{errorMessage}</span>
        </Alert>
      )}
      {success && (
        <Alert color='success'>
          <strong className='font-bold'>Success! </strong>
          <span className='block sm:inline'>{successMessage}</span>
        </Alert>
      )}
      <h2 className='text-xl font-semibold'>Customer Billing Details</h2>
      <form className='space-y-4 mt-4' onSubmit={handleFormData}>
        <div>
          <Label htmlFor='fullName' value='Full Name' />
          <TextInput
            id='fullName'
            type='text'
            defaultValue={billing?.fullName}
            placeholder='John Doe'
            required
            disabled={billing?.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor='email' value='Email Address' />
          <TextInput
            id='email'
            type='email'
            defaultValue={billing?.email}
            placeholder='john@example.com'
            required
            disabled={billing?.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor='address' value='Billing Address' />
          <TextInput
            id='address'
            type='text'
            placeholder='123 Main St, City, Country'
            required
            disabled={billing?.address}
            onChange={handleChange}
            defaultValue={billing?.address}
          />
        </div>
        <div>
          <Label htmlFor='phone' value='Phone Number' />
          <TextInput
            id='phone'
            type='tel'
            placeholder='+1 234 567 890'
            required
            disabled={billing?.phone}
            onChange={handleChange}
            defaultValue={billing?.phone}
          />
        </div>
        <Button
          disabled={loading || billing?._id}
          type='submit'
          color='blue'
          className='w-full'
        >
          Save Billing Details
        </Button>
        {billing?._id && (
          <div>
            <p className='text-green-500 text-sm'>
              Billing Details Successfully Added! You can change billing details
              in the settings
            </p>
          </div>
        )}
      </form>
    </Card>
  );
};

export default BillingForm;
