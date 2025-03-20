import React from "react";
import { FaShoppingCart, FaWallet, FaUserFriends } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const cardData = [
  {
    title: "Website Visits",
    value: "215.2k",
    percentage: "+10% Increase",
    borderColor: "#9491F6",
    bgColor: "#9491F6",
    icon: <FaShoppingCart fontSize={24} className="text-white" />,
    textColor: "text-[#9491F6]",
  },
  {
    title: "New Registers",
    value: "35.3k",
    percentage: "+15% Increase",
    borderColor: "#EA96FF",
    bgColor: "#EA96FF",
    icon: <FaWallet fontSize={24} className="text-white" />,
    textColor: "text-[#EA96FF]",
  },
  {
    title: "Clicks",
    value: "4,500",
    percentage: "+4.5% from last week",
    borderColor: "#5396FC",
    bgColor: "#5396FC",
    icon: <IoIosStats fontSize={24} className="text-white" />,
    textColor: "text-[#5396FC]",
  },
  {
    title: "Impressions",
    value: "12,000",
    percentage: "-8.4% in 30 Days",
    borderColor: "#FA7123",
    bgColor: "#FA7123",
    icon: <FaUserFriends fontSize={24} className="text-white" />,
    textColor: "text-[#FA7123]",
  },
];

const Overview = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`p-4 border-l-4 bg-white shadow rounded-lg`}
            style={{ borderColor: card.borderColor }}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-gray-600 text-sm">{card.title}</h2>
                <p className={`my-1 text-2xl font-semibold ${card.textColor}`}>
                  {card.value}
                </p>
                <p className="text-xs">{card.percentage}</p>
              </div>
              <div>
                <div
                  className="p-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: card.bgColor }}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
