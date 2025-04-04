import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdAlarm } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";

const page = () => {
  const blogs = [
    {
      title: "Top 5 Vehicles to Buy in 2025 - The Biggest Car Launches of 2025",
      author: "Hamza Ilyas",
      date: "Oct 04, 2024",
      views: 1,
      image: "/banner.webp",
    },
    {
      title: "Electric Cars: The Future of Transportation in 2025",
      author: "Sarah Khan",
      date: "Sep 15, 2024",
      views: 5,
      image: "/banner.webp",
    },
    {
      title: "SUVs vs Sedans: Which One is Right for You?",
      author: "Ali Raza",
      date: "Aug 20, 2024",
      views: 12,
      image: "/banner.webp",
    },
    {
      title: "The Most Fuel-Efficient Cars of 2025 Revealed!",
      author: "Ayesha Ahmed",
      date: "Jul 30, 2024",
      views: 8,
      image: "/banner.webp",
    },
    {
      title: "Self-Driving Cars: Are They Ready for 2025?",
      author: "Usman Tariq",
      date: "Jun 18, 2024",
      views: 15,
      image: "/banner.webp",
    },
    {
      title: "Luxury Cars That Will Dominate 2025",
      author: "Nida Malik",
      date: "May 22, 2024",
      views: 20,
      image: "/banner.webp",
    },
  ];
  return (
    <section className='mx-4 my-10 sm:mx-8'>
      <h2 className='mt-5 text-center text-3xl font-bold'>Blog Section</h2>
      <div className='mt-8'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {blogs.map((blog, index) => (
            <div
              key={index}
              className='overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:-translate-y-3 hover:scale-95 dark:border dark:border-gray-700 bg-white'
            >
              <Link href={`/blogs/${index + 1}`}>
                <div>
                  <Image
                    src={blog.image}
                    alt='blog-image'
                    width={500}
                    height={300}
                    className='size-full'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='font-bold hover:text-red-600 hover:underline'>
                    {blog.title}
                  </h3>
                  <div className='mt-2 flex items-center justify-between'>
                    <div className='hidden md:block'>
                      <span className='text-sm'>{blog.author}</span>
                    </div>
                    <div>
                      <span className='flex items-center gap-2 text-sm'>
                        <IoMdAlarm fontSize={18} />
                        {blog.date}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FaRegEye fontSize={18} />
                      <span className='text-sm'>{blog.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
