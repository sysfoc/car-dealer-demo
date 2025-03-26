"use client";
import { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Card,
  Select,
} from "flowbite-react";

export default function RefundRequest() {
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    refundAmount: "",
    reason: "",
    refundMethod: "bank_transfer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Refund Request Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-lg w-full shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Refund Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="orderNumber"
              value="Order Number"
              className="text-gray-700"
            />
            <TextInput
              id="orderNumber"
              name="orderNumber"
              placeholder="Enter your order number"
              required
              value={formData.orderNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              value="Email Address"
              className="text-gray-700"
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor="refundAmount"
              value="Refund Amount"
              className="text-gray-700"
            />
            <TextInput
              id="refundAmount"
              name="refundAmount"
              type="number"
              placeholder="Enter refund amount"
              required
              value={formData.refundAmount}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor="reason"
              value="Reason for Refund"
              className="text-gray-700"
            />
            <Textarea
              id="reason"
              name="reason"
              placeholder="Describe why you are requesting a refund"
              required
              rows={4}
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              htmlFor="refundMethod"
              value="Refund Method"
              className="text-gray-700"
            />
            <Select
              id="refundMethod"
              name="refundMethod"
              value={formData.refundMethod}
              onChange={handleChange}
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="store_credit">Store Credit</option>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Submit Request
          </Button>
        </form>
      </Card>
    </div>
  );
}
