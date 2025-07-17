import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
const HeroBanner = () => {
  return (
    <section className='relative min-h-screen w-full flex items-center justify-center'>
      <Image
        src='/banner.webp'
        alt='hero-banner-image'
        fill
        fetchPriority='high'
        priority
        quality={80}
        className='object-cover object-center -z-10'
      />
      <div className='absolute inset-0 bg-[#050b20b8] mix-blend-multiply -z-10' />
      <div className='absolute top-10 left-10 sm:left-14 text-white'>
        <span>The Smart Way to Sell Vehicles</span>
      </div>
      <div className='w-[95%] md:w-[75%] text-center'>
        <h1 className='text-white text-4xl sm:text-5xl font-bold leading-10 md:!leading-[3.5rem]'>
          A "hassle-free" SaaS platform That Puts Your Dealership in the Fast
          Lane
        </h1>
        <p className='py-4 text-white'>
          We help bring potential customers to your door-step. Start your
          journey to higher profits today! Let&apos;s Get Started!
        </p>
        <div className='flex items-center justify-center'>
          <Link
            href={"/add-ons"}
            className='bg-red-600 text-white px-4 py-2 rounded-md mt-3 flex items-center gap-2'
          >
            View Demos <MdArrowOutward fontSize={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
