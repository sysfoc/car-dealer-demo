"use client";
import { Button, Label, TextInput, Card, Select } from "flowbite-react";

export default function EditUsers() {
  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-lg p-6 shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
          Update User
        </h2>
        <form className='space-y-4'>
          <div>
            <Label htmlFor='name' value='Name' />
            <TextInput
              id='name'
              type='text'
              name="name"
              placeholder='Enter name'
              required
            />
          </div>
          <div>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              name="email"
              placeholder='Enter email'
              required
            />
          </div>
          <div>
            <Label htmlFor='password' value='Password' />
            <TextInput
              id='password'
              type='password'
              name="password"
              placeholder='Enter password'
              required
            />
          </div>
          <div>
            <Label htmlFor='role' value='Role' />
            <Select
              id='role'
              name="role"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Select>
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
