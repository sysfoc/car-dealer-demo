import React from "react";

export const metadata = {
  title: "Cookies Policy – How We Use Cookies",
  description:
    "Find out how Automotive Web Solutions use cookies to improve user experience and website functionality.",
};

export default function CookiePolicy() {
  return (
    <div className='min-h-screen bg-gray-50 py-10 dark:bg-gray-800'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white'>
          Cookies Policy
        </h1>
        <p className='mb-4 text-gray-600 dark:text-white'>
          SYSFOC CAR Dealer uses cookies and similar tracking technologies to
          enhance your experience on our website. This Cookie Policy explains
          what cookies are, how we use them, and how you can manage your
          preferences.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          1. What Are Cookies?
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Cookies are small text files stored on your device when you visit a
          website. They help improve website functionality, analyze site
          traffic, and enhance user experience. Cookies can be "session cookies"
          (deleted when you close your browser) or "persistent cookies" (stored
          on your device for a specified period).
        </p>

        <h3 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          2. How We Use Cookies
        </h3>
        <p className='mb-4 text-gray-600 dark:text-white'>We use cookies to:</p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>Ensure our website functions properly.</li>
          <li>Improve site performance and user experience.</li>
          <li>Analyze traffic and understand visitor interactions.</li>
          <li>Provide personalized content and advertising.</li>
        </ul>

        <h4 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          3. Types of Cookies We Use
        </h4>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>
            <strong>Essential Cookies:</strong> Necessary for website
            functionality and security.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand website usage
            and improve performance.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Enable enhanced features, such
            as remembering preferences.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Used to deliver relevant ads
            based on your interests.
          </li>
        </ul>

        <h4 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          4. Third-Party Cookies
        </h4>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We may allow third-party services, such as analytics providers and
          advertisers, to set cookies on our site to help analyze traffic and
          display relevant advertisements. These third parties have their own
          privacy policies governing the use of cookies.
        </p>

        <h4 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          5. Managing Your Cookie Preferences
        </h4>
        <p className='mb-4 text-gray-600 dark:text-white'>
          You can control and manage cookie settings in your browser. You may
          choose to block or delete cookies; however, doing so may affect
          website functionality. Most browsers allow you to:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>Delete cookies from your device.</li>
          <li>Block specific types of cookies.</li>
          <li>Set preferences for how cookies are handled.</li>
        </ul>
        <p className='mb-4 text-gray-600 dark:text-white'>
          For more details, consult your browser’s help section.
        </p>

        <h4 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          6. Changes to This Policy
        </h4>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We may update this Cookie Policy from time to time. Any changes will
          be posted on this page with a revised effective date. Please review
          this policy periodically to stay informed about how we use cookies.
        </p>
        <h4 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          7. Contact Us
        </h4>
        <p className='mb-4 text-gray-600 dark:text-white'>
          If you have any questions regarding this Cookie Policy, please contact
          us at sysfoc@gmail.com.
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
