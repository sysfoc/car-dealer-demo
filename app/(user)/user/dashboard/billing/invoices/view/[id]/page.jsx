"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
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

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      const res = await fetch(
        `/api/user/payments/get-single-transaction/${params.id}`
      );
      const data = await res.json();
      if (res.ok) {
        setInvoice(data.transaction);
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

    const actionButtons = invoiceRef.current.querySelectorAll("button");
    actionButtons.forEach((btn) => btn.classList.add("hidden"));

    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 4,
      useCORS: true,
      preserveDrawingBuffer: true,
    });

    actionButtons.forEach((btn) => btn.classList.remove("hidden"));

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let finalWidth = imgWidth;
    let finalHeight = imgHeight;
    if (imgHeight > pageHeight) {
      finalHeight = pageHeight;
      finalWidth = (canvas.width * finalHeight) / canvas.height;
    }

    pdf.addImage(imgData, "PNG", 0, 0, finalWidth, finalHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div ref={invoiceRef} className='bg-gray-50 py-5 dark:bg-gray-800'>
      <div className='mx-auto w-full rounded-lg bg-white p-10 shadow dark:bg-gray-700'>
        <div className='my-5'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='font-semibold'>
                Invoice No:{" "}
                <span className='font-normal'>#{invoice?.paymentId}</span>
              </h1>
              <h2 className='font-semibold'>
                Customer Id:{" "}
                <span className='font-normal'>#{invoice?.customerId}</span>
              </h2>
              <h3 className='font-semibold'>
                Date:{" "}
                <span className='font-normal'>
                  {new Date(invoice?.transactionDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}{" "}
                  at{" "}
                  {new Date(invoice?.transactionDate).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </h3>
            </div>
            <div className='max-w-[150px]'>
              <Image
                src='/logo.png'
                alt='company-logo'
                width={150}
                height={120}
                className='w-full h-auto object-contain'
              />
            </div>
          </div>
          <div className='my-5 border-b border-gray-300'></div>
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='font-semibold'>Invoice To:</h3>
              <div className='flex flex-col mt-1'>
                <p className='text-sm text-gray-500 uppercase'>
                  {invoice?.userId?.name}
                </p>
                <p className='text-sm text-gray-500 uppercase'>
                  {invoice?.userId?.email}
                </p>
                <p className='text-sm text-gray-500 uppercase'>Pakistan</p>
              </div>
            </div>
            <div className='text-end'>
              <h3 className='font-semibold'>Pay To:</h3>
              <div className='flex flex-col mt-1'>
                <p className='text-sm text-gray-500 uppercase'>Sysfoc</p>
                <p className='text-sm text-gray-500 uppercase'>
                  Automotive Web Solutions
                </p>
                <p className='text-sm text-gray-500 uppercase'>
                  sales@automotivewebsolutions.com
                </p>
              </div>
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
                <TableRow>
                  <TableCell>{invoice?.product} Package</TableCell>
                  <TableCell>
                    Purchased for {invoice?.productPlan} Subscription
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>${invoice?.productPrice}</TableCell>
                  <TableCell>${invoice?.productPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} rowSpan={3} className='font-semibold'>
                    <h3 className='text-gray-700'>Additional Information:</h3>
                    <p className='text-sm font-normal'>
                      At check-in, you may need to present the credit card used
                      for payment of this invoice.
                    </p>
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    className='text-right font-semibold bg-gray-50'
                  >
                    Subtotal
                  </TableCell>
                  <TableCell className='font-semibold bg-gray-50'>
                    ${invoice?.productPrice}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className='my-5'>
            <div>
              <h3 className='text-gray-700 font-semibold text-sm'>Note:</h3>
              <p className='text-xs text-gray-700'>
                Thanks for doing business with us! If you have any questions
                about this invoice or need any changes, feel free to reach out —
                we’re happy to help. Your support means a lot to us.
              </p>
            </div>
          </div>
          <div className='my-5 flex items-center justify-center'>
            <div className='flex items-center gap-3'>
              <Button
                onClick={() => window.print()}
                className='mt-4 flex items-center bg-transparent border border-[#fb8b4c] text-[#fb8b4c] hover:text-white hover:!bg-[#fb8b4c]/90'
              >
                <IoIosPrint fontSize={18} className='mr-2' /> Print Invoice
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className='mt-4 flex items-center bg-[#fb8b4c] hover:!bg-[#fb8b4c]/90'
              >
                <FaDownload fontSize={18} className='mr-2' /> Download Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
