import React from "react";

const Statistics = () => {
  return (
    <div className="w-full p-4 bg-white shadow">
      <div>
        <div>
          <h2 className="font-semibold text-gray-600">Subsciption Overview</h2>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Plan:</p>
            <p className="text-sm text-gray-500">Billing Period:</p>
            <p className="text-sm text-gray-500">No of Sessions:</p>
            <p className="text-sm text-gray-500">Effective Date:</p>
            <p className="text-sm text-gray-500">Next Billing Date:</p>
          </div>
          <div className="flex flex-col text-end">
            <strong className="text-sm">Basic</strong>
            <strong className="text-sm">Monthly</strong>
            <strong className="text-sm">4</strong>
            <strong className="text-sm">01-01-2022</strong>
            <strong className="text-sm">01-08-2022</strong>
          </div>
        </div>
        <div className="my-3">
          <h2 className="font-semibold text-gray-600">Usage Limit</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">No of Listings Allowed:</p>
            <p className="text-sm text-gray-500">Posted Listings:</p>
            <p className="text-sm text-gray-500">Add-ons:</p>
            <p className="text-sm text-gray-500">Storage Used:</p>
          </div>
          <div className="flex flex-col text-end">
            <strong className="text-sm">30</strong>
            <strong className="text-sm">23</strong>
            <strong className="text-sm">In Working</strong>
            <strong className="text-sm">10gb/month</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
