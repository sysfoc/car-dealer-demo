"use client";
import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    writer: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useRouter();

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 500,
  };
  const handleContentChange = (newContent) => {
    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "title") {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
      }

      return updated;
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const res = await fetch("/api/blog/add", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        navigate.push("/dashboard/blogs");
        setFormData({});
      } else {
        setError(true);
        setErrorMessage(data.message);
        setFormData({});
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <section className='my-5'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold mb-4'>Create a new Blog</h2>
        <div>
          <Link href={"/dashboard/blogs"}>
            <Button
              size='md'
              className='bg-blue-500 hover:!bg-blue-600 text-white rounded-md'
            >
              Go Back
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <form onSubmit={handleFormData}>
          {error && (
            <Alert color='failure'>
              <span className='font-medium'>{errorMessage}</span>
            </Alert>
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='title'>H1/Title</Label>
              <TextInput
                type='text'
                id='title'
                name='title'
                placeholder='Title'
                required
                value={formData.title || ""}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='slug'>Slug</Label>
              <TextInput
                type='text'
                id='slug'
                name='slug'
                placeholder='slug'
                required
                readOnly
                value={formData.slug || ""}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='metaTitle'>Meta Title</Label>
              <TextInput
                type='text'
                id='metaTitle'
                name='metaTitle'
                placeholder='Meta Title'
                required
                value={formData.metaTitle || ""}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='metaDescription'>Meta Description</Label>
              <TextInput
                type='text'
                id='metaDescription'
                name='metaDescription'
                placeholder='Meta Description'
                required
                value={formData.metaDescription || ""}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='writer'>Writer</Label>
              <TextInput
                type='text'
                id='writer'
                name='writer'
                placeholder='John Doe'
                required
                value={formData.writer || ""}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-2'>
              <div>
                <p className='text-sm font-semibold'>Content:</p>
                <Suspense fallback={<p>Loading editor...</p>}>
                  <LazyJoditEditor
                    value={formData.content}
                    config={config}
                    tabIndex={1}
                    onBlur={handleContentChange}
                  />
                </Suspense>
              </div>
            </div>
            <div className='flex flex-col gap-1 col-span-2'>
              <Label htmlFor='image'>Image</Label>
              <FileInput
                id='image'
                name='image'
                accept='image/*'
                placeholder='Upload an image'
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
          <div className='mt-8'>
            <Button
              disabled={loading}
              type='submit'
              color='dark'
              className='w-full'
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
