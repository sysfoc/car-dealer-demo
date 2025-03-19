"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  Table,
  TextInput,
  Label,
  Select,
  Badge,
  ToggleSwitch,
} from "flowbite-react";

export default function PaymentGateways() {
  const [openModal, setOpenModal] = useState(false);
  const [gateways, setGateways] = useState([
    {
      id: 1,
      name: "Stripe",
      status: "Active",
      sandboxId: "sandbox_123",
      apiKey: "sk_test_123",
      mode: "Live",
      createdAt: "2025-03-19",
    },
    {
      id: 2,
      name: "PayPal",
      status: "Inactive",
      sandboxId: "sandbox_456",
      apiKey: "sk_test_456",
      mode: "Sandbox",
      createdAt: "2025-03-18",
    },
  ]);
  const [newGateway, setNewGateway] = useState({
    name: "",
    sandboxId: "",
    apiKey: "",
    mode: "Live",
    status: true,
  });

  const addGateway = () => {
    if (
      newGateway.name.trim() === "" ||
      newGateway.sandboxId.trim() === "" ||
      newGateway.apiKey.trim() === ""
    )
      return;
    setGateways([
      ...gateways,
      {
        id: Date.now(),
        ...newGateway,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setNewGateway({
      name: "",
      sandboxId: "",
      apiKey: "",
      mode: "Live",
      status: true,
    });
    setOpenModal(false);
  };

  const toggleStatus = (id) => {
    setGateways(
      gateways.map((g) =>
        g.id === id
          ? { ...g, status: g.status === "Active" ? "Inactive" : "Active" }
          : g
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Payment Gateways</h2>
        <Button onClick={() => setOpenModal(true)}>Add Gateway</Button>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Sandbox ID</Table.HeadCell>
          <Table.HeadCell>API Key</Table.HeadCell>
          <Table.HeadCell>Mode</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {gateways.map((gateway) => (
            <Table.Row
              key={gateway.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {gateway.name}
              </Table.Cell>
              <Table.Cell>{gateway.sandboxId}</Table.Cell>
              <Table.Cell>{gateway.apiKey}</Table.Cell>
              <Table.Cell>
                <Badge color={gateway.mode === "Live" ? "success" : "warning"}>
                  {gateway.mode}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge
                  color={gateway.status === "Active" ? "success" : "failure"}
                >
                  {gateway.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{gateway.createdAt}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <Button
                    color="warning"
                    size="xs"
                    onClick={() => toggleStatus(gateway.id)}
                    className="mr-2"
                  >
                    {gateway.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() =>
                      setGateways(gateways.filter((g) => g.id !== gateway.id))
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Payment Gateway</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput
              value={newGateway.name}
              onChange={(e) =>
                setNewGateway({ ...newGateway, name: e.target.value })
              }
              placeholder="Enter gateway name"
              label="Gateway Name"
            />
            <TextInput
              value={newGateway.sandboxId}
              onChange={(e) =>
                setNewGateway({ ...newGateway, sandboxId: e.target.value })
              }
              placeholder="Enter sandbox ID"
              label="Sandbox ID"
            />
            <TextInput
              value={newGateway.apiKey}
              onChange={(e) =>
                setNewGateway({ ...newGateway, apiKey: e.target.value })
              }
              placeholder="Enter API key"
              label="API Key"
            />
            <Select
              value={newGateway.mode}
              onChange={(e) =>
                setNewGateway({ ...newGateway, mode: e.target.value })
              }
              label="Mode"
            >
              <option value="Live">Live</option>
              <option value="Sandbox">Sandbox</option>
            </Select>
            <ToggleSwitch
              checked={newGateway.status}
              onChange={(e) =>
                setNewGateway({ ...newGateway, status: e.target.checked })
              }
              label="Active"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addGateway}>Add</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
