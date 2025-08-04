"use client";
import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Navbar
        fluid
        className={`sticky inset-x-0 top-0 z-50 shadow-md transition-transform duration-300 dark:bg-gray-700/95 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link href='/'>
          <Image
            src={"/logo.png"}
            alt='automotive-logo'
            width={100}
            height={50}
            style={{ objectPosition: "center" }}
            className='size-auto'
            fetchPriority='high'
            priority={true}
          />
        </Link>
        <div className='flex items-center gap-5 md:hidden'>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink
            as={"div"}
            className='relative hover:text-blue-950 md:hover:text-blue-950'
          >
            <Link
              href='/'
              className='relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e56c16] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
            >
              Home
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className='relative hover:text-blue-950 md:hover:text-blue-950'
          >
            <Link
              href='/pricing'
              className='relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e56c16] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
            >
              Pricing
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className='relative hover:text-blue-950 md:hover:text-blue-950'
          >
            <Link
              href='/add-ons'
              className='relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e56c16] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
            >
              Add-ons
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className='relative hover:text-blue-950 md:hover:text-blue-950'
          >
            <Link
              href='/register'
              className='relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#e56c16] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
            >
              Create an account
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className='relative hover:text-blue-950 md:hover:text-blue-950 md:hidden'
          >
            {currentUser ? (
              <Link href='/user/dashboard'>
                <Button
                  size='md'
                  className='w-full bg-[#fa7123] hover:!bg-[#fa7123]/90'
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href='/login'>
                <Button
                  size='md'
                  className='w-full bg-[#fa7123] hover:!bg-[#fa7123]/90'
                >
                  Login
                </Button>
              </Link>
            )}
          </NavbarLink>
        </NavbarCollapse>
        <div className='hidden md:flex items-center gap-5'>
          {currentUser ? (
            <Link href='/user/dashboard'>
              <Button
                size='md'
                className='w-full bg-[#fa7123] hover:!bg-[#fa7123]/90'
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href='/login'>
              <Button
                size='md'
                className='w-full bg-[#fa7123] hover:!bg-[#fa7123]/90'
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default Header;
