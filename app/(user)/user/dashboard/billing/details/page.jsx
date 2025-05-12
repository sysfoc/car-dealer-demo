"use client";
import BillingForm from "@/app/(user)/components/billing/BillingForm";
import Statistics from "@/app/(user)/components/dashboard/Statistics";

export default function BillingDetail() {
  return (
    <div className='space-y-6'>
      <Statistics/>
      <BillingForm/>
    </div>
  );
}
