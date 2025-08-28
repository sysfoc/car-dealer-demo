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
import { IoIosPrint } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "next/navigation";

export default function ViewInvoice() {
  const invoiceRef = useRef(null);
  const params = useParams();
  const [invoice, setInvoice] = useState(null);

  const fetchInvoiceDetails = async () => {
    const res = await fetch(
      `/api/user/payments/get-single-transaction/${params.id}`
    );
    const data = await res.json();
    if (res.ok) {
      setInvoice(data.transaction);
    }
  };
  useEffect(() => {
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

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        height: invoiceRef.current.scrollHeight,
        width: invoiceRef.current.scrollWidth,
      });

      actionButtons.forEach((btn) => btn.classList.remove("hidden"));

      const imgData = canvas.toDataURL("image/png", 1.0);
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

      pdf.addImage(imgData, "PNG", 0, 0, finalWidth, finalHeight, "", "FAST");
      const filename = `${invoice?.userId?.name}-invoice.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      actionButtons.forEach((btn) => btn.classList.remove("hidden"));
    }
  };

  return (
    <div ref={invoiceRef} className='mx-auto w-full py-5'>
      <div className='mx-auto w-full rounded-lg bg-white p-10'>
        <div className='my-3'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h1 className='uppercase text-xl font-bold'>
                Automotive web solutions
              </h1>
              <span>Merylands West</span>
              <span>NSW 2160</span>
              <span>Australia</span>
              <span>+61 466 778 515</span>
            </div>
            <div className='max-w-[150px]'>
              <img
                src='/logo.png'
                alt='company-logo'
                width={150}
                height={120}
                className='w-full h-auto object-contain'
                style={{
                  maxWidth: "150px",
                  height: "auto",
                  objectFit: "contain",
                }}
                crossOrigin='anonymous'
              />
            </div>
          </div>
          <div className='my-5 border-b border-gray-300'></div>
          <div className='flex items-start justify-between'>
            <div className='text-start'>
              <h3 className='font-semibold uppercase'>Invoice</h3>
              <div className='flex flex-col mt-1'>
                <p className='font-semibold text-sm'>
                  Invoice No:{" "}
                  <span className='font-normal'>#{invoice?.invoiceId}</span>
                </p>
                <p className='font-semibold text-sm'>
                  Customer Id:{" "}
                  <span className='font-normal'>#{invoice?.orderId}</span>
                </p>
                <p className='font-semibold text-sm'>
                  Issue Date:{" "}
                  <span className='font-normal'>
                    {new Date(invoice?.transactionDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className='text-end'>
              <h3 className='font-semibold uppercase'>Bill To</h3>
              <div className='flex flex-col mt-1'>
                <p className='text-sm uppercase'>{invoice?.userId?.name}</p>
                <p className='text-sm uppercase'>{invoice?.userId?.email}</p>
              </div>
            </div>
          </div>
          <div className='my-5'>
            <Table>
              <TableHead>
                <TableHeadCell className='text-[14px]'>Item</TableHeadCell>
                <TableHeadCell className='text-[14px]'>
                  Description
                </TableHeadCell>
                <TableHeadCell className='text-[14px]'>Qty</TableHeadCell>
                <TableHeadCell className='text-[14px]'>Price</TableHeadCell>
                <TableHeadCell className='text-[14px]'>Total</TableHeadCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className='text-black'>
                    {invoice?.product} Package
                  </TableCell>
                  <TableCell className='text-black'>
                    Purchased {invoice?.productPlan} Subscription
                  </TableCell>
                  <TableCell className='text-black'>1</TableCell>
                  <TableCell className='text-black whitespace-nowrap'>
                    {invoice?.paymentCurrency === "AUD"
                      ? `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice / 1.1
                        ).toFixed(2)}`
                      : `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice
                        ).toFixed(2)}`}
                  </TableCell>
                  <TableCell className='text-black whitespace-nowrap'>
                    {invoice?.paymentCurrency === "AUD"
                      ? `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice / 1.1
                        ).toFixed(2)}`
                      : `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice
                        ).toFixed(2)}`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className='font-semibold'>
                    <div></div>
                  </TableCell>
                  <TableCell className='font-semibold bg-gray-50'>
                    Subtotal
                  </TableCell>
                  <TableCell className='font-semibold bg-gray-50 whitespace-nowrap'>
                    {invoice?.paymentCurrency === "AUD"
                      ? `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice / 1.1
                        ).toFixed(2)}`
                      : `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice
                        ).toFixed(2)}`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className='font-semibold'>
                    <div></div>
                  </TableCell>
                  <TableCell className='font-semibold'>GST/VAT</TableCell>
                  <TableCell className='font-semibold whitespace-nowrap'>
                    {invoice?.paymentCurrency === "AUD"
                      ? `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice - invoice?.productPrice / 1.1
                        ).toFixed(2)}`
                      : `${invoice?.paymentCurrency} 0`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} rowSpan={3}>
                    <div></div>
                  </TableCell>
                  <TableCell className='font-semibold text-black bg-gray-50'>
                    Total
                  </TableCell>
                  <TableCell className='font-semibold bg-gray-50 text-black whitespace-nowrap'>
                    {invoice?.paymentCurrency === "AUD"
                      ? `${invoice?.paymentCurrency} ${Number(
                          invoice?.productPrice
                        ).toFixed(2)}`
                      : `${invoice?.paymentCurrency} ${invoice?.productPrice}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className='my-8'>
            <div>
              <h3 className='font-semibold uppercase text-lg'>
                Bank Information
              </h3>
              <div className='mt-1 flex flex-col'>
                <span className='text-sm'>Account: SYSFOC WEB SOLUTIONS</span>
                <span className='text-sm'>Bank: National Australia Bank</span>
                <span className='text-sm'>BSB: 082 356</span>
                <span className='text-sm'>ACC: 556452985</span>
                <span className='text-sm'>PayPal: payments@sysfoc.com</span>
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <div>
              <h3 className='font-semibold text-sm'>Note:</h3>
              <p className='text-sm'>
                Thanks for doing business with us! If you have any questions
                about this invoice or need any changes, feel free to reach out —
                we're happy to help. Your support means a lot to us.
              </p>
            </div>
          </div>
          <div className='mb-1 border-b border-gray-300'></div>
          <div>
            <span className='text-xs font-semibold'>
              SYSFOC WEB SOLUTIONS (ABN: 76141157764) Trading as Automotive Web
              Solutions.
            </span>
          </div>
          <div className='my-5 flex items-center justify-center print:hidden'>
            <div className='hidden md:flex items-center gap-3'>
              <Button
                onClick={() => window.print()}
                className='mt-4 flex items-center bg-transparent border border-[#182641] text-[#182641] hover:text-white hover:!bg-[#182641]/90'
              >
                <IoIosPrint fontSize={18} className='mr-2' /> Print Invoice
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className='mt-4 flex items-center bg-[#182641] hover:!bg-[#182641]/90'
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
