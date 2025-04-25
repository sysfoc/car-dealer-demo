"use client";
import { Button, Label, TextInput, Card, Select, Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUsers() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setError(false);
        setSuccess(true);
        setSuccessMessage(data.message);
        router.push("/dashboard/users");
        setFormData({});
      } else {
        setSuccess(false);
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setSuccess(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-lg p-6 shadow-lg'>
        {success && (
          <Alert color='success'>
            <span className='block sm:inline'>{successMessage}</span>
          </Alert>
        )}
        {error && (
          <Alert color='failure'>
            <span className='block sm:inline'>{errorMessage}</span>
          </Alert>
        )}
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
          Create New User
        </h2>
        <form className='space-y-4' onSubmit={handleSubmitForm}>
          <div>
            <Label htmlFor='name' value='Name' />
            <TextInput
              id='name'
              type='text'
              name='name'
              placeholder='Enter name'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              name='email'
              placeholder='Enter email'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='password' value='Password' />
            <TextInput
              id='password'
              type='password'
              name='password'
              placeholder='********'
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='password' value='Password' />
            <Select
              id='role'
              name='role'
              required
              placeholder='Select role'
              onChange={handleChange}
            >
              <option value=''>Select Role</option>
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </Select>
          </div>
          <div className='flex justify-end'>
            <Button
              disabled={loading}
              type='submit'
              color='blue'
              className='w-full'
            >
              Create User
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
