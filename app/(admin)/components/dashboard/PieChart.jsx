"use client";
import React from "react";
import { Chart } from "react-google-charts";
const PieChart = () => {
  const data = [
    ["Vehicals", "Sales Over Months"],
    ["Corolla", 9],
    ["Honda", 6],
    ["Suzuki", 2],
    ["Alto", 2],
  ];

  const options = {
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "gray",
        fontSize: 14,
      },
    },
    colors: ["#0DCAF0", "#FD3550", "#15CA20", "#FA7123"],
  };
  return (
    <div className='bg-white shadow relative'>
      <p className='absolute top-3 left-5 z-10 text-gray-500'>
        Trending Vehicals
      </p>
      <Chart
        chartType='PieChart'
        data={data}
        options={options}
        width={300}
        height={380}
      />
    </div>
  );
};

export default PieChart;
