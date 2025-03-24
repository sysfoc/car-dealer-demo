"use client";
import React from "react";
import { Chart } from "react-google-charts";
const BarChart = () => {
  const data = [
    ["Weeks", "Clicks", "Impressions", "New Users", "Page Views"],
    ["Mon", 1000, 300, 700, 650],
    ["Tue", 800, 500, 880, 400],
    ["Wed", 700, 650, 800, 500],
    ["Thur", 880, 400, 450, 300],
    ["Fri", 400, 500, 600, 800],
    ["Sat", 600, 800, 450, 300],
    ["Sun", 450, 300, 600, 800],
  ];

  const options = {
    isStacked: true,
    chart: {
      title: "Website Metrics",
      subtitle: "Website Statistics over the whole week",
    },
    vAxis: {
      title: "Sales",
      minValue: 0,
      maxValue: 1000,
      gridlines: { count: 10 },
    },
    colors: ["#9491F6", "#EA96FF", "#5396FC", "#FA7123"],
    hAxis: { title: "Purchases" },
  };
  return (
    <div className="p-4 bg-white shadow">
      <Chart
        chartType="Bar"
        data={data}
        options={options}
        width={630}
        height={350}
      />
    </div>
  );
};

export default BarChart;
