"use client";

import { useState } from "react";
import { Card, Label, TextInput, Button, Table, Modal } from "flowbite-react";
import { HiOutlineCreditCard, HiPlus, HiTrash } from "react-icons/hi";

export default function BillingDetail() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "1234" },
    { id: 2, type: "MasterCard", last4: "5678" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({ type: "", last4: "" });

  const addPaymentMethod = () => {
    if (newCard.type && newCard.last4) {
      setPaymentMethods([...paymentMethods, { id: Date.now(), ...newCard }]);
      setNewCard({ type: "", last4: "" });
      setIsModalOpen(false);
    }
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((card) => card.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold">Billing Summary</h2>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">Total Due:</p>
          <p className="text-xl font-bold text-red-500">$250.00</p>
        </div>
        <Button color="blue" className="mt-4 w-full">
          Pay Now
        </Button>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        <div className="mt-4 space-y-2">
          {paymentMethods.map((card) => (
            <div
              key={card.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <HiOutlineCreditCard className="text-2xl text-gray-600" />
                <span className="text-gray-700">
                  {card.type} **** {card.last4}
                </span>
              </div>
              <Button
                color="red"
                size="xs"
                onClick={() => removePaymentMethod(card.id)}
              >
                <HiTrash className="mr-2" /> Remove
              </Button>
            </div>
          ))}
          <Button
            color="gray"
            className="mt-3 w-full"
            onClick={() => setIsModalOpen(true)}
          >
            <HiPlus className="mr-2" /> Add Payment Method
          </Button>
        </div>
      </Card>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add Payment Method</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-type" value="Card Type" />
              <TextInput
                id="card-type"
                type="text"
                placeholder="Visa, MasterCard, etc."
                value={newCard.type}
                onChange={(e) =>
                  setNewCard({ ...newCard, type: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="card-last4" value="Last 4 Digits" />
              <TextInput
                id="card-last4"
                type="text"
                placeholder="1234"
                maxLength={4}
                value={newCard.last4}
                onChange={(e) =>
                  setNewCard({ ...newCard, last4: e.target.value })
                }
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={addPaymentMethod}>
            Save
          </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <h2 className="text-xl font-semibold">Customer Billing Details</h2>
        <form className="space-y-4 mt-4">
          <div>
            <Label htmlFor="full-name" value="Full Name" />
            <TextInput
              id="full-name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email Address" />
            <TextInput
              id="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="address" value="Billing Address" />
            <TextInput
              id="address"
              type="text"
              placeholder="123 Main St, City, Country"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" value="Phone Number" />
            <TextInput
              id="phone"
              type="tel"
              placeholder="+1 234 567 890"
              required
            />
          </div>
          <Button type="submit" color="blue" className="w-full">
            Save Billing Details
          </Button>
        </form>
      </Card>
    </div>
  );
}
