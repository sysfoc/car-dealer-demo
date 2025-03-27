"use client";
import { Card, ToggleSwitch, Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function Addons() {
  const [addons, setAddons] = useState({
    extraListings: false,
    premiumSupport: false,
    advancedAnalytics: false,
    priorityCustomerService: false,
    marketingBoost: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState("");

  const toggleAddon = (addon) => {
    if (addon === "priorityCustomerService" || addon === "marketingBoost") {
      setSelectedAddon(addon);
      setIsModalOpen(true);
    } else {
      setAddons((prev) => ({ ...prev, [addon]: !prev[addon] }));
    }
  };

  const handleSaveChanges = () => {
    alert("Your add-on preferences have been updated.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900">Manage Add-Ons</h2>
        <p className="text-gray-600 mt-2">
          Enable or disable add-ons for additional features.
        </p>

        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-800">
              Additional Car Listings
            </span>
            <ToggleSwitch
              checked={addons.extraListings}
              onChange={() => toggleAddon("extraListings")}
            />
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-800">Premium Support</span>
            <ToggleSwitch
              checked={addons.premiumSupport}
              onChange={() => toggleAddon("premiumSupport")}
            />
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-800">
              Advanced Analytics
            </span>
            <ToggleSwitch
              checked={addons.advancedAnalytics}
              onChange={() => toggleAddon("advancedAnalytics")}
            />
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-800">
              Priority Customer Service
            </span>
            <ToggleSwitch
              checked={addons.priorityCustomerService}
              onChange={() => toggleAddon("priorityCustomerService")}
            />
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-800">Marketing Boost</span>
            <ToggleSwitch
              checked={addons.marketingBoost}
              onChange={() => toggleAddon("marketingBoost")}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </Card>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} popup>
        <Modal.Header>Upgrade Required</Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            The <strong>{selectedAddon.replace(/([A-Z])/g, " $1")}</strong>{" "}
            add-on is available only with an upgraded plan. Upgrade now to
            access this feature.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => alert("Redirecting to upgrade page...")}
          >
            Upgrade Plan
          </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
