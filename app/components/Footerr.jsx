import React from "react";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const Footerr = () => {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand href="/" src="/logo.png" alt="car-dealer-logo" />
          <Footer.LinkGroup>
            <Footer.Link href="/about">About</Footer.Link>
            <Footer.Link href="/contact">Contact</Footer.Link>
            <Footer.Link href="/faq">FAQ</Footer.Link>
            <Footer.Link href="/terms">Terms</Footer.Link>
            <Footer.Link href="/blogs">Blogs</Footer.Link>
            <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
            <Footer.Link href="/refund-policy">Refund Policy</Footer.Link>
            <Footer.Link href="/cookies">Cookies Policy</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="https://sysfoc.com"
            by="Sysfoc car dealer"
            year={2025}
            
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              aria-label="Facebook"
              title="Facebook"
              target="_blank"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              aria-label="Twitter"
              title="Twitter"
              target="_blank"
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
              aria-label="Github"
              title="Github"
              target="_blank"
            />
            <Footer.Icon
              href="#"
              icon={BsDribbble}
              aria-label="Dribble"
              title="Dribble"
              target="_blank"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footerr;
