import React from "react";
import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsPinterest,
  BsTwitter,
} from "react-icons/bs";

const Footerr = () => {
  return (
    <Footer container>
      <div className='w-full text-center'>
        <div className='w-full justify-between sm:flex sm:items-center sm:justify-between'>
          <Footer.Brand href='/' src='/logo.png' alt='car-dealer-logo' />
          <Footer.LinkGroup className='gap-y-2'>
            <Footer.Link href='/about'>About</Footer.Link>
            <Footer.Link href='/contact'>Contact</Footer.Link>
            <Footer.Link href='/faq'>FAQ</Footer.Link>
            <Footer.Link href='/terms'>Terms</Footer.Link>
            <Footer.Link href='/blogs'>Blogs</Footer.Link>
            <Footer.Link href='/privacy'>Privacy Policy</Footer.Link>
            <Footer.Link href='/refund-policy'>Refund Policy</Footer.Link>
            <Footer.Link href='/cookies'>Cookies Policy</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='https://sysfoc.com'
            by='All rights reserved. AutomotiveWebSolutions by SYSFOC'
            year={2025}
          />
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <Footer.Icon
              href='https://www.facebook.com/people/Automotive-web-solutions/61577244887965/'
              icon={BsFacebook}
              aria-label='Facebook'
              title='Facebook'
              target='_blank'
            />
            <Footer.Icon
              href='https://www.instagram.com/automotivewebsolutions/'
              icon={BsInstagram}
              aria-label='Instagram'
              title='Instagram'
              target='_blank'
            />
            <Footer.Icon
              href='https://x.com/automotive10791'
              icon={BsTwitter}
              aria-label='Twitter'
              title='Twitter'
              target='_blank'
            />
            <Footer.Icon
              href='https://www.pinterest.com/automotivewebsolutions/'
              icon={BsPinterest}
              aria-label='Pinterest'
              title='Pinterest'
              target='_blank'
            />
            <Footer.Icon
              href='https://github.com/sysfoc'
              icon={BsGithub}
              aria-label='Github'
              title='Github'
              target='_blank'
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footerr;
