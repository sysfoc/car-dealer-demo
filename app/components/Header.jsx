"use client";
import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { BiPurchaseTag } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Sysfoc-cars-dealer"
            width={100}
            height={50}
            style={{ objectPosition: "center" }}
            className="size-auto"
            priority={true}
          />
        </Link>
        <div className="flex items-center gap-5 md:hidden">
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Home
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/pricing"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Pricing
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/add-ons"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Add-ons
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Contact Sales
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950"
          >
            <Link
              href="/register"
              className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              Create an account
            </Link>
          </NavbarLink>
          <NavbarLink
            as={"div"}
            className="relative hover:text-blue-950 md:hover:text-blue-950 md:hidden"
          >
            <Link href="#">
              <Button size="md" className="w-full bg-red-600 hover:!bg-red-700">
                Get Started
                <BiPurchaseTag fontSize={18} className="ml-2" />
              </Button>
            </Link>
          </NavbarLink>
        </NavbarCollapse>
        <div className="hidden md:flex items-center gap-5">
          <Button size="sm" className="bg-red-600 hover:!bg-red-700">
            Get Started
            <BiPurchaseTag fontSize={18} className="ml-2" />
          </Button>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
