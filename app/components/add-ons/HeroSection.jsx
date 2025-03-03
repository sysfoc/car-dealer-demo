import React from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
const HeroSection = () => {
  return (
    <section className="my-10 w-full flex items-center justify-center relative">
      <div className="text-center">
        <div className="mt-5">
          <h1 className="text-2xl font-bold md:text-4xl">Add-ons Section</h1>
          <p className="mt-3 text-center">
            Add-ons are additional services that you can purchase to enhance
            your website
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
