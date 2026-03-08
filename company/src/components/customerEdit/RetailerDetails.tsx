import React, { useState, useRef, type ChangeEvent } from "react";
import { FiEdit } from "react-icons/fi"; // pencil icon

interface RetailerData {
  activateBy: string;
  activateOn: string;
  location: string;
  retailerId: string;
}

const RetailerDetails: React.FC = () => {
  // example old data (replace with real data from API)
  const [formData, setFormData] = useState<RetailerData>({
    activateBy: "Admin",
    activateOn: "2025-10-01",
    location: "Kolkata",
    retailerId: "RT12345",
  });

  const activateByRef = useRef<HTMLInputElement | null>(null);
  const activateOnRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const retailerIdRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Retailer Details:", formData);
    // send to API/backend
  };

  return (
    <div className="w-full   flex items-center justify-center bg-gray-100 p-6 dark:bg-gray-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 space-y-6 dark:bg-gray-800"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center dark:text-gray-200">
          Retailer Details
        </h2>

        {/* Activate By */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700  dark:text-gray-200">
            Activate By
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => activateByRef.current?.focus()}
          />
          <input
            ref={activateByRef}
            name="activateBy"
            type="text"
            value={formData.activateBy}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-300"
          />
        </div>

        {/* Activate On */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700  dark:text-gray-200">
            Activate On
          </label>
          {/* <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => activateOnRef.current?.focus()}
          /> */}
          <input
            ref={activateOnRef}
            name="activateOn"
            type="date"
            value={formData.activateOn}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-300"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700  dark:text-gray-200">
            State
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => locationRef.current?.focus()}
          />
          <input
            ref={locationRef}
            name="state"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-300"
          />
        </div>
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700  dark:text-gray-200">
            Location
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => locationRef.current?.focus()}
          />
          <input
            ref={locationRef}
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-300"
          />
        </div>

        {/* Retailer ID */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700  dark:text-gray-200">
            Retailer ID
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => retailerIdRef.current?.focus()}
          />
          <input
            ref={retailerIdRef}
            name="retailerId"
            type="text"
            value={formData.retailerId}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-300"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-lg w-full hover:bg-indigo-700 transition"
        >
          Save Retailer Details
        </button>
      </form>
    </div>
  );
};

export default RetailerDetails;