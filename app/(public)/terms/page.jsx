import React from "react";
export const metadata = {
  title: "Terms and Conditions - Auto Car Dealers",
  description:
    "Please read these terms carefully before using our services. By accessing or using our website, you agree to be bound by these terms.",
};
export default function TermsAndConditions() {
  return (
    <div className='min-h-screen bg-gray-50 py-10 dark:bg-gray-800'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white'>
          Terms and Conditions
        </h1>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Welcome to our Terms and Conditions page. Please read these terms
          carefully before using our services. By accessing or using our
          website, you agree to be bound by these terms.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          1. Acceptance of Terms
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          By using this website, you acknowledge that you have read, understood,
          and agree to be bound by these terms and conditions. If you do not
          agree, please discontinue use of our site.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          2. Changes to Terms
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We reserve the right to modify or update these terms at any time
          without prior notice. It is your responsibility to review these terms
          periodically for updates.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          3. User Responsibilities
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          You agree to use this website for lawful purposes only. Any misuse or
          unauthorized access may result in termination of access and potential
          legal action.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          4. Limitation of Liability
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We are not liable for any direct, indirect, incidental, or
          consequential damages resulting from the use or inability to use our
          services or website.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          5. Governing Law
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          These terms and conditions are governed by the laws of [Your
          Jurisdiction]. Any disputes arising from these terms will be resolved
          exclusively in the courts of [Your Jurisdiction].
        </p>
        <div className='mt-8 border-t pt-4'>
          <p className='text-center text-sm text-gray-500 dark:text-white'>
            © 2025 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
