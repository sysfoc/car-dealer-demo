"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";
import { IoIosPrint } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "next/navigation";

export default function ViewInvoice() {
  const invoiceRef = useRef(null);
  const params = useParams();
  const [invoice, setInvoice] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/user/payments/get-single-transaction/${params.id}`
      );
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setInvoice(data.transaction);
        setUser(data.user);
      }
    };
    if (params.id) {
      fetchInvoiceDetails();
    }
  }, [params.id]);
  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) {
      console.error("Invoice reference is missing!");
      return;
    }
    setLoading(true);
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 4,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/webp");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "WEBP", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
    setLoading(false);
  };
  return (
    <div ref={invoiceRef} className='bg-gray-50 py-5 dark:bg-gray-800'>
      <div className='mx-auto w-full rounded-lg bg-white p-10 shadow dark:bg-gray-700'>
        <div className='my-5'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='font-semibold text-lg'>
                Invoice Number:{" "}
                {loading ? (
                  <Spinner size='sm' />
                ) : (
                  <span className='font-normal'>#{invoice?.customerId}</span>
                )}
              </h1>
              <h2 className='font-semibold'>
                Date:{" "}
                <span className='font-normal'>
                  {loading ? (
                    <Spinner size='sm' />
                  ) : (
                    <span className='font-normal'>
                      {new Date(invoice?.transactionDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </span>
                  )}
                </span>
              </h2>
            </div>
            <div>
              <Image
                src={"/logo.png"}
                alt='company-logo'
                width={150}
                height={120}
              />
            </div>
          </div>
          <div className='my-5 border-b border-gray-300'></div>
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='font-semibold'>Invoice To:</h3>
              {loading ? (
                <Spinner size='lg' />
              ) : (
                <div className='flex flex-col mt-1'>
                  <p className='text-sm text-gray-500'>{user?.name}</p>
                  <p className='text-sm text-gray-500'>{user?.email}</p>
                  <p className='text-sm text-gray-500'>Pakistan</p>
                </div>
              )}
            </div>
            <div className='text-end'>
              <h3 className='font-semibold'>Pay To:</h3>
              {loading ? (
                <Spinner size='lg' />
              ) : (
                <div className='flex flex-col mt-1'>
                  <p className='text-sm text-gray-500'>Sysfoc</p>
                  <p className='text-sm text-gray-500'>
                    Tariq Bin Ziad, Sahiwal, pakistan
                  </p>
                  <p className='text-sm text-gray-500'>sysfoc@email.com</p>
                </div>
              )}
            </div>
          </div>
          <div className='my-5'>
            <Table striped>
              <TableHead>
                <TableHeadCell>Item</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Qty</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Total</TableHeadCell>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center'>
                      <Spinner size='lg' />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>{invoice?.product} Package</TableCell>
                    <TableCell>
                      Purchased for {invoice?.productPlan} Subscription
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>${invoice?.productPrice}</TableCell>
                    <TableCell>${invoice?.productPrice}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={2} rowSpan={3} className='font-semibold'>
                    <h3 className='text-gray-700'>Additional Information:</h3>
                    <p className='text-sm font-normal'>
                      At check-in, you may need to present the credit card used
                      for payment of this ticket.
                    </p>
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    className='text-right font-semibold bg-gray-50'
                  >
                    Subtotal
                  </TableCell>
                  <TableCell className='font-semibold bg-gray-50'>
                    ${loading ? <Spinner size='sm' /> : invoice?.productPrice}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className='my-5'>
            <div>
              <h3 className='text-gray-700 font-semibold text-sm'>Note:</h3>
              <p className='text-xs text-gray-700'>
                Here we can write a additional notes for the client to get a
                better understanding of this invoice.
              </p>
            </div>
          </div>
          <div className='my-5 flex items-center justify-center'>
            {!loading && (
              <div className='flex items-center gap-3'>
                <Button
                  color='green'
                  onClick={() => window.print()}
                  className='mt-4 flex items-center'
                >
                  <IoIosPrint fontSize={22} className='mr-2' /> Print Invoice
                </Button>
                <Button
                  gradientDuoTone='greenToBlue'
                  onClick={handleDownloadPDF}
                  className='mt-4 flex items-center'
                >
                  <FaDownload fontSize={22} className='mr-2' /> Download Invoice
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
