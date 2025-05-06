import { IoClose } from "react-icons/io5";

export default function FailedPayment() {
  return (
    <main className='h-screen p-10'>
      <div>
        <div className='w-[100px] h-[100px] mx-auto flex items-center justify-center p-4 rounded-full bg-red-600'>
          <IoClose size={70} color='white' />
        </div>
        <div className='mt-4 text-center flex flex-col gap-1'>
          <h1 className='text-3xl font-bold text-gray-700'>
            Your payment Failed
          </h1>
          <p className='text-lg font-semibold text-gray-400'>
            Please try again
          </p>
        </div>
      </div>
    </main>
  );
}
