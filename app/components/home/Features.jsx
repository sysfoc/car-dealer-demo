import Image from "next/image";
import React from "react";

const Features = () => {
  const features = [
    { id: 1, title: "08 Demos", image: "/01.png", alt: "Feature 1 - 08 Demos" },
    {
      id: 2,
      title: "30+ Inner Pages",
      image: "/02.png",
      alt: "Feature 2 - 30+ Inner Pages",
    },
    {
      id: 3,
      title: "Fully Responsive",
      image: "/03.png",
      alt: "Feature 3 - Fully Responsive",
    },
    {
      id: 4,
      title: "Clean Coded",
      image: "/04.png",
      alt: "Feature 4 - Clean Coded",
    },
    {
      id: 5,
      title: "Modern Swiper Slider",
      image: "/05.png",
      alt: "Feature 5 - Modern Swiper Slider",
    },
    {
      id: 6,
      title: "Cross Browser",
      image: "/06.png",
      alt: "Feature 6 - Cross Browser Support",
    },
    {
      id: 7,
      title: "Google Fonts",
      image: "/07.png",
      alt: "Feature 7 - Google Fonts Integration",
    },
    {
      id: 8,
      title: "Modern Design",
      image: "/08.png",
      alt: "Feature 8 - Modern Design Aesthetics",
    },
    {
      id: 9,
      title: "Easy Customizable",
      image: "/09.png",
      alt: "Feature 9 - Easy Customization",
    },
    {
      id: 10,
      title: "404 Error Page",
      image: "/10.png",
      alt: "Feature 10 - 404 Error Page",
    },
    {
      id: 11,
      title: "Well Documented",
      image: "/11.png",
      alt: "Feature 11 - Well Documented",
    },
    {
      id: 12,
      title: "Ajax Contact Form",
      image: "/12.png",
      alt: "Feature 12 - Ajax Contact Form",
    },
    {
      id: 13,
      title: "24/7 Support",
      image: "/13.png",
      alt: "Feature 13 - 24/7 Support",
    },
  ];
  return (
    <section className="my-14 py-10 bg-white">
      <div className="mx-4 md:mx-12 py-5 flex items-center justify-center">
        <div className="text-center w-full md:w-[50%]">
          <h3 className="text-4xl font-semibold">Core Features</h3>
          <p className="my-2 text-gray-500">
            Sysfoc car dealer provides full of features for creating a perfect
            Business websites.
          </p>
        </div>
      </div>
      <div className="my-6 mx-4 md:mx-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="rounded-md shadow-lg px-3 py-8">
              <div className="flex items-center justify-center">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={60}
                  height={60}
                  className="size-auto transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
                />
              </div>
              <div>
                <h3 className="text-center font-semibold text-gray-500 mt-5">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
