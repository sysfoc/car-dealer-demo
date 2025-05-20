"use client";
import { useEffect, useState } from "react";
import { Alert, Card } from "flowbite-react";
import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

export default function Notifications() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const getAlertsNotifications = async () => {
      try {
        const res = await fetch("/api/user/notifications/get-notifications");
        const data = await res.json();
        if (res.ok) {
          setAlerts(data.notifications);
        } else {
          setAlerts([
            {
              _id: "error",
              title: "Error",
              message: data.message,
              type: "error",
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAlertsNotifications();
  }, []);

  const dismissAlert = async (id) => {
    const res = await fetch(`/api/user/notifications/delete/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAlerts(alerts.filter((alert) => alert._id !== id));
    }
  };

  return (
    <div className='space-y-6'>
      <Card className='p-5 shadow-lg border border-gray-200'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Notifications & Alerts
        </h2>
        <div className='mt-4 space-y-3'>
          {alerts.map((alert) => (
            <Alert
              key={alert._id}
              color={
                alert.type === "error"
                  ? "failure"
                  : alert.type === "warning"
                  ? "warning"
                  : alert.type === "info"
                  ? "info"
                  : "success"
              }
              icon={
                alert.type === "error"
                  ? HiOutlineExclamationCircle
                  : alert.type === "warning"
                  ? HiOutlineExclamationCircle
                  : alert.type === "info"
                  ? HiOutlineInformationCircle
                  : HiOutlineCheckCircle
              }
              onDismiss={() => dismissAlert(alert._id)}
            >
              {alert.title}! {alert.message} -{" "}
              <span className='font-bold'>
                {new Date(alert?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at{" "}
                {new Date(alert?.createdAt)
                  .toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toLowerCase()}
              </span>
            </Alert>
          ))}
        </div>
      </Card>
    </div>
  );
}
