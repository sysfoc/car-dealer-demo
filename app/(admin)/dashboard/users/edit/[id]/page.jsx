"use client";
import { Button, Label, TextInput, Card } from "flowbite-react";

export default function EditUsers() {
  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-lg p-6 shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
          Update User
        </h2>
        <form className='space-y-4'>
          <div>
            <Label htmlFor='username' value='Username' />
            <TextInput
              id='username'
              type='text'
              placeholder='Enter username'
              required
            />
          </div>
          <div>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              placeholder='Enter email'
              required
            />
          </div>
          <div>
            <Label htmlFor='phone' value='Phone Number' />
            <TextInput
              id='phone'
              type='tel'
              placeholder='Enter phone number'
              required
            />
          </div>
          <div className='flex justify-end'>
            <Button type='submit' color='blue' className='w-full'>
              Update
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
