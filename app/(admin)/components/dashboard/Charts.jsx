import React from "react";
import PieChart from "@/app/(admin)/components/dashboard/PieChart";
import BarChart from "@/app/(admin)/components/dashboard/BarChart";

const Charts = () => {
  return (
    <section className="my-5">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
        <BarChart />
        <PieChart />
      </div>
    </section>
  );
};

export default Charts;
