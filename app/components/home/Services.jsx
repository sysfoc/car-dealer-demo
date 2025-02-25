import React from "react";
import {
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { BiLike } from "react-icons/bi";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdBrowserUpdated } from "react-icons/md";
import { HR } from "flowbite-react";
const Services = () => {
  const features = [
    {
      id: 1,
      title: "Regular Updates",
      description:
        "Enjoy free lifetime reliable updates going with your purchase.",
      icon: <MdBrowserUpdated fontSize={30} className="text-white" />,
      bgColor: "bg-red-600",
    },
    {
      id: 2,
      title: "Expansive Knowledge base",
      description: "You can check any time our powerful documentation.",
      icon: <IoDocumentsOutline fontSize={30} className="text-white" />,
      bgColor: "bg-blue-600",
    },
    {
      id: 3,
      title: "Proficient Support",
      description:
        "Enjoy free lifetime reliable updates and six months free support.",
      icon: <BiLike fontSize={30} className="text-white" />,
      bgColor: "bg-green-600",
    },
  ];
  return (
    <section className="my-14 py-10 bg-white">
      <div className="mx-4 md:mx-12 py-5 flex items-center justify-center">
        <div className="text-center w-full md:w-[80%]">
          <h3 className="text-3xl sm:text-4xl font-semibold">
            100% Risk-Free Money Back Guarantee!
          </h3>
          <p className="my-4 text-gray-500 leading-7 tracking-wide">
            Our #1 priority is your happiness. Which means we stand by our
            products 100%, no matter what, no questions asked, no hold barred,
            no ifs, no buts. If you don't like your investment over the next 14
            days, just reach out to our Customer Happiness Team, and we will
            happily refund 100% of your purchase. Happiness. Guaranteed.
          </p>
          <div className="flex items-center justify-center my-3">
            <div className="flex items-center gap-6">
              <FaCcPaypal fontSize={40} className="text-gray-500" />
              <FaCcStripe fontSize={40} className="text-gray-500" />
              <FaCcVisa fontSize={40} className="text-gray-500" />
              <FaCcMastercard fontSize={40} className="text-gray-500" />
              <SiAmericanexpress fontSize={35} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <HR className="my-3 mx-4 md:mx-12" />
      <div className="my-6 mx-4 md:mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="group p-5 rounded-lg shadow-md">
              <div className="flex items-center justify-center">
                <div
                  className={`transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110 p-4 ${feature.bgColor} rounded-full`}
                >
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-xl font-semibold text-center mt-3 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-500 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
