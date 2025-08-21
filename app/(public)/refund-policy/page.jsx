import React from "react";

export const metadata = {
  title: "Refund Policy – Money-Back Guarantee Info ",
  description:
    "We believe in our product—and back it with a full money-back guarantee. Here’s how it works.",
};

export default function RefundPolicy() {
  return (
    <div className='min-h-screen bg-gray-50 py-10 dark:bg-gray-800'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white'>
          Automotive Web Solutions Refund Policy
        </h1>
        <p className='mb-4 text-gray-600 dark:text-white'>
          At Automotive Web Solutions, we are committed to your satisfaction.
          That is why we offer a 7-day money-back guarantee on all our
          subscription plans — no questions asked.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Full Refund (Within 7 Days)
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          If you are not satisfied with our services, you can request a full
          refund within 7 days of your subscription date, regardless of the plan
          selected. Your payment will be refunded in full with no questions, no
          forms, and no hassle.
        </p>
        <h3 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Refunds After 7 Days
        </h3>
        <p className='mb-4 text-gray-600 dark:text-white'>
          If you request a refund after the 7-day window:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>
            <strong>Monthly Plan:</strong> We will charge for the current
            month’s full subscription. No partial refund will be issued for the
            remaining month.{" "}
          </li>
          <li>
            <strong>Yearly Plan:</strong> We will deduct one full month’s fee as
            the current (running) month’s charge. The remaining balance for the
            unused months will be refunded to you.
          </li>
        </ul>

        <h4 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Simple, Hassle-Free Process
        </h4>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We believe in fairness and transparency. Whether within or beyond 7
          days, we promise a simple and smooth refund process without requiring
          any justification, lengthy forms, or approval processes.
        </p>
        <p className='mb-4 text-gray-600 dark:text-white'>
          If you have any questions about this refund policy, feel free to
          contact us at <strong>sales@automotivewebsolutions.com</strong>.
        </p>
      </div>
    </div>
  );
}
