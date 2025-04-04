import React from "react";
import GeoChart from "@/app/(admin)/components/dashboard/GeoChart";
import RevenueChart from "@/app/(admin)/components/dashboard/RevenueChart";

const Statistics = () => {
  return (
    <section className='my-5'>
      <div className='flex flex-wrap md:flex-nowrap items-center gap-4'>
        <GeoChart />
        <RevenueChart />
      </div>
    </section>
  );
};

export default Statistics;
