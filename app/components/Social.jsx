import Image from "next/image";
import Link from "next/link";
import React from "react";

const Social = () => {
  return (
    <div className='fixed bottom-2 right-2 z-50 flex items-center justify-center gap-4 py-2'>
      <div>
        <Link href='https://wa.me/923006904440' target='_blank'>
          <Image
            src={"/whatsapp.png"}
            alt='whatsapp'
            width={50}
            height={50}
            className='cursor-pointer animate-pulse hover:animate-none'
          />
        </Link>
      </div>
    </div>
  );
};

export default Social;
