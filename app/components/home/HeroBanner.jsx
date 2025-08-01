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
      <div className='w-[95%] md:w-[75%] text-center'>
        <h1 className='text-white text-4xl sm:text-5xl font-bold leading-10 md:!leading-[3.5rem]'>
          Launch Your Car Dealer Website in Minutes – No Code, No Hassle
        </h1>
        <p className='pt-4 text-white'>
          A powerful SaaS platform designed for car dealerships.
        </p>
        <p className='pt-1 text-white'>
          Automotive Web Solutions makes it fast, easy, and stress — free for car
          dealers to launch and manage professional websites — no tech skills
          required.
        </p>
        <div className='mt-5 flex items-center justify-center'>
          <Link
            href={"#templates"}
            className='bg-[#fa7123] hover:!bg-[#fa7123]/90 text-white px-4 py-2 rounded-md flex items-center gap-2'
          >
            View Demos <MdArrowOutward fontSize={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
