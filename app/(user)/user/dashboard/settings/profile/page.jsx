"use client";
import { Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const currentUser = useSelector((state) => state.user);
  return (
    <div>
      <div className='bg-white border-b p-4'>
        <h2 className='font-semibold text-xl'>Manage Profile</h2>
      </div>
      <div className='flex items-center justify-center p-4 bg-white'>
        <div className='w-full md:w-[70%]'>
          <div className='flex items-center justify-center'>
            <div className='w-[150px] h-[150px] p-2 object-cover overflow-hidden shadow rounded-full flex items-center justify-center'>
              <Image
                src={`${currentUser?.profileImg}`}
                alt='profile-img'
                width={150}
                height={150}
                className='size-full object-contain'
              />
            </div>
          </div>
          <form className='my-3 flex flex-col gap-3'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <TextInput
                type='text'
                id='name'
                defaultValue={currentUser?.name}
                placeholder='John Doe'
                required
              />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <TextInput
                type='email'
                id='email'
                defaultValue={currentUser?.email}
                placeholder='johndoe@gmail.com'
                required
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <TextInput
                type='password'
                id='password'
                placeholder='*******'
                required
              />
            </div>
            <div>
              <Button type='submit' color='blue' className='mt-3 w-full'>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
