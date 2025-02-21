import React from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
const HeroBanner = () => {
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        background: "url('./banner.webp') no-repeat center center/cover",
        backgroundColor: "rgb(5, 11, 32)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="absolute top-10 left-10 sm:left-14 text-white">
        <span>Great packs of ready-made templates</span>
      </div>
      <div className="w-[75%] text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-bold !leading-[3.5rem]">
          Car Dealer, Car Leasing, Car Repair HTML & Next JS Templates
        </h1>
        <p className="py-4 text-white">
          Autovault provides full of features for creating a perfect Business
          website as like Consulting, Corporate, Finance, Agency and Marketing
          websites.
        </p>
        <div className="flex items-center justify-center">
          <Link
            href={"/add-ons"}
            className="bg-red-600 text-white px-4 py-2 rounded-md mt-3 flex items-center gap-2"
          >
            View Demos <MdArrowOutward fontSize={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
