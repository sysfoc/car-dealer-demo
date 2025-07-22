"use client";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function DomainSetup() {
  const [formData, setFormData] = useState({
    domainName: "",
    domainRegistrar: "",
    domainUsername: "",
    domainPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFormData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/domain/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setLoading(false);
        setError(false);
        setSuccess(true);
        setSuccessMessage(data.message);
        setFormData({
          domainName: "",
          domainRegistrar: "",
          domainUsername: "",
          domainPassword: "",
        });
        location.reload();
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <section className='my-10'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold'>Domain Setup</h1>
        <p className='text-gray-500 text-sm'>
          Please select one of the following options
        </p>
      </div>
      <div className='mt-5'>
        <div className='bg-white p-5 rounded-md shadow'>
          <h2 className='text-lg font-semibold'>
            Option 1: DNS settings for cloudflare manually done by our
            developers
          </h2>
          <form className='mt-3' onSubmit={handleFormData}>
            {error && (
              <Alert color='failure'>
                <span>
                  <span className='font-medium'>Error!</span> {errorMessage}
                </span>
              </Alert>
            )}
            {success && (
              <Alert color='success'>
                <span>
                  <span className='font-medium'>Success!</span> {successMessage}
                </span>
              </Alert>
            )}
            <div className='grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2'>
              <div>
                <Label htmlFor='domain' value='Domain name:' />
                <TextInput
                  type='url'
                  name='domain'
                  id='domain'
                  placeholder='https://yourdomain.com'
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, domainName: e.target.value })
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
                />
              </div>
              <div>
                <Label htmlFor='domain-registrar' value='Domain registrar:' />
                <TextInput
                  type='text'
                  name='domain-registrar'
                  id='domain-registrar'
                  placeholder='Godady, namecheap, hostinger etc'
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      domainRegistrar: e.target.value,
                    })
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
                />
              </div>
              <div>
                <Label htmlFor='username' value='Username/Email:' />
                <TextInput
                  type='text'
                  name='username'
                  id='username'
                  placeholder='Your cloudflare username or email'
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, domainUsername: e.target.value })
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
                />
              </div>
              <div>
                <Label htmlFor='password' value='Password:' />
                <TextInput
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Your cloudflare password'
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, domainPassword: e.target.value })
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
                />
              </div>
            </div>
            <div className='mt-5'>
              <Button
                type='submit'
                color='failure'
                disabled={loading}
                className='w-full flex items-center justify-center'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className='mt-5'>
        <div className='bg-white p-5 rounded-md shadow'>
          <div>
            <h2 className='text-lg font-semibold'>
              Option 2: DNS settings managed by Buyer
            </h2>
            <p className='text-gray-500 text-sm'>
              Add the below nameservers in your DNS setting, your domain will
              only get connected with our server when you add below nameserver
              in your dns setting
            </p>
          </div>
          <div className='bg-gray-100 p-4 rounded-md mt-3'>
            <ul className='list-disc list-inside'>
              <li className='text-gray-600 text-sm'>
                henrik.ns.cloudflare.com
              </li>
              <li className='text-gray-600 text-sm'>ruth.ns.cloudflare.com</li>
              <li className='text-gray-600 text-sm'>
                dorthy.ns.cloudflare.com
              </li>
              <li className='text-gray-600 text-sm'>
                wesley.ns.cloudflare.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
