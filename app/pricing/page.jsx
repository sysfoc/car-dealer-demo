"use client";
import React, { useState } from "react";
import { Button, Radio, ToggleSwitch } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCelebration } from "react-icons/md";

export default function Home() {
  const [switch1, setSwitch1] = useState(false);
  return (
    <section className="mx-4 my-10 sm:mx-8">
      <div className="text-center">
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-blue-950 md:text-4xl">
            Simple Pricing, Unbeatable Value
          </h1>
          <p className="mt-3 text-center">Join 1,894,082+ Happy Users</p>
        </div>
      </div>
      <div className="my-8 flex items-center justify-center">
        <div className="rounded-lg border-t-4 border-blue-950 p-8 shadow-md">
          <div className="w-full sm:w-[320px]">
            <h2 className="text-center">Subscription Term</h2>
            <div className="flex items-center justify-center">
              <div className="mt-4 flex flex-row items-center gap-5">
                <p className="text-sm">Monthly</p>
                <ToggleSwitch
                  label="Annual"
                  checked={switch1}
                  onChange={setSwitch1}
                  sizing="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border-t-4 border-blue-950 p-5 shadow-md">
            <div>
              <h3 className="text-xl font-semibold">Basic Plan</h3>
              <p className="mt-1 text-sm">
                Build beautiful website faster with advanced features and
                complete design control.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <strong className="text-4xl">$49</strong>
                <span className="text-sm">Normally $59 (Save 17% )</span>
              </div>
              <div className="flex flex-col">
                <Button className="mt-4 w-full rounded-full bg-blue-950 py-2 text-white">
                  Purchase Basic Plan
                </Button>
              </div>
            </div>
            <div className="mt-5">
              <div>
                <span className="text-lg font-semibold">
                  Basic Plan Includes:
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Unparalleled Flexibility</h4>
                    <p className="mt-1 text-sm">
                      Shape your website effortlessly with hundreds of
                      customization controls — header, footer, sidebars, menus,
                      and more.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Various Built-in Layouts</h4>
                    <p className="mt-1 text-sm">
                      Choose from a wide range of built-in layouts for your
                      blog, portfolio, and shop pages, with the flexibility to
                      assign different layouts to various post listings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Modern Woo Stores</h4>
                    <p className="mt-1 text-sm">
                      Effortlessly build versatile shop, single-product layouts,
                      and stunning checkout forms for an exceptional customer
                      experience that drives sales.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Site Builder</h4>
                    <p className="mt-1 text-sm">
                      Design custom headers, footers, single pages, posts,
                      archives, and WooCommerce pages effortlessly, without any
                      coding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border-t-4 border-blue-950 p-5 shadow-md">
            <div>
              <h3 className="text-xl font-semibold">Essential Toolkit</h3>
              <p className="mt-1 text-sm">
                Build beautiful website faster with advanced features and
                complete design control.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <strong className="text-4xl">$49</strong>
                <span className="text-sm">Normally $59 (Save 17% )</span>
              </div>
              <div className="flex flex-col">
                <Button className="mt-4 w-full rounded-full bg-blue-950 py-2 text-white">
                  Purchase Basic Plan
                </Button>
              </div>
            </div>
            <div className="mt-5">
              <div>
                <span className="text-lg font-semibold">
                  Basic Plan Includes:
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Unparalleled Flexibility</h4>
                    <p className="mt-1 text-sm">
                      Shape your website effortlessly with hundreds of
                      customization controls — header, footer, sidebars, menus,
                      and more.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Various Built-in Layouts</h4>
                    <p className="mt-1 text-sm">
                      Choose from a wide range of built-in layouts for your
                      blog, portfolio, and shop pages, with the flexibility to
                      assign different layouts to various post listings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Modern Woo Stores</h4>
                    <p className="mt-1 text-sm">
                      Effortlessly build versatile shop, single-product layouts,
                      and stunning checkout forms for an exceptional customer
                      experience that drives sales.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="py-1">
                    <FaCheckCircle className="mr-1 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Site Builder</h4>
                    <p className="mt-1 text-sm">
                      Design custom headers, footers, single pages, posts,
                      archives, and WooCommerce pages effortlessly, without any
                      coding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-md">
            <div className="rounded-t-lg bg-blue-950 p-2 text-white">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <MdOutlineCelebration fontSize={18} className="text-white" />
                  <p className="text-center text-sm">Most Popular</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div>
                <h3 className="text-xl font-semibold">Business Toolkit</h3>
                <p className="mt-1 text-sm">
                  Build beautiful website faster with advanced features and
                  complete design control.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <strong className="text-4xl">$49</strong>
                  <span className="text-sm">Normally $59 (Save 17% )</span>
                </div>
                <div className="flex flex-col">
                  <Button className="mt-4 w-full rounded-full bg-blue-950 py-2 text-white">
                    Purchase Basic Plan
                  </Button>
                </div>
              </div>
              <div className="mt-5">
                <div>
                  <span className="text-lg font-semibold">
                    Basic Plan Includes:
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <div className="py-1">
                      <FaCheckCircle className="mr-1 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Unparalleled Flexibility
                      </h4>
                      <p className="mt-1 text-sm">
                        Shape your website effortlessly with hundreds of
                        customization controls — header, footer, sidebars,
                        menus, and more.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="py-1">
                      <FaCheckCircle className="mr-1 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Various Built-in Layouts
                      </h4>
                      <p className="mt-1 text-sm">
                        Choose from a wide range of built-in layouts for your
                        blog, portfolio, and shop pages, with the flexibility to
                        assign different layouts to various post listings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="py-1">
                      <FaCheckCircle className="mr-1 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Modern Woo Stores</h4>
                      <p className="mt-1 text-sm">
                        Effortlessly build versatile shop, single-product
                        layouts, and stunning checkout forms for an exceptional
                        customer experience that drives sales.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="py-1">
                      <FaCheckCircle className="mr-1 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Site Builder</h4>
                      <p className="mt-1 text-sm">
                        Design custom headers, footers, single pages, posts,
                        archives, and WooCommerce pages effortlessly, without
                        any coding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
