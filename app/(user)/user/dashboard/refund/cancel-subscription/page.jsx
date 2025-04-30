"use client";
import { useEffect, useState } from "react";
import { Button, Card, Alert } from "flowbite-react";

export default function CancelSubscription() {
  const [confirmed, setConfirmed] = useState(false);
  const [canceled, setCanceled] = useState(false);
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

  const oneMonthLater = subscription?.startDate
    ? new Date(
        new Date(subscription.startDate).setMonth(
          new Date(subscription.startDate).getMonth() + 1
        )
      )
    : null;
  const formattedDate = oneMonthLater?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleCancel = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/user/subscription/cancel/${subscription._id}`,
      { method: "DELETE" }
    );
    setLoading(false);
    if (res.ok) {
      setCanceled(true);
      setLoading(false);
    }
  };
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='max-w-lg w-full shadow-lg border border-gray-200'>
        {!subscription && (
          <Alert color='failure'>
            <span>
              <span className='font-medium'>You don't have a subscription</span>
            </span>
          </Alert>
        )}
        {subscription && (
          <>
            <h2 className='text-2xl font-semibold text-center mb-4 text-gray-800'>
              Cancel Subscription
            </h2>
            {!canceled ? (
              <>
                <p className='text-gray-600 text-center mb-4'>
                  Are you sure you want to cancel your{" "}
                  {subscription?.subscriptionType} subscription? Your access
                  will end on <strong>{formattedDate}</strong>.
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
          </>
        )}
      </Card>
    </div>
  );
}
