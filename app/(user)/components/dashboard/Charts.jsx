import React from "react";
import BarChart from "@/app/(user)/components/dashboard/BarChart";
import Statistics from "@/app/(user)/components/dashboard/Statistics";

const Charts = () => {
  return (
    <section className="my-5">
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <BarChart />
        <Statistics />
      </div>
    </section>
  );
};

export default Charts;
