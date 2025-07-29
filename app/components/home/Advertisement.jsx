import Link from "next/link";
import React from "react";

const Advertisement = () => {
  return (
    <section className='my-8 flex items-center justify-center'>
      <div className='mx-4 sm:mx-16 w-full md:w-[90%] flex flex-col gap-y-4 sm:flex-row items-center justify-between bg-[#e56c16] px-8 py-12 rounded-lg'>
        <h2 className='text-white text-2xl font-semibold'>Get started today</h2>
        <Link href='/pricing'>
          <button className='bg-white text-black text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-gray-200'>
            Start Selling Today
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Advertisement;
