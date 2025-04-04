"use client";
import { useState } from "react";
import { Card, Button } from "flowbite-react";
import { ToggleSwitch } from "flowbite-react";

export default function PaymentNotifications() {
  const [preferences, setPreferences] = useState({
    billingUpdates: true,
    newAddons: false,
    paymentReminders: true,
    failedPayments: false,
    subscriptionExpiries: true,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sendAnnouncement = () => {
    alert(
      `Announcement sent with settings:\n` +
        `Billing Updates: ${preferences.billingUpdates}\n` +
        `New Add-ons: ${preferences.newAddons}\n` +
        `Payment Reminders: ${preferences.paymentReminders}\n` +
        `Failed Payments: ${preferences.failedPayments}\n` +
        `Subscription Expiries: ${preferences.subscriptionExpiries}`
    );
  };

  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <Card>
        <h2 className='text-xl font-semibold mb-4'>
          Payment Notifications Preferences
        </h2>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span>Billing Updates</span>
            <ToggleSwitch
              checked={preferences.billingUpdates}
              onChange={() => handleToggle("billingUpdates")}
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>New Add-ons</span>
            <ToggleSwitch
              checked={preferences.newAddons}
              onChange={() => handleToggle("newAddons")}
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Payment Reminders</span>
            <ToggleSwitch
              checked={preferences.paymentReminders}
              onChange={() => handleToggle("paymentReminders")}
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Failed Payments</span>
            <ToggleSwitch
              checked={preferences.failedPayments}
              onChange={() => handleToggle("failedPayments")}
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Subscription Expiries</span>
            <ToggleSwitch
              checked={preferences.subscriptionExpiries}
              onChange={() => handleToggle("subscriptionExpiries")}
            />
          </div>
        </div>
        <Button onClick={sendAnnouncement} className='mt-6 w-full'>
          Send Announcement
        </Button>
      </Card>
    </div>
  );
}
