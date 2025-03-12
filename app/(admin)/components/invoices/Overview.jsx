import React from "react";
import {
  FaFileInvoice,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaClipboardCheck,
} from "react-icons/fa";

const cardData = [
  {
    title: "Total Invoice",
    value: "2310",
    borderColor: "#0DCAF0",
    bgColor: "#0DCAF0",
    icon: <FaFileInvoice fontSize={24} className="text-white" />,
    textColor: "text-[#0DCAF0]",
  },
  {
    title: "Pending Invoice",
    value: "1000",
    borderColor: "#FD3550",
    bgColor: "#FD3550",
    icon: <FaFileInvoiceDollar fontSize={24} className="text-white" />,
    textColor: "text-[#FD3550]",
  },
  {
    title: "Paid Invoice",
    value: "1310",
    borderColor: "#15CA20",
    bgColor: "#15CA20",
    icon: <FaClipboardCheck fontSize={24} className="text-white" />,
    textColor: "text-[#15CA20]",
  },
  {
    title: "Inactive Invoice",
    value: "1243",
    borderColor: "#FA7123",
    bgColor: "#FA7123",
    icon: <FaClipboardList fontSize={24} className="text-white" />,
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
