"use client";
import { useState } from "react";
import { Button, Label, Card, Alert } from "flowbite-react";

export default function CancelSubscription() {
  const [confirmed, setConfirmed] = useState(false);
  const [canceled, setCanceled] = useState(false);

  const handleCancel = () => {
    setCanceled(true);
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='max-w-lg w-full shadow-lg border border-gray-200'>
        <h2 className='text-2xl font-semibold text-center mb-4 text-gray-800'>
          Cancel Subscription
        </h2>
        {!canceled ? (
          <>
            <p className='text-gray-600 text-center mb-4'>
              Are you sure you want to cancel your subscription? Your access
              will end on <strong>[subscription_end_date]</strong>.
            </p>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => setConfirmed(true)}>
                Yes, Cancel
              </Button>
              <Button color='gray' onClick={() => setConfirmed(false)}>
                Keep Subscription
              </Button>
            </div>
            {confirmed && (
              <div className='mt-4'>
                <Alert color='warning'>
                  <span className='font-medium'>Warning:</span> This action
                  cannot be undone.
                </Alert>
                <Button
                  color='failure'
                  onClick={handleCancel}
                  className='mt-4 w-full'
                >
                  Confirm Cancellation
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className='text-center text-green-600 font-medium'>
            Your subscription has been successfully canceled.
          </div>
        )}
      </Card>
    </div>
  );
}
