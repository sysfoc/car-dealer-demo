"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Textarea,
  TextInput,
  Label,
} from "flowbite-react";
import { HiOutlineMail, HiOutlineChat, HiPlus } from "react-icons/hi";

export default function Support() {
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Billing Issue", status: "Open", date: "March 25, 2025" },
    {
      id: 2,
      subject: "Subscription Renewal",
      status: "Closed",
      date: "March 20, 2025",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "" });

  const createTicket = () => {
    if (newTicket.subject && newTicket.description) {
      setTickets([
        ...tickets,
        {
          id: Date.now(),
          ...newTicket,
          status: "Open",
          date: new Date().toLocaleDateString(),
        },
      ]);
      setNewTicket({ subject: "", description: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold">Billing Support</h2>
        <p className="text-gray-600 mt-2">
          Need help with your billing or subscription? Contact our support team.
        </p>
        <div className="mt-4 flex gap-3">
          <Button color="blue" onClick={() => setIsEmailOpen(true)}>
            <HiOutlineMail className="mr-2" /> Email Support
          </Button>
          <Button color="gray" onClick={() => setIsChatOpen(true)}>
            <HiOutlineChat className="mr-2" /> Live Chat
          </Button>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Support Tickets</h2>
        <Table className="mt-4">
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Subject</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {tickets.map((ticket) => (
              <Table.Row key={ticket.id}>
                <Table.Cell>{ticket.date}</Table.Cell>
                <Table.Cell>{ticket.subject}</Table.Cell>
                <Table.Cell
                  className={
                    ticket.status === "Open" ? "text-red-500" : "text-green-500"
                  }
                >
                  {ticket.status}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button
          color="gray"
          className="mt-4 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <HiPlus className="mr-2" /> Create New Ticket
        </Button>
      </Card>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Create Support Ticket</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Label htmlFor="support-subject">Subject</Label>
            <TextInput
              id="support-subject"
              value={newTicket.subject}
              required
              onChange={(e) =>
                setNewTicket({ ...newTicket, subject: e.target.value })
              }
            />
            <Label htmlFor="support-description">Description</Label>
            <Textarea
              id="support-description"
              value={newTicket.description}
              required
              onChange={(e) =>
                setNewTicket({ ...newTicket, description: e.target.value })
              }
              rows={4}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createTicket}>Submit</Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <Modal.Header>Live Chat</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-gray-600">
              You are now connected to a support agent.
            </p>
            <Textarea rows={4} placeholder="Type your message..." />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Send</Button>
          <Button color="gray" onClick={() => setIsChatOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isEmailOpen} onClose={() => setIsEmailOpen(false)}>
        <Modal.Header>Email Support</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Label htmlFor="email-subject">Subject</Label>
            <TextInput
              id="email-subject"
              placeholder="Enter subject"
              required
            />
            <Label htmlFor="email-message">Message</Label>
            <Textarea
              id="email-message"
              rows={4}
              placeholder="Type your message..."
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Send Email</Button>
          <Button color="gray" onClick={() => setIsEmailOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
