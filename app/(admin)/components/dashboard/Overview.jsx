import React from "react";
import { FaShoppingCart, FaWallet, FaUserFriends } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const cardData = [
  {
    title: "Total Orders",
    value: "4805",
    percentage: "+2.5% from last week",
    borderColor: "#0DCAF0",
    bgColor: "#0DCAF0",
    icon: <FaShoppingCart fontSize={24} className="text-white" />,
    textColor: "text-[#0DCAF0]",
  },
  {
    title: "Total Revenue",
    value: "$84,245",
    percentage: "+5.4% from last week",
    borderColor: "#FD3550",
    bgColor: "#FD3550",
    icon: <FaWallet fontSize={24} className="text-white" />,
    textColor: "text-[#FD3550]",
  },
  {
    title: "Bounce Rate",
    value: "34.6%",
    percentage: "-4.5% from last week",
    borderColor: "#15CA20",
    bgColor: "#15CA20",
    icon: <IoIosStats fontSize={24} className="text-white" />,
    textColor: "text-[#15CA20]",
  },
  {
    title: "Total Customers",
    value: "8.4K",
    percentage: "+8.4% from last week",
    borderColor: "#FA7123",
    bgColor: "#FA7123",
    icon: <FaUserFriends fontSize={24} className="text-white" />,
    textColor: "text-[#FA7123]",
  },
];

const Overview = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
