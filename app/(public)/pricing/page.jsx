"use client";
import React, { useState } from "react";
import { Button, ToggleSwitch } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCelebration } from "react-icons/md";

export default function Home() {
  const [switch1, setSwitch1] = useState(false);
  const packages = [
    {
      name: "Basic Package",
      price: "$99",
      billingCycle: "Billed Monthly",
      borderColor: "border-red-600",
      features: [
        {
          title: "10GB Storage",
          description:
            "Ample space to manage your essential content and media files.",
        },
        {
          title: "30 Car Listings",
          description:
            "Perfect for small dealerships looking to showcase their inventory online.",
        },
        {
          title: "Up to 2 User Accounts",
          description: "Allow up to 2 users to manage your site.",
        },
        {
          title: "Up to 2 Email Accounts",
          description: "Professional email addresses for your team.",
        },
        {
          title: "Fully Operational Website",
          description: "A complete, ready-to-use website.",
        },
        {
          title: "Responsive Design",
          description: "Optimized for all devices.",
        },
        {
          title: "Basic SEO Optimization",
          description:
            "Enhance your website’s visibility with fundamental SEO tools.",
        },
        {
          title: "24-Hour Email & Chat Support",
          description:
            "Get assistance whenever you need it, with round-the-clock customer support.",
        },
        {
          title: "Monthly Website Backups",
          description: "Keep your data safe with regular monthly backups.",
        },
      ],
    },
    {
      name: "Standard Package",
      price: "$249",
      billingCycle: "Billed Monthly",
      borderColor: "border-blue-600",
      features: [
        {
          title: "25GB Storage",
          description: "More storage for growing businesses.",
        },
        {
          title: "200 Car Listings",
          description: "Ideal for mid-sized dealerships.",
        },
        {
          title: "Up to 5 User Accounts",
          description: "More users to manage your platform.",
        },
        {
          title: "Up to 5 Email Accounts",
          description: "Professional email addresses for your team.",
        },
        {
          title: "Fully Operational Website",
          description: "A complete, ready-to-use website.",
        },
        {
          title: "Responsive Design",
          description: "Optimized for all devices.",
        },
        {
          title: "Basic SEO Optimization",
          description:
            "Enhance your website’s visibility with fundamental SEO tools.",
        },
        {
          title: "Advanced SEO Tools",
          description: "Gain access to advanced SEO functionalities.",
        },
        {
          title: "12-Hour Email & Chat Support",
          description: "Support available during working hours.",
        },
        {
          title: "Weekly Website Backups",
          description: "Keep your data safe with weekly backups.",
        },
        {
          title: "Basic Customization",
          description: "Modify your site’s look and feel.",
        },
        {
          title: "Car Finance",
          description: "Offer financing options to customers.",
        },
      ],
    },
    {
      name: "Premium Package",
      price: "$499",
      billingCycle: "Billed Monthly",
      borderColor: "border-green-600",
      features: [
        {
          title: "50GB Storage",
          description: "Maximum storage for large dealerships.",
        },
        {
          title: "Unlimited Car Listings",
          description: "No limits on the number of car listings.",
        },
        {
          title: "Up to 10 User Accounts",
          description: "Expand your team’s access.",
        },
        {
          title: "Up to 10 Email Accounts",
          description: "Professional email addresses for your team.",
        },
        {
          title: "Fully Operational Website",
          description: "A complete, ready-to-use website.",
        },
        {
          title: "Responsive Design",
          description: "Optimized for all devices.",
        },
        {
          title: "Basic SEO Optimization",
          description:
            "Enhance your website’s visibility with fundamental SEO tools.",
        },
        {
          title: "Advanced SEO Tools",
          description: "Gain access to advanced SEO functionalities.",
        },
        {
          title: "12-Hour Email & Chat Support",
          description: "Support available during working hours.",
        },
        { title: "Phone Support", description: "Direct assistance via phone." },
        {
          title: "Daily Website Backups",
          description: "Keep your data safe with daily backups.",
        },
        {
          title: "Basic Customization",
          description: "Modify your site’s look and feel.",
        },
        {
          title: "Car Leasing",
          description: "Provide leasing options for vehicles.",
        },
        {
          title: "Car Finance",
          description: "Offer financing options to customers.",
        },
        {
          title: "Performance Optimization",
          description: "Ensure your website runs smoothly and efficiently.",
        },
        {
          title: "Third-Party Integrations",
          description: "Seamlessly integrate with other tools and platforms.",
        },
        {
          title: "Dedicated Account Manager",
          description: "Get a dedicated expert to assist you.",
        },
      ],
    },
  ];
  return (
    <section className="mx-4 my-10 sm:mx-8">
      <div className="text-center">
        <div className="mt-5">
          <h1 className="text-2xl font-bold md:text-4xl">
            Simple Pricing, Unbeatable Value
          </h1>
          <p className="mt-3 text-center">Join 1000+ Happy Users</p>
        </div>
      </div>
      <div className="my-8 flex items-center justify-center">
        <div className="rounded-lg border-t-4 bg-white border-red-600 p-8 shadow-md">
          <div className="w-full sm:w-[320px]">
            <h2 className="text-center">Subscription Term</h2>
            <div className="flex items-center justify-center">
              <div className="mt-4 flex flex-row items-center gap-5">
                <p className="text-sm">Monthly</p>
                <ToggleSwitch
                  label="Annual"
                  color="red"
                  checked={switch1}
                  onChange={setSwitch1}
                  sizing="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`rounded-lg border-t-4 bg-white ${pkg.borderColor} p-5 shadow-md`}
            >
              <div>
                <h3 className="text-xl font-semibold">{pkg.name}</h3>
                <p className="mt-1 text-sm">
                  A comprehensive package with essential features.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <strong className="text-4xl">{pkg.price}</strong>
                  <span className="text-sm">{pkg.billingCycle}</span>
                </div>
                <div className="flex flex-col">
                  <Button className="mt-4 w-full rounded-full bg-red-600 hover:!bg-red-700 py-2 text-white">
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-lg font-semibold">
                  {pkg.name} Includes:
                </span>
                <div className="mt-3 flex flex-col gap-2">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="py-1">
                        <FaCheckCircle className="mr-1 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="mt-1 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
