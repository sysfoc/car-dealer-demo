import { Button } from "flowbite-react";
import Image from "next/image";
import React from "react";

const AddOns = () => {
  const services = [
    {
      id: 1,
      image: "/07.png",
      alt: "Feature 7 - Google Fonts Integration",
      title: "Content Writing",
      description:
        "Sysfoc car dealer provides full of features for creating a perfect Business website. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit optio dicta nihil excepturi magni!",
      price: "$300/month",
    },
    {
      id: 2,
      image: "/08.png",
      alt: "Feature 8 - SEO Optimization",
      title: "SEO Optimization",
      description:
        "Optimize your website for better search rankings and online visibility. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit optio dicta nihil excepturi magni!",
      price: "$500/month",
    },
    {
      id: 3,
      image: "/09.png",
      alt: "Feature 9 - Social Media Marketing",
      title: "Social Media Marketing",
      description:
        "Boost your brand's social presence with targeted campaigns. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit optio dicta nihil excepturi magni!",
      price: "$400/month",
    },
  ];

  return (
    <section className="my-14 py-10 bg-white">
      <div className="mx-4 md:mx-12 py-5 flex items-center justify-center">
        <div className="w-full md:w-[80%]">
          <div className="flex flex-col items-center gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="w-full shadow-md px-8 py-6 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-8 flex-wrap md:flex-nowrap">
                  <div className="w-[80px] h-[80px] flex-shrink-0">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex items-end justify-between flex-wrap md:flex-nowrap gap-5">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="text-gray-500">{service.description}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="px-5 py-2 rounded-md text-sm bg-white">
                        {service.price}
                      </span>
                      <Button size="sm" color="dark">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOns;
