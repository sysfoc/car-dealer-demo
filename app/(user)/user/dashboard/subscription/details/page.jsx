"use client";
import { Card, Modal, Button, Radio } from "flowbite-react";
import { useState } from "react";

export default function PlanDetails() {
  const [plan, setPlan] = useState("Premium");
  const [price, setPrice] = useState("$49.99 / month");
  const [storage, setStorage] = useState("500GB");
  const [users, setUsers] = useState("10 Users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Premium");

  const handleUpgrade = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      alert("Subscription canceled.");
    }
  };

  const handleProceedToPayment = () => {
    alert(`Redirecting to payment for the ${selectedPlan} plan...`);
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
            <span className='text-gray-700'>{plan}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-800'>Price:</span>
            <span className='text-gray-700'>{price}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-800'>Storage Limit:</span>
            <span className='text-gray-700'>{storage}</span>
          </div>
          <div className='flex justify-between border-b pb-2'>
            <span className='font-medium text-gray-800'>User Limit:</span>
            <span className='text-gray-700'>{users}</span>
          </div>
        </div>

        <div className='mt-6 flex gap-4'>
          <button
            onClick={handleUpgrade}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700'
          >
            Upgrade Plan
          </button>
          <button
            onClick={handleCancel}
            className='px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600'
          >
            Cancel Subscription
          </button>
        </div>
      </Card>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Upgrade Your Plan</Modal.Header>
        <Modal.Body>
          <p className='text-gray-700'>
            Choose a new plan and proceed to payment.
          </p>
          <div className='mt-4 space-y-2'>
            <label className='flex items-center space-x-2'>
              <Radio
                name='plan'
                value='Premium'
                checked={selectedPlan === "Premium"}
                onChange={() => setSelectedPlan("Premium")}
              />
              <span className='text-gray-800'>Premium - $49.99 / month</span>
            </label>
            <label className='flex items-center space-x-2'>
              <Radio
                name='plan'
                value='Enterprise'
                checked={selectedPlan === "Enterprise"}
                onChange={() => setSelectedPlan("Enterprise")}
              />
              <span className='text-gray-800'>Enterprise - $99.99 / month</span>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='bg-green-600 hover:bg-green-700'
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </Button>
          <Button color='gray' onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
