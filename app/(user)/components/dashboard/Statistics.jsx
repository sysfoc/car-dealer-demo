"use client";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Statistics = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
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
  return (
    <div className='w-full p-4 bg-white shadow'>
      {loading ? (
        <div className='flex items-center justify-center'>
          <Spinner size="lg"/>
        </div>
      ) : (
        <div>
          <div>
            <h2 className='font-semibold text-gray-600'>
              Subsciption Overview
            </h2>
          </div>
          <div className='mt-3 flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Plan:</p>
              <p className='text-sm text-gray-500'>Billing Period:</p>
              <p className='text-sm text-gray-500'>No of Sessions:</p>
              <p className='text-sm text-gray-500'>Effective Date:</p>
              <p className='text-sm text-gray-500'>Next Billing Date:</p>
            </div>
            <div className='flex flex-col text-end'>
              <strong className='text-sm'>
                {subscription?.subscriptionType ?? "None"}
              </strong>
              <strong className='text-sm'>
                {subscription?.subscriptionPlan ?? "None"}
              </strong>
              <strong className='text-sm'>1</strong>
              <strong className='text-sm'>
                {new Date(subscription?.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) || "None"}
              </strong>
              <strong className='text-sm'>{new Date(subscription?.endDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong>
            </div>
          </div>
          <div className='my-3'>
            <h2 className='font-semibold text-gray-600'>Usage Limit</h2>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>No of Listings Allowed:</p>
              <p className='text-sm text-gray-500'>Posted Listings:</p>
              <p className='text-sm text-gray-500'>Add-ons:</p>
              <p className='text-sm text-gray-500'>Storage Used:</p>
            </div>
            <div className='flex flex-col text-end'>
              <strong className='text-sm'>30</strong>
              <strong className='text-sm'>23</strong>
              <strong className='text-sm'>In Working</strong>
              <strong className='text-sm'>10gb/month</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
