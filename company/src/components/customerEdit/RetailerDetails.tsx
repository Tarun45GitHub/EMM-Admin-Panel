import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { FiEdit, FiUserCheck, FiCalendar, FiMapPin, FiTag, FiSave } from "react-icons/fi";

interface RetailerData {
  activateBy: string;
  activateOn: string;
  state: string;
  location: string;
  retailerId: string;
}

interface Props {
  customer: any;
}

const RetailerDetails: React.FC<Props> = ({ customer }) => {
  const [formData, setFormData] = useState<RetailerData>({
    activateBy: "",
    activateOn: "",
    state: "",
    location: "",
    retailerId: "",
  });

  // Update form data when customer prop is loaded
  useEffect(() => {
    if (customer) {
      setFormData({
        activateBy: customer.activated_by || "N/A",
        // Format date string if necessary for the date input (YYYY-MM-DD)
        activateOn: customer.created_at ? new Date(customer.created_at).toISOString().split('T')[0] : "",
        state: customer.state || "",
        location: customer.location || customer.address || "",
        retailerId: customer.retailer_id || "",
      });
    }
  }, [customer]);

  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({
    activateBy: false,
    activateOn: false,
    state: false,
    location: false,
    retailerId: false,
  });

  const activateByRef = useRef<HTMLInputElement | null>(null);
  const activateOnRef = useRef<HTMLInputElement | null>(null);
  const stateRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const retailerIdRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (field: string) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Retailer Details:", formData);
    // send to API/backend
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
            <FiUserCheck className="w-6 h-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Retailer Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage retailer activation and location details
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Activation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Activated By
            </label>
            <div className="relative">
              <input
                ref={activateByRef}
                name="activateBy"
                type="text"
                value={formData.activateBy}
                onChange={handleChange}
                disabled={!isEditing.activateBy}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="Admin name"
              />
              <button
                type="button"
                onClick={() => handleEditClick('activateBy')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Activation Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={activateOnRef}
                name="activateOn"
                type="date"
                value={formData.activateOn}
                onChange={handleChange}
                disabled={!isEditing.activateOn}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => handleEditClick('activateOn')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={stateRef}
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                disabled={!isEditing.state}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="State name"
              />
              <button
                type="button"
                onClick={() => handleEditClick('state')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={locationRef}
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing.location}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="City/Town name"
              />
              <button
                type="button"
                onClick={() => handleEditClick('location')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Retailer ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Retailer ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiTag className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={retailerIdRef}
              name="retailerId"
              type="text"
              value={formData.retailerId}
              onChange={handleChange}
              disabled={!isEditing.retailerId}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="RT12345"
            />
            <button
              type="button"
              onClick={() => handleEditClick('retailerId')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <FiEdit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FiSave className="w-4 h-4 mr-2 inline" />
            Save Retailer Details
          </button>
          <button
            type="button"
            onClick={() => {
              // Reset form
              setFormData({
                activateBy: "Admin",
                activateOn: "2025-10-01",
                state: "West Bengal",
                location: "Kolkata",
                retailerId: "RT12345",
              });
              setIsEditing({
                activateBy: false,
                activateOn: false,
                state: false,
                location: false,
                retailerId: false,
              });
            }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default RetailerDetails;