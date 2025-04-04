import React from "react";

export const metadata = {
  title: "Refund Policy - SYSFOC Car Dealer",
  description:
    "This Refund Policy explains the terms under which refunds are issued for our services and products.",
};

export default function RefundPolicy() {
  return (
    <div className='min-h-screen bg-gray-50 py-10 dark:bg-gray-800'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white'>
          Refund Policy
        </h1>
        <p className='mb-4 text-gray-600 dark:text-white'>
          At SYSFOC Car Dealer, customer satisfaction is our priority. This
          Refund Policy outlines the conditions under which refunds are
          processed for our services and products.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          1. Eligibility for Refunds
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Refunds may be issued under the following conditions:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>The product is defective or damaged upon delivery.</li>
          <li>The service was not delivered as promised.</li>
          <li>
            A cancellation request is made within the allowed cancellation
            period.
          </li>
        </ul>

        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          2. Non-Refundable Items
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Certain items and services are non-refundable, including but not
          limited to:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>Used or damaged vehicles after purchase.</li>
          <li>Personalized or customized orders.</li>
          <li>Digital products or services already provided.</li>
        </ul>

        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          3. Refund Process
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          To request a refund, please follow these steps:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>
            Contact our support team at sysfoc@gmail.com with your order
            details.
          </li>
          <li>Provide proof of purchase and relevant documentation.</li>
          <li>Allow up to 7 business days for processing your request.</li>
        </ul>

        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          4. Late or Missing Refunds
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          If you haven’t received your refund yet, please:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>Check your bank account again.</li>
          <li>
            Contact your credit card provider, as refunds may take some time to
            reflect.
          </li>
          <li>
            If you’ve done all of this and still haven’t received your refund,
            contact us at sysfoc@gmail.com.
          </li>
        </ul>

        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          5. Updates to This Policy
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We reserve the right to modify this Refund Policy at any time. Any
          changes will be posted on this page with an updated effective date.
        </p>

        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          6. Contact Us
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          If you have any questions about our Refund Policy, please contact us
          at sysfoc@gmail.com.
        </p>

        <div className='mt-8 border-t pt-4'>
          <p className='text-center text-sm text-gray-500 dark:text-white'>
            © 2025 Dealer Website by SYSFOC Automotive. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
