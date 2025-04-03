"use client";
import { useState } from "react";
import { Button, Modal, Card, Label, TextInput, Select } from "flowbite-react";
import {
  FaPaypal,
  FaCreditCard,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";

export default function PaymentGateway() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Credit Card", details: "**** **** **** 1234" },
    { id: 2, type: "PayPal", details: "**** **** **** 5678" },
  ]);
  const [defaultMethod, setDefaultMethod] = useState(1);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [newPayment, setNewPayment] = useState({ type: "", details: "" });

  const handleRemove = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    setDeleteModalOpen(false);
  };

  const formatCardNumber = (number) => {
    const sanitized = number.replace(/\D/g, "");
    if (sanitized.length <= 16)
      return sanitized.replace(/(.{4})/g, "$1 ").trim();
    return sanitized.replace(/(.{4})(?=.{4})/g, "$1 ").slice(0, -5) + " ****";
  };

  const handleAddPayment = () => {
    const formattedDetails =
      newPayment.type === "Credit Card"
        ? formatCardNumber(newPayment.details)
        : newPayment.details;
    setPaymentMethods([
      ...paymentMethods,
      { id: Date.now(), type: newPayment.type, details: formattedDetails },
    ]);
    setAddModalOpen(false);
    setNewPayment({ type: "", details: "" });
  };

  const handleEditPayment = () => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === selectedMethod.id
          ? {
              ...method,
              details:
                selectedMethod.type === "Credit Card"
                  ? formatCardNumber(selectedMethod.details)
                  : selectedMethod.details,
            }
          : method
      )
    );
    setEditModalOpen(false);
  };

  return (
    <div className='max-w-3xl mx-auto py-6'>
      <h2 className='text-2xl font-semibold mb-4'>Saved Payment Methods</h2>
      <Card className='p-4 space-y-4'>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex justify-between items-center p-3 rounded-lg border ${
              defaultMethod === method.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <div className='flex items-center space-x-3'>
              {method.type === "Credit Card" ? (
                <FaCreditCard className='text-blue-500 text-xl' />
              ) : (
                <FaPaypal className='text-blue-500 text-xl' />
              )}
              <span>{method.details}</span>
            </div>
            <div className='flex space-x-2'>
              <Button size='sm' onClick={() => setDefaultMethod(method.id)}>
                {defaultMethod === method.id ? "Default" : "Set Default"}
              </Button>
              <Button
                size='sm'
                onClick={() => {
                  setSelectedMethod(method);
                  setEditModalOpen(true);
                }}
              >
                <FaEdit />
              </Button>
              <Button
                size='sm'
                color='failure'
                onClick={() => {
                  setSelectedMethod(method);
                  setDeleteModalOpen(true);
                }}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </Card>
      <Button className='mt-4 w-full' onClick={() => setAddModalOpen(true)}>
        <FaPlus className='mr-2' /> Add New Payment Method
      </Button>

      {/* Edit Modal */}
      <Modal show={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <Modal.Header>Edit Payment Method</Modal.Header>
        <Modal.Body>
          <Label>Payment Type</Label>
          <Select
            value={selectedMethod?.type}
            onChange={(e) =>
              setSelectedMethod({ ...selectedMethod, type: e.target.value })
            }
          >
            <option value='Credit Card'>Credit Card</option>
            <option value='PayPal'>PayPal</option>
          </Select>
          <Label className='mt-4'>Payment Details</Label>
          <TextInput
            type='text'
            value={selectedMethod?.details || ""}
            onChange={(e) =>
              setSelectedMethod({
                ...selectedMethod,
                details:
                  selectedMethod.type === "Credit Card"
                    ? formatCardNumber(e.target.value)
                    : e.target.value,
              })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditPayment}>Save Changes</Button>
          <Button color='gray' onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove {selectedMethod?.details}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color='failure'
            onClick={() => handleRemove(selectedMethod?.id)}
          >
            Delete
          </Button>
          <Button color='gray' onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <Modal.Header>Add New Payment Method</Modal.Header>
        <Modal.Body>
          <Label>Payment Type</Label>
          <Select
            value={newPayment.type}
            onChange={(e) =>
              setNewPayment({ ...newPayment, type: e.target.value })
            }
          >
            <option value='Credit Card'>Credit Card</option>
            <option value='PayPal'>PayPal</option>
          </Select>
          <Label className='mt-4'>Payment Details</Label>
          <TextInput
            type='text'
            placeholder='Enter details'
            value={newPayment.details}
            onChange={(e) =>
              setNewPayment({
                ...newPayment,
                details:
                  newPayment.type === "Credit Card"
                    ? formatCardNumber(e.target.value)
                    : e.target.value,
              })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddPayment}>Add</Button>
          <Button color='gray' onClick={() => setAddModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
