"use client";
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  ToggleSwitch,
} from "flowbite-react";
import { FaCheck } from "react-icons/fa";

export default function Home() {
  const [switch1, setSwitch1] = useState(false);
  return (
    <section className='mx-4 my-10 sm:mx-8'>
      <div className='text-center'>
        <div className='mt-5'>
          <h1 className='text-2xl font-bold md:text-4xl'>
            Simple Pricing, Unbeatable Value
          </h1>
          <p className='mt-3 text-center'>Join 1000+ Happy Users</p>
        </div>
      </div>
      <div className='my-8 flex items-center justify-center'>
        <div className='rounded-lg border-t-4 bg-white border-red-600 p-8 shadow-md'>
          <div className='w-full sm:w-[320px]'>
            <h2 className='text-center'>Subscription Term</h2>
            <div className='flex items-center justify-center'>
              <div className='mt-4 flex flex-row items-center gap-5'>
                <p className='text-sm'>Monthly</p>
                <ToggleSwitch
                  label='Annual'
                  color='red'
                  checked={switch1}
                  onChange={setSwitch1}
                  sizing='sm'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='my-20'>
        <div className='w-full overflow-x-scroll md:overflow-hidden shadow rounded-lg'>
          <Table striped className='min-w-[700px] md:w-full table-fixed'>
            <TableHead className='text-center'>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Features</h2>
                </div>
              </TableHeadCell>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Basic</h2>
                  <h3 className='text-lg'>
                    ($99.<sup>99</sup>
                    <sub className='text-xs font-normal'>/month</sub>)
                  </h3>
                </div>
              </TableHeadCell>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Standard</h2>
                  <h3 className='text-lg'>
                    ($249.<sup>99</sup>
                    <sub className='text-xs font-normal'>/month</sub>)
                  </h3>
                </div>
              </TableHeadCell>
              <TableHeadCell>
                <div>
                  <h2 className='text-xl'>Premium</h2>
                  <h3 className='text-lg'>
                    ($499.<sup>99</sup>
                    <sub className='text-xs font-normal'>/month</sub>)
                  </h3>
                </div>
              </TableHeadCell>
            </TableHead>
            <TableBody className='text-left'>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Hard Disk Limit</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>10 GB</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>25 GB</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>50 GB</b>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Car Listing Limit</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>30 cars</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>200 cars</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Unlimited</b>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Number of Videos</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>15</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Unlimited</b>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>User Accounts</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Upto 2</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Upto 5</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Upto 10</b>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Email Accounts</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Upto 2</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Upto 5</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Upto 10</b>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Fully Operational Website</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Responsive Design</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Basic SEO Optimization</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Advanced SEO Tools</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Email & Chat Support</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>24 hour</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>12 hour</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>12 hour</b>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Phone Support </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Basic Customization</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Car Leasing</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Car Finance</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Website Backups</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Monthly</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Weekly</b>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <b>Daily</b>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Migration</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Performance Optimization</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Third-Party Integrations</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div>
                    <p className='text-sm'>Dedicated Account Manager</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <FaCheck fontSize='25' />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='w-min bg-white'>
                <TableCell>
                  <div></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <Button color='dark' className='w-full uppercase'>
                      Buy Basic
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <Button color='dark' className='w-full uppercase'>
                      Buy Standard
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <Button color='dark' className='w-full uppercase'>
                      Buy Premium
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
