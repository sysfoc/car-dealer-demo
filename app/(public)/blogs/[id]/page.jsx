import { Avatar, Button, Label, Textarea, TextInput } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdAlarm } from "react-icons/io";

const page = () => {
  return (
    <section className='mx-4 my-5 sm:mx-16'>
      <div className='grid grid-cols-1 items-center gap-x-10 gap-y-5 py-5 md:grid-cols-2'>
        <div className='overflow-hidden rounded-lg'>
          <Image
            src={"/banner.webp"}
            alt='blog-image'
            width={500}
            height={300}
            className='size-full'
          />
        </div>
        <div>
          <div className='flex flex-row items-center gap-3'>
            <Button className='bg-red-600 hover:!bg-red-700' size='sm'>
              Cars to Buy
            </Button>
            <div className='flex items-center gap-2'>
              <IoMdAlarm fontSize={18} />
              <span>Oct 04, 2024</span>
            </div>
          </div>
          <h1 className='mt-3 text-2xl font-bold sm:mt-5 sm:text-4xl'>
            Top 5 Vehicals to buy in 2025 - The Biggest Car Launches of 2025
          </h1>
          <div className='mt-5 flex items-center gap-10'>
            <div className='flex items-center gap-3'>
              <Avatar size={"sm"} rounded />
              <span>Hamza Ilyas</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <FaEye fontSize={18} />
              <span>225 views</span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 w-full md:w-3/4'>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          iste accusantium quod. Veniam, aliquid ad hic, temporibus, amet
          inventore id nostrum tempora quibusdam in nemo quia accusamus et? Eos
          expedita, cupiditate libero dolorum dolorem, aperiam dolor magnam vel
          aut obcaecati doloremque nulla maiores itaque aspernatur. Suscipit
          aliquid quo ab sunt quaerat nihil optio explicabo dolor quisquam?
          Earum quia iusto corrupti dolorem qui voluptate labore quisquam.
          Ratione aperiam animi velit! Perferendis officia nihil eos a error
          dolor dicta. Culpa officiis ullam fuga accusamus voluptate vero cum,
          corrupti consectetur minus? Quibusdam nemo molestias iusto, blanditiis
          architecto libero dolorum! Est repudiandae id sint eos praesentium, ad
          deserunt.
        </div>
        <div className='bg-white p-5 mt-8'>
          <h2 className='text-2xl font-bold'>Comments</h2>
          <div>
            <form>
              <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div className='flex flex-col'>
                  <Label htmlFor='fname'>First Name:</Label>
                  <TextInput
                    type='text'
                    id='fname'
                    placeholder='First Name'
                    required
                  />
                </div>
                <div className='flex flex-col'>
                  <Label htmlFor='lname'>Last Name:</Label>
                  <TextInput
                    type='text'
                    id='lname'
                    placeholder='Last Name'
                    required
                  />
                </div>
                <div className='col-span-2 flex flex-col'>
                  <Label htmlFor='email'>Email:</Label>
                  <TextInput
                    type='email'
                    id='email'
                    placeholder='Email Address'
                    required
                  />
                </div>
                <div className='col-span-2 flex flex-col'>
                  <Label htmlFor='comment'>Add Comment:</Label>
                  <Textarea rows={10} id='comment' required />
                </div>
              </div>
              <div>
                <Button
                  type='submit'
                  size={"md"}
                  className=' mt-5 bg-red-600 hover:!bg-red-700'
                >
                  Add Comment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
