import React from "react";

const SocialMedia = () => {
  return (
    <div>
      <h3 className='font-semibold text-lg'>What is Included?</h3>
      <ul className='list-disc list-inside my-2'>
        <li>
          <span className='font-semibold'>Post Content Creation & Design</span>
          <ul className='list-[upper-roman] ml-5 list-inside'>
            <li>
              12–15 high quality posts per month (images, captions & hashtags)
            </li>
            <li>Branded for your dealership, promotions, or services.</li>
          </ul>
        </li>
        <li>
          <span className='font-semibold'>Page Management</span>
          <ul className='list-[upper-roman] ml-5 list-inside'>
            <li>Profile setup or optimization</li>
            <li>Regular posting & page activity monitoring</li>
          </ul>
        </li>
        <li>
          <span className='font-semibold'>Engagement Boosting</span>
          <ul className='list-[upper-roman] ml-5 list-inside'>
            <li>Audience interaction (comments, inbox replies)</li>
            <li>Community building and lead response</li>
          </ul>
        </li>
        <li>
          <span className='font-semibold'>Ad Campaigns (Optional Add-on)</span>
          <ul className='list-[upper-roman] ml-5 list-inside'>
            <li>
              Targeted Facebook & Instagram Ads for inventory, seasonal deals,
              or brand awareness.
            </li>
            <li>
              <i className="text-[#e56c16]">Ad spend is billed separately based on your budget.</i>
            </li>
          </ul>
        </li>
        <li>
          <span className='font-semibold'>Monthly Report</span>
          <ul className='list-[upper-roman] ml-5 list-inside'>
            <li>Overview of reach, engagement, leads, and progress </li>
          </ul>
        </li>
      </ul>
      <h4 className='font-semibold text-lg'>Why It Works: </h4>
      <ul className='list-disc list-inside my-2'>
        <li>Attracts local buyers where they scroll daily</li>
        <li>Builds trust and consistent branding</li>
        <li>Converts followers into real-world customers</li>
        <li>You stay hands-off — we manage everything</li>
      </ul>
      <strong>Get More Customers from Google – Effortlessly.</strong>
    </div>
  );
};

export default SocialMedia;
