import { Button } from "flowbite-react";
import Link from "next/link";

export const metadata = {
  title: "All-in-One Website Solution for Car Dealers – No Coding Needed",
  description: "Automotive Web Solutions helps car dealers launch and manage professional websites with zero tech hassle. We host, update, and support—just subscribe and sell cars.",
};
export default function About() {
  return (
    <div className='min-h-screen bg-gray-50 py-10 dark:bg-gray-800'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-700'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white'>
          About Automotive Web Solutions – Your Stress-Free Car Dealer Website Partner 
        </h1>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Welcome to Automotive Web Solutions – your all-in-one, easy-to-use
          platform designed to help car dealers. Whether you run a small car lot
          or a large dealership, we help you get a professional website up and
          running without any coding stress. You do not need to hire developers
          or worry about hosting, security, or updates—we handle it all for you.
        </p>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Just choose a subscription plan, and we will take care of the website
          setup, maintenance, and support. Our goal is to make things simple, so
          you can focus on what matters most: showing your cars and making
          sales.
        </p>
        <h2 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Who We Are
        </h2>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Automotive Web Solutions is a powerful SaaS platform made by <strong>SYSFOC</strong>, a
          leading software and website development company. It is built
          especially for car dealerships. We help dealers create and grow their
          online presence with professional websites that we host, maintain, and
          update for them. Customers pay a simple subscription fee to use our
          services. You don’t need to worry about servers, security, or
          software—we take care of everything so you can focus on selling cars
          instead of managing a website.
        </p>
        <h3 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Our Hassle-Free Subscription Model
        </h3>
        <p className='mb-4 text-gray-600 dark:text-white'>
          For one affordable monthly payment, you get:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>Fully Hosted Website – No servers or setup required </li>
          <li>
            Ongoing Maintenance & Updates – We keep your site running at peak
            performance
          </li>
          <li>
            Secure & Reliable Infrastructure – Built to handle your traffic with
            no downtime worries
          </li>
          <li> 24/7 Technical Support – Friendly help whenever you need it</li>
          <li>
            No Code, No Headaches – We manage everything behind the scenes
          </li>
        </ul>
        <h3 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          What We Offer
        </h3>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We know that no two dealerships are the same. That is why we provide
          flexible, scalable solutions tailored to your business:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>
            Pre-Designed Automotive SaaS platforms– Modern, conversion-focused
            templates made for car dealers
          </li>
          <li>Customizable Layouts – Tailor your site to match your brand</li>
          <li>
            Easy Inventory Management – Showcase your vehicles with images,
            pricing, and details
          </li>
          <li>
            Optional Add-Ons – SEO, digital marketing, and more to help you grow
          </li>
          <li>
            Flexible Subscription Plans – Choose a plan that fits your
            dealership’s size and needs
          </li>
          <li>
            Risk-Free Trial – Try us for 7 days with our money-back guarantee.
          </li>
        </ul>
        <h3 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Why Choose Us?
        </h3>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>
            All-in-One Subscription – One payment covers hosting, updates,
            support, and features
          </li>
          <li>
            Purpose-Built for Dealers – Created by automotive and tech
            professionals
          </li>
          <li>Transparent Pricing – No hidden fees or unexpected costs</li>
          <li>
            Flexible Subscription Plans – Choose a plan that fits your
            dealership’s size and needs
          </li>
        </ul>
        <h3 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Our Commitment to You
        </h3>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Your dealership deserves a website that works just as hard as you do.
          With Automotive Web Solutions, your subscription ensures:
        </p>
        <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-white'>
          <li>Always-online website availability</li>
          <li>Regular security updates and patches</li>
          <li>Automatic daily backups</li>
          <li>Continuous performance and feature upgrades</li>
        </ul>
        <p className='mb-4 text-gray-600 dark:text-white'>
          We manage the tech, so you can manage your business.
        </p>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Join hundreds of dealerships who trust Automotive Web Solutions to
          power their online success.
        </p>
        <h3 className='mb-4 mt-6 text-xl font-semibold text-gray-800 dark:text-white'>
          Ready to Get Started?
        </h3>
        <p className='mb-4 text-gray-600 dark:text-white'>
          Launch your dealer website in minutes—no code, no stress.
        </p>
        <Link href={"/pricing"}>
          <Button color='dark'>See Pricing Plans</Button>
        </Link>
        <div className='mt-8 border-t pt-4'>
          <p className='text-center text-sm text-gray-500 dark:text-white'>
            © 2025 sysfoc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
