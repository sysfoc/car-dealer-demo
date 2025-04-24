"use client";
import React, { useState } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  billingFailure,
  billingStart,
  billingSuccess,
} from "@/lib/features/user/userBilling";

const BillingForm = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error: errorMessage,
    userBilling,
  } = useSelector((state) => state.billing);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      dispatch(billingStart());
      const res = await fetch("/api/user/billing/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(billingSuccess(data.billing));
      } else {
        setError(true);
        dispatch(billingFailure(data.message));
      }
    } catch (error) {
      setError(true);
      dispatch(billingFailure(error.message));
    }
  };
  return (
    <Card>
      {
        error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
            <strong className='font-bold'>Error! </strong>
            <span className='block sm:inline'>{errorMessage}</span>
          </div>
        )
      }
      <h2 className='text-xl font-semibold'>Customer Billing Details</h2>
      <form className='space-y-4 mt-4' onSubmit={handleFormData}>
        <div>
          <Label htmlFor='fullName' value='Full Name' />
          <TextInput
            id='fullName'
            type='text'
            defaultValue={userBilling?.fullName}
            placeholder='John Doe'
            required
            disabled={userBilling}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor='email' value='Email Address' />
          <TextInput
            id='email'
            type='email'
            defaultValue={userBilling?.email}
            placeholder='john@example.com'
            required
            disabled={userBilling}
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
            disabled={userBilling}
            onChange={handleChange}
            defaultValue={userBilling?.address}
          />
        </div>
        <div>
          <Label htmlFor='phone' value='Phone Number' />
          <TextInput
            id='phone'
            type='tel'
            placeholder='+1 234 567 890'
            required
            disabled={userBilling}
            onChange={handleChange}
            defaultValue={userBilling?.phone}
          />
        </div>
        <Button disabled={loading || userBilling} type='submit' color='blue' className='w-full'>
          Save Billing Details
        </Button>
        {
        userBilling && (
          <div>
            <p className="text-green-500 text-sm">Billing Details Successfully Added! You can change billing details in the settings</p>
          </div>
        )
        }
      </form>
    </Card>
  );
};

export default BillingForm;
