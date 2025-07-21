import React from "react";

const ContentWritting = () => {
  return (
    <div>
      <h3 className='font-semibold text-lg'>What is Included?</h3>
      <ul className='list-disc list-inside my-2'>
        <li>
          <span>Vehicle Descriptions</span>- 10 listings/month – 100–150 words
          each
        </li>
        <li>
          <span>Blog Posts</span>- 10 articles/month – 600–800 words each (e.g.,
          buying tips, car care guides)
        </li>
        <li>
          <span>1 Landing Page</span>- Optimized for promotions or lead
          generation – up to 500 words{" "}
        </li>
      </ul>
      <h4 className='font-semibold text-lg'>Bonus for Car Dealers: </h4>
      <ul className='list-disc list-inside my-2'>
        <li>Automotive-focused tone</li>
        <li>Lead-driven writing</li>
        <li>Optimized for buyer intent</li>
      </ul>
      <h4 className='font-semibold text-lg'>Why It Works: </h4>
      <ul className='list-disc list-inside my-2'>
        <li>Improves SEO & trust</li>
        <li>Converts traffic into leads </li>
        <li>Done-for-you — no extra work on your end </li>
      </ul>
      <strong>Let your content do the selling. </strong>
    </div>
  );
};

export default ContentWritting;
