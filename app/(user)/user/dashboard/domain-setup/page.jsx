import { Button, Label, TextInput } from "flowbite-react";

export default function DomainSetup() {
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
          <form className='mt-3'>
            <div className='grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2'>
              <div>
                <Label htmlFor='domain' value='Domain name:' />
                <TextInput
                  type='url'
                  name='domain'
                  id='domain'
                  placeholder='https://yourdomain.com'
                  required
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
                  className='block w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
                />
              </div>
            </div>
            <div className='mt-5'>
              <Button
                type='submit'
                color='failure'
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
