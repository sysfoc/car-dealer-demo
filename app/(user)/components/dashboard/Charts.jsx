import React from "react";
import BarChart from "@/app/(user)/components/dashboard/BarChart";

const Charts = () => {
  return (
    <section className="my-5">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
        <BarChart />
      </div>
    </section>
  );
};

export default Charts;
