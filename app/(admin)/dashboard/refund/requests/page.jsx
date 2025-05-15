"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaEye } from "react-icons/fa6";

export default function page() {
  const [RefundRequests, setRefundRequests] = useState([]);
  const [showRefundDetailModal, setShowRefundDetailModal] = useState(false);
  const [selectedRefundRequest, setSelectedRefundRequest] = useState({});
  const [showEditRefundModal, setShowEditRefundModal] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRefundRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/refund/get-all");
        const data = await response.json();
        setLoading(false);
        setRefundRequests(data.refunds || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRefundRequests();
  }, [status, showEditRefundModal]);

  const showRefundDetails = (refundRequest) => {
    setShowRefundDetailModal(true);
    setSelectedRefundRequest(refundRequest);
  };

  const editRefundDetails = (refundRequest) => {
    setShowEditRefundModal(true);
    setSelectedRefundRequest(refundRequest);
  };

  const handleFormSubmission = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/refund/edit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        alert("Status updated successfully");
        setShowRefundDetailModal(false);
        setShowEditRefundModal(false);
      } else {
        console.log("Error sending refund request:", data.message);
      }
    } catch (error) {
      console.log("Error sending refund request:", error.message);
    }
  };
  return (
    <div className='my-5 p-5 bg-white shadow'>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold mb-4'>Refund Requests</h2>
        </div>

        <Table>
          <TableHead>
            <TableHeadCell>Transaction Id</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  <Spinner size='lg' />
                </TableCell>
              </TableRow>
            )}
            {RefundRequests.map((refundRequest) => (
              <TableRow key={refundRequest?._id}>
                <TableCell>{refundRequest?.orderId}</TableCell>
                <TableCell>{refundRequest?.email}</TableCell>
                <TableCell>${refundRequest?.amount}</TableCell>
                <TableCell className='capitalize'>
                  {refundRequest?.status}
                </TableCell>
                <TableCell>
                  {new Date(refundRequest?.createdAt).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </TableCell>
                <TableCell>
                  <div
                    key={refundRequest?._id}
                    className='flex items-center gap-2'
                  >
                    <button
                      className='p-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                      title='View'
                      onClick={() => showRefundDetails(refundRequest)}
                    >
                      <FaEye className='w-3 h-3' />
                    </button>
                    <Button
                      color='info'
                      size='xs'
                      onClick={() => editRefundDetails(refundRequest)}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        show={showRefundDetailModal}
        onClose={() => setShowRefundDetailModal(false)}
      >
        <Modal.Header>
          <span className='text-lg font-medium text-gray-900 dark:text-white'>
            Refund request details against Transaction Id:{" "}
            {selectedRefundRequest?.orderId}
          </span>
        </Modal.Header>
        <Modal.Body>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Transaction Id:</span>{" "}
            {selectedRefundRequest?.orderId}
          </p>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Email:</span>{" "}
            {selectedRefundRequest?.email}
          </p>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Amount:</span> $
            {selectedRefundRequest?.amount}
          </p>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Refund Reason:</span>{" "}
            {selectedRefundRequest?.reason}
          </p>
          <p className='mb-2 text-gray-500 dark:text-gray-400 capitalize'>
            <span className='font-semibold'>Prefered Refund Method:</span>{" "}
            {selectedRefundRequest?.refundMethod}
          </p>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Dated:</span>{" "}
            {new Date(selectedRefundRequest?.createdAt).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Status:</span>{" "}
            {selectedRefundRequest?.status}
          </p>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditRefundModal}
        onClose={() => setShowEditRefundModal(false)}
      >
        <Modal.Header>
          <span className='text-lg font-medium text-gray-900 dark:text-white'>
            Edit Refund Request
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmission(selectedRefundRequest?._id);
            }}
          >
            <Label htmlFor='status'>Status</Label>
            <Select
              id='status'
              name='status'
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={selectedRefundRequest?.status}
            >
              <option
                disabled={selectedRefundRequest?.status === "pending"}
                value='pending'
              >
                Pending
              </option>
              <option
                disabled={selectedRefundRequest?.status === "approved"}
                value='approved'
              >
                Approved
              </option>
              <option
                disabled={selectedRefundRequest?.status === "rejected"}
                value='rejected'
              >
                Rejected
              </option>
            </Select>
            <Button className='mt-4' size='md' type='submit'>
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
