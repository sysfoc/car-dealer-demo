"use client";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  ToggleSwitch,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "flowbite-react";
import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";

export default function Notifications() {
  const [openModal, setOpenModal] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [alerts, setAlerts] = useState([
    { id: 1, type: "error", message: "Payment failed for Invoice #1234" },
    { id: 2, type: "warning", message: "Your subscription renews in 3 days" },
    { id: 3, type: "success", message: "Plan upgraded successfully" },
  ]);

  const [settings, setSettings] = useState({
    failedPayments: true,
    subscriptionRenewals: true,
    planUpgrades: true,
  });

  const dismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sendAnnouncement = () => {
    if (announcement.trim()) {
      alert(`Announcement Sent: ${announcement}`);
      setAnnouncement("");
      setOpenModal(false);
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
              key={alert.id}
              color={
                alert.type === "error"
                  ? "failure"
                  : alert.type === "warning"
                  ? "warning"
                  : "success"
              }
              icon={
                alert.type === "error"
                  ? HiOutlineExclamationCircle
                  : HiOutlineCheckCircle
              }
              onDismiss={() => dismissAlert(alert.id)}
            >
              {alert.message}
            </Alert>
          ))}
        </div>
      </Card>
      <Card className='p-5 shadow-lg border border-gray-200'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Notification Settings
        </h2>
        <div className='mt-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <span>Failed Payment Alerts</span>
            <ToggleSwitch
              checked={settings.failedPayments}
              onChange={() => toggleSetting("failedPayments")}
              sizing='md'
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Subscription Renewal Reminders</span>
            <ToggleSwitch
              checked={settings.subscriptionRenewals}
              onChange={() => toggleSetting("subscriptionRenewals")}
              sizing='md'
            />
          </div>
          <div className='flex items-center justify-between'>
            <span>Plan Upgrade Notifications</span>
            <ToggleSwitch
              checked={settings.planUpgrades}
              onChange={() => toggleSetting("planUpgrades")}
              sizing='md'
            />
          </div>
        </div>
      </Card>
      <Card className='p-5 shadow-lg border border-gray-200'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Send Announcements
        </h2>
        <p className='text-gray-600 mt-2'>
          Notify users about billing updates or new add-ons.
        </p>
        <Button className='mt-4' onClick={() => setOpenModal(true)}>
          Create Announcement
        </Button>
      </Card>

      {/* Announcement Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Create Announcement</ModalHeader>
        <ModalBody>
          <Textarea
            placeholder='Enter announcement message...'
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            rows={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={sendAnnouncement}>Send</Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
