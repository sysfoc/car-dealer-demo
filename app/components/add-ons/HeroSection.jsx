import React from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
const HeroSection = () => {
  return (
    <section
      className="min-h-[60vh] w-full flex items-center justify-center relative"
      style={{
        background: "url('./banner.webp') no-repeat center center/cover",
        backgroundColor: "rgb(5, 11, 32)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="w-[95%] md:w-[75%] text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-bold leading-10 md:!leading-[3.5rem]">
          Add-ons Section
        </h1>
        <p className="py-4 text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
