"use client";
import { Card, Modal, Button, Radio } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanDetails() {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/subscription/detail");
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
          setSubscription(data.subscription);
          setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserSubscription();
  }, []);
  const handleUpgrade = () => {
    setLoading(true);
    router.push("/pricing");
  };

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      setLoading(true);
      const res = await fetch(
        `/api/user/subscription/cancel/${subscription?._id}`,
        { method: "DELETE" }
      );
      setLoading(false);
      if (res.ok) {
        setLoading(false);
      }
    }
  };

  return (
    <div className='max-w-3xl mx-auto my-5'>
      <Card className='p-6 shadow-lg'>
        <h2 className='text-2xl font-semibold text-gray-900'>
          Current Subscription Plan
        </h2>
        <p className='text-gray-600 mt-2'>
          Here are the details of your active plan.
        </p>

        <div className='mt-4 space-y-2'>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-800'>Plan Name:</span>
            <span className='text-gray-700'>
              {subscription?.subscriptionType}
            </span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-800'>Price:</span>
            <span className='text-gray-700'>{
              subscription?.subscriptionType === "Basic" ? "$99.99" : subscription?.subscriptionType === "Standard" ? "$249.99" : "$499.99"
              }</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-800'>Storage Limit:</span>
            <span className='text-gray-700'>{
              subscription?.subscriptionType === "Basic" ? "10 GB" : subscription?.subscriptionType === "Standard" ? "25 GB" : "50 GB"
              }</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-800'>User Limit:</span>
            <span className='text-gray-700'> 
              {
                subscription?.subscriptionType === "Basic" ? "Upto 2" : subscription?.subscriptionType === "Standard" ? "Upto 5" : "Upto 10"
                }
              </span>
          </div>
        </div>

        <div className='mt-6 flex gap-4'>
          <button
            disabled={loading}
            onClick={handleUpgrade}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700'
          >
            Upgrade Plan
          </button>
          <button
            disabled={loading}
            onClick={handleCancel}
            className='px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600'
          >
            Cancel Subscription
          </button>
        </div>
      </Card>
    </div>
  );
}
