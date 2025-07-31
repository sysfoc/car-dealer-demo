"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Textarea,
  TextInput,
  Label,
  Spinner,
} from "flowbite-react";
import { HiOutlineMail, HiPlus } from "react-icons/hi";

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserIssues = async () => {
      setLoading(true);
      const res = await fetch("/api/user/support/get-user-issue");
      const data = await res.json();
      setLoading(false);
      setTickets(data.issues);
    };
    getUserIssues();
  }, []);
  const handleChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };
  const createTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/user/support/add-issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    });
    await res.json();
    setLoading(false);
    if (res.ok) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      alert("Something went wrong");
      setIsModalOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <Card>
        <h2 className='text-xl font-semibold'>Billing Support</h2>
        <p className='text-gray-600 mt-2'>
          Need help with your billing or subscription? Contact our support team.
        </p>
        <div className='mt-4 flex gap-3'>
          <a
            href='https://mail.google.com/mail/?view=cm&fs=1&to=sysfoc@gmail.com'
            target='_blank'
          >
            <Button className='bg-[#e56c16] hover:!bg-[#e56c16]'>
              <HiOutlineMail className='mr-2' /> Email Support
            </Button>
          </a>
        </div>
      </Card>
      <Card>
        <h2 className='text-xl font-semibold'>Support Tickets</h2>
        <Table className='mt-4'>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Subject</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {loading && (
              <Table.Row>
                <Table.Cell colSpan={3} className='text-center'>
                  <Spinner size='lg' />
                </Table.Cell>
              </Table.Row>
            )}
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <Table.Row key={ticket?._id}>
                  <Table.Cell>
                    {new Date(ticket.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Table.Cell>
                  <Table.Cell>{ticket.subject}</Table.Cell>
                  <Table.Cell
                    className={
                      ticket.status === "Open"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {ticket.status}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={3} className='text-center'>
                  No tickets found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Button
          className='mt-4 w-full bg-[#e56c16] hover:!bg-[#e56c16]'
          onClick={() => setIsModalOpen(true)}
        >
          <HiPlus className='mr-2' /> Create New Ticket
        </Button>
      </Card>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Create Support Ticket</Modal.Header>
        <Modal.Body>
          <form onSubmit={createTicket}>
            <div className='space-y-3'>
              <div>
                <Label htmlFor='subject'>Subject</Label>
                <TextInput
                  id='subject'
                  name='subject'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  required
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
            <div className='mt-4 flex items-center justify-end gap-4'>
              <Button
                type='submit'
                className='bg-[#e56c16] hover:!bg-[#e56c16]'
              >
                Submit
              </Button>
              <Button color='failure' onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
