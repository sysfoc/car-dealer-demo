"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { faqs } from "@/lib/faqs/faq";
import { FaPlus, FaMinus } from "react-icons/fa6";
const faqsContent = () => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleCategory = (index) => {
    setOpenCategoryIndex((prev) => (prev === index ? null : index));
  };

  const toggleQuestion = (catIndex, qIndex) => {
    const key = `${catIndex}-${qIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <section className='dark:bg-gray-900 my-10'>
      <div>
        <h1 className='text-center text-3xl font-bold text-gray-800 dark:text-white'>
          Frequently Asked Questions (FAQ)
        </h1>
      </div>

      <div className='mt-10 mx-auto w-full md:w-[90%] flex flex-col gap-4 px-4'>
        {faqs.map((faq, catIndex) => {
          const isCategoryOpen = openCategoryIndex === catIndex;
          return (
            <div
              key={catIndex}
              className='border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden'
            >
              <div
                className='flex items-center justify-between gap-4 bg-white px-6 py-5 dark:bg-gray-800 cursor-pointer'
                onClick={() => toggleCategory(catIndex)}
              >
                <h2 className='text-lg md:text-[22px] font-semibold text-gray-900 dark:text-white'>
                  {faq.categoryHeader}
                </h2>
                <div className='flex flex-row gap-3'>
                  <div>
                    <span className='bg-[#fa7123] whitespace-nowrap text-white text-xs font-medium px-2.5 py-1.5 rounded'>
                      {faq.category}
                    </span>
                  </div>
                  <div>
                    <IoIosArrowDown
                      fontSize={24}
                      className={`transition-transform duration-300 ${
                        isCategoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out px-3 md:px-6 border-t bg-white/80 dark:bg-gray-800 ${
                  isCategoryOpen
                    ? "opacity-100 max-h-[1000px] py-5"
                    : "opacity-0 max-h-0 py-0"
                }`}
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {faq.questions.map((question, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isQuestionOpen = openQuestions[key];

                    return (
                      <div key={key} className='transition-all'>
                        <div
                          className='flex justify-between p-3 gap-3 cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md'
                          onClick={() => toggleQuestion(catIndex, qIndex)}
                        >
                          <h3 className='md:text-lg font-semibold text-gray-900 dark:text-white'>
                            {question.question}
                          </h3>
                          <div>
                            {isQuestionOpen ? (
                              <FaMinus
                                fontSize={16}
                                className='mt-1 text-gray-700 dark:text-gray-300'
                              />
                            ) : (
                              <FaPlus
                                fontSize={16}
                                className='mt-1 text-gray-700 dark:text-gray-300'
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className={`transition-all duration-300 ease-in-out border-x border-b border-gray-200 rounded-b-md dark:border-gray-700 px-3 ${
                            isQuestionOpen
                              ? "opacity-100 max-h-[500px]"
                              : "opacity-0 max-h-0 overflow-hidden"
                          }`}
                        >
                          {question.answer.split("\n\n").map((block, idx) => {
                            const isBullet =
                              idx > 0 &&
                              (block.includes(":") || block.length > 30);
                            return isBullet ? (
                              <ul key={idx} className='list-inside'>
                                <li className='ml-5 list-disc text-gray-600 dark:text-gray-400'>
                                  {block}
                                </li>
                              </ul>
                            ) : (
                              <p
                                key={idx}
                                className='py-3 text-gray-600 dark:text-gray-400 mb-2'
                              >
                                {block}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default faqsContent;
