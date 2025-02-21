import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";
const ProjectTemplates = () => {
  return (
    <section className="my-14 mx-4 md:mx-12">
      <div className="py-5 flex items-center justify-center">
        <div className="text-center w-full md:w-[50%]">
          <h2 className="text-4xl font-semibold">
            Great packs of ready-made templates.
          </h2>
          <p className="my-2">
            Choose one of the existing styles or follow your ideas and customize
            your site
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-x-10 gap-y-5 justify-between flex-wrap">
          <div className="flex items-center gap-3">
            <FaCheck fontSize={20} className="text-red-600" />
            <span>Tailwind Css Supported</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheck fontSize={20} className="text-red-600" />
            <span>Change Fonts & Colors Globally</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheck fontSize={20} className="text-red-600" />
            <span>Fully Responsive Layout</span>
          </div>
        </div>
      </div>
      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-4">
            <Link href={"/"}>
              <div className="p-4 bg-white">
                <Image
                  src={"/demo-1.webp"}
                  alt="demo"
                  width={500}
                  height={500}
                  className="size-auto"
                />
              </div>
              <div className="py-3">
                <h3 className="text-center font-semibold text-xl">
                  Dealer One
                </h3>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <Link href={"/"}>
              <div className="p-4 bg-white">
                <Image
                  src={"/demo-1.webp"}
                  alt="demo"
                  width={500}
                  height={500}
                  className="size-auto"
                />
              </div>
              <div className="py-3">
                <h3 className="text-center font-semibold text-xl">
                  Dealer Two
                </h3>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <Link href={"/"}>
              <div className="p-4 bg-white">
                <Image
                  src={"/demo-1.webp"}
                  alt="demo"
                  width={500}
                  height={500}
                  className="size-auto"
                />
              </div>
              <div className="py-3">
                <h3 className="text-center font-semibold text-xl">
                  Dealer Three
                </h3>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <Link href={"/"}>
              <div className="p-4 bg-white">
                <Image
                  src={"/demo-1.webp"}
                  alt="demo"
                  width={500}
                  height={500}
                  className="size-auto"
                />
              </div>
              <div className="py-3">
                <h3 className="text-center font-semibold text-xl">
                  Dealer Four
                </h3>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <Link href={"/"}>
              <div className="p-4 bg-white">
                <Image
                  src={"/demo-1.webp"}
                  alt="demo"
                  width={500}
                  height={500}
                  className="size-auto"
                />
              </div>
              <div className="py-3">
                <h3 className="text-center font-semibold text-xl">
                  Dealer Five
                </h3>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <Link href={"/"}>
              <div className="p-4 bg-white">
                <Image
                  src={"/demo-1.webp"}
                  alt="demo"
                  width={500}
                  height={500}
                  className="size-auto"
                />
              </div>
              <div className="py-3">
                <h3 className="text-center font-semibold text-xl">
                  Dealer Six
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectTemplates;
