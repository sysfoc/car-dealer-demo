"use client";
import { Button, Label, TextInput, Card, Select } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUsers() {
  const [UserDetails, setUserDetails] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    const getUserByParams = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/get-user/${params.id}`);
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
          setUserDetails(data.user);
        } else {
          setError(true);
          setErrorMessage(data.message);
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    };
    getUserByParams();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/update/${UserDetails._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setError(false);
        router.push("/dashboard/users");
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-lg p-6 shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
          Update User
        </h2>
        <form className='space-y-4' onSubmit={handleFormData}>
          <div>
            <Label htmlFor='name' value='Name' />
            <TextInput
              id='name'
              type='text'
              name='name'
              autoComplete="on"
              defaultValue={UserDetails?.name}
              placeholder='Enter name'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              name='email'
              autoComplete="on"
              defaultValue={UserDetails?.email}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='password' value='Password' />
            <TextInput
              id='password'
              type='password'
              name='password'
              placeholder='Leave empty if you dont want to change password'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='role' value='Role' />
            <Select id='role' name='role' value={UserDetails?.role} onChange={handleChange}>
              <option value='user'>
                User
              </option>
              <option value='admin'>
                Admin
              </option>
            </Select>
          </div>
          <div className='flex justify-end'>
            <Button
              disabled={loading}
              type='submit'
              color='blue'
              className='w-full'
            >
              Update
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
