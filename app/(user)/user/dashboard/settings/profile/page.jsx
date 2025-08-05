"use client";
import {
  updateStart,
  updateUser,
  updateFailure,
} from "@/lib/features/user/userSlice";
import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "@/app/(user)/components/profile/LogoutButton";
import DeleteButton from "@/app/(user)/components/profile/DeleteButton";

export default function UserProfile() {
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const {
    error: errorMessage,
    loading,
    currentUser,
  } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch("/api/user/profile/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(updateUser(data.user));
        setSuccess(true);
        setSuccessMessage(data.message);
        setError(false);
      } else {
        setSuccess(false);
        setError(true);
        dispatch(updateFailure(data.message));
      }
    } catch (error) {
      setError(true);
      dispatch(updateFailure(error.message));
    }
  };
  return (
    <div>
      {error && (
        <Alert color='failure' className='fixed z-50 top-4 right-4'>
          <span>
            <span className='font-medium'>{errorMessage}</span>
          </span>
        </Alert>
      )}
      {success && (
        <Alert color='success' className='fixed z-50 top-4 right-4'>
          <span>
            <span className='font-medium'>{successMessage}</span>
          </span>
        </Alert>
      )}
      <div className='bg-white border-b p-4 flex items-center justify-between gap-3 flex-wrap'>
        <h2 className='font-semibold text-xl'>Manage Profile</h2>
        <div className="flex items-center gap-3">
          <LogoutButton />
          <DeleteButton/>
        </div>
      </div>
      <div className='flex items-center justify-center p-4 bg-white'>
        <div className='w-full md:w-[70%]'>
          <form
            className='my-3 flex flex-col gap-3'
            onSubmit={handleFormData}
            encType='multipart/form-data'
          >
            <div className='flex items-center justify-center'>
              <div className='w-[150px] h-[150px] p-2 object-cover overflow-hidden shadow rounded-full flex items-center justify-center'>
                <Image
                  src={`${currentUser?.profileImg || "/logo.png"}`}
                  alt='profile-img'
                  width={150}
                  height={150}
                  className='size-full object-contain'
                />
              </div>
              <div>
                <FileInput
                  typeof='file'
                  name='profileImg'
                  className='hidden'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor='name'>Name</Label>
              <TextInput
                type='text'
                id='name'
                name='name'
                defaultValue={currentUser?.name}
                placeholder='Enter new name'
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <TextInput
                type='email'
                id='email'
                name='email'
                defaultValue={currentUser?.email}
                placeholder='Enter registered email'
                required
                disabled
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <TextInput
                type='password'
                id='password'
                name='password'
                placeholder='Leave blank if you don&apos;t want to change'
                onChange={handleChange}
              />
            </div>
            <div>
              <Button
                disabled={loading}
                type='submit'
                className='mt-3 w-full bg-[#fa7123] hover:!bg-[#fa7123]/90'
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
