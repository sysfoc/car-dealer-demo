import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { Button } from "flowbite-react";
import { dealers } from "@/lib/themes/theme";
const ProjectTemplates = () => {
  return (
    <section id='templates' className='my-14 mx-4 md:mx-12'>
      <div className='py-5 flex items-center justify-center'>
        <div className='text-center w-full md:w-[50%]'>
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            Great packs of ready-made templates.
          </h2>
          <p className='mt-5 text-gray-500'>
            Choose one of the existing styles or follow your ideas and customize
            your site
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='flex items-center gap-x-10 gap-y-5 justify-between flex-wrap'>
          <div className='flex items-center gap-3'>
            <FaCheck fontSize={20} className='text-red-600' />
            <span className='font-semibold'>Tailwind Css Supported</span>
          </div>
          <div className='flex items-center gap-3'>
            <FaCheck fontSize={20} className='text-red-600' />
            <span className='font-semibold'>
              Change Fonts & Colors Globally
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <FaCheck fontSize={20} className='text-red-600' />
            <span className='font-semibold'>Fully Responsive Layout</span>
          </div>
        </div>
      </div>
      <div className='my-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              className='relative rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-4 group'
            >
              <Link href={dealer.link} target='_blank'>
                <div className='p-4 bg-white'>
                  <Image
                    src={dealer.image}
                    alt={dealer.alt}
                    width={500}
                    height={500}
                    className='size-auto'
                  />
                </div>
                <div className='px-2 py-3'>
                  <h3 className='text-center font-semibold text-xl'>
                    {dealer.name}
                  </h3>
                </div>
              </Link>
              <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-y-4 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <Link href={dealer.link} target='_blank'>
                  <button className='flex items-center gap-2 bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-200'>
                    <AiOutlineEye className='text-lg' />
                    View Demo
                  </button>
                </Link>
                <Link href={`/pricing`}>
                  <Button
                    size='sm'
                    className='bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:!bg-red-700'
                  >
                    Purchase now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectTemplates;
