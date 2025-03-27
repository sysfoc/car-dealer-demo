"use client";
import { Card, Button } from "flowbite-react";

export default function TrialStatus() {
  return (
    <div className="max-w-md mx-auto my-5">
      <Card className="p-4 shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Trial Status</h2>
        <p className="text-gray-600 mt-2">
          You have <strong>14</strong> days remaining in your free trial.
        </p>
        <p className="text-gray-700 mt-2">
          Upgrade now to unlock exclusive premium features, including advanced
          analytics, priority support, and more.
        </p>
        <Button
          color="blue"
          className="w-full"
          onClick={() => alert("Redirecting to upgrade page...")}
        >
          Upgrade to Premium
        </Button>
      </Card>
    </div>
  );
}
