"use client";
import { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Card,
  Select,
  Alert,
} from "flowbite-react";

export default function RefundRequest() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/user/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        alert("Refund request sent successfully");
        setError(false);
        setLoading(false);
      } else {
        setError(true);
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='max-w-lg w-full shadow-lg border border-gray-200'>
        <h2 className='text-2xl font-semibold text-center mb-4 text-gray-800'>
          Refund Request
        </h2>
        {
          error && (
            <Alert color="failure">
              <strong className='font-bold'>Error!</strong>
              <span className='block sm:inline'>{errorMessage}</span>
            </Alert>
          )
        }
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label
              htmlFor='orderId'
              value='Transaction Id'
              className='text-gray-700'
            />
            <TextInput
              id='orderId'
              name='orderId'
              placeholder='Enter your transaction id'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor='email'
              value='Email Address'
              className='text-gray-700'
            />
            <TextInput
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor='amount'
              value='Refund Amount'
              className='text-gray-700'
            />
            <TextInput
              id='amount'
              name='amount'
              type='number'
              placeholder='Enter refund amount'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor='reason'
              value='Reason for Refund'
              className='text-gray-700'
            />
            <Textarea
              id='reason'
              name='reason'
              placeholder='Describe why you are requesting a refund'
              required
              rows={4}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor='refundMethod'
              value='Refund Method'
              className='text-gray-700'
            />
            <Select
              id='refundMethod'
              name='refundMethod'
              onChange={handleChange}
            >
              <option value='paypal'>PayPal</option>
              <option value='stripe'>Stripe</option>
            </Select>
          </div>
          <Button
            disabled={loading}
            type='submit'
            color='blue'
            className='w-full'
          >
            Submit Request
          </Button>
        </form>
      </Card>
    </div>
  );
}
