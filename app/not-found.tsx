'use client';
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-6 py-16'>
      <div className='max-w-3xl w-full text-center'>
        <h1 className='text-9xl font-extrabold text-gray-300 dark:text-gray-700 tracking-widest'>
          404
        </h1>
        <div className='bg-blue-500 dark:bg-blue-400 h-1 w-24 mx-auto my-6 rounded-full' />
        <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>
          Oops! Page not found.
        </h2>
        <p className='text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8'>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <div className='mx-auto mb-10 w-64 h-64'>
          <svg
            viewBox='0 0 500 500'
            className='w-full h-full text-gray-400 dark:text-gray-600'
            fill='currentColor'
          >
            <path d='M250,20C117.39,20,10,127.39,10,260s107.39,240,240,240,240-107.39,240-240S382.61,20,250,20Zm0,440c-110.28,0-200-89.72-200-200S139.72,60,250,60s200,89.72,200,200-89.72,200-200,200Z' />
            <circle cx='175' cy='215' r='15' />
            <circle cx='325' cy='215' r='15' />
            <path
              d='M175,325c20-30,80-30,100,0'
              stroke='currentColor'
              strokeWidth='20'
              strokeLinecap='round'
              fill='none'
            />
          </svg>
        </div>
        <button
          onClick={() => router.back()}
          className='inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-md shadow-lg transition'
        >
          Go back
        </button>
      </div>
    </div>
  );
}
