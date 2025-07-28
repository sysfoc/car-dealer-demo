"use client";
import { Alert, Button, Label, Textarea, TextInput } from "flowbite-react";
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
  const [customDomainSuccess, setCustomDomainSuccess] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customDomain, setCustomDomain] = useState("");
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
  const handleCustomDomain = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/domain/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customDomain }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setLoading(false);
        setError(false);
        setCustomDomainSuccess(data.message);
        setCustomDomain("");
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
        <h1 className='text-2xl font-bold'>
          Domain setup options for your Car Dealer website
        </h1>
        <p className='text-gray-500 text-sm'>
          Please choose one of the following domain setup options so we can
          proceed with launching your car dealer website.
        </p>
      </div>
      <div className='mt-5'>
        <h2 className='bg-gray-100 px-3 py-4 rounded-t-md border border-gray-200 text-lg font-semibold'>
          Option 1: Let us setup a new Domain for you
        </h2>
        <div className='bg-white p-5 rounded-b-md shadow'>
          <div>
            <p className='text-gray-500 text-sm'>
              If you don&apos;t have a domain, no worries! just suggest few
              domain names you would like, and we will handle the registration
              process for you.
            </p>
          </div>
          <div className='p-2 rounded-md mt-2'>
            <h3 className='font-semibold'>Important Notes:</h3>
            <ul className='my-2 flex flex-col gap-1 list-disc list-inside'>
              <li className='text-gray-600 text-sm'>
                Additional charges may apply for domain purchase and
                registration process.
              </li>
              <li className='text-gray-600 text-sm'>
                We will check availablity and register it on your behalf.
              </li>
              <li className='text-gray-600 text-sm'>
                Tip: Keep it short, Brandable and easy to remember.
              </li>
            </ul>
          </div>
          <form onSubmit={handleCustomDomain}>
            {customDomainSuccess && (
              <Alert color='success'>
                <span>
                  <span className='font-medium'>Success!</span>{" "}
                  {customDomainSuccess}
                </span>
              </Alert>
            )}
            <div>
              <Textarea
                rows={4}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder='xyzcars.com, auscars.com, myusedcars.com'
                className='mt-3'
              />
            </div>
            <div className='mt-4'>
              <Button
                type='submit'
                color='failure'
                disabled={loading}
                className='w-full cursor-pointer'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className='mt-5'>
        <h2 className='bg-gray-100 p-4 rounded-t-md border border-gray-200 text-lg font-semibold'>
          Option 2: Use your existing domain (Cloudflare DNS setup)
        </h2>
        <div className='bg-white p-5 rounded-b-md shadow'>
          <p className='text-gray-500 text-sm'>
            If you already own a Domain and want our developers to configure it
            via <strong>Cloudflare</strong>, Please fill out the details below
          </p>
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
                <Label htmlFor='domain' value='Domain Name:' />
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
                <Label htmlFor='domain-registrar' value='Domain Registrar:' />
                <TextInput
                  type='text'
                  name='domain-registrar'
                  id='domain-registrar'
                  placeholder='Godady, Namecheap, Hostinger etc'
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
                <Label
                  htmlFor='username'
                  value='Username/Email for Registrar:'
                />
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
                  placeholder='Your domain login password'
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
              <p className='mt-2 text-gray-500 text-sm'>
                <strong>Note: </strong>Your credentials are kept strictly
                confidential and only used for initial DNS setup. You may change
                your password after setup.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
