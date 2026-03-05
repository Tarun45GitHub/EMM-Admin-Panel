import React, { useState, useRef, type ChangeEvent } from "react";
import { FiEdit } from "react-icons/fi";

interface DeviceData {
  modelName: string;
  imei1: string;
  imei2: string;
  simDetails: string;
  secretCode: string;
  status: string;
  actualStatus: string;
}

const DeviceDetails: React.FC = () => {
  // Example initial values (replace these with data fetched from API/backend)
  const [formData, setFormData] = useState<DeviceData>({
    modelName: "Galaxy S22",
    imei1: "123456789012345",
    imei2: "543210987654321",
    simDetails: "Dual SIM 4G",
    secretCode: "XYZ123",
    status: "Active",
    actualStatus: "In Use",
  });

  const refs = {
    modelName: useRef<HTMLInputElement | null>(null),
    imei1: useRef<HTMLInputElement | null>(null),
    imei2: useRef<HTMLInputElement | null>(null),
    simDetails: useRef<HTMLInputElement | null>(null),
    secretCode: useRef<HTMLInputElement | null>(null),
    status: useRef<HTMLInputElement | null>(null),
    actualStatus: useRef<HTMLInputElement | null>(null),
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Device Data:", formData);
    // TODO: send to API/backend
  };

  return (
    <div className="md:w-  flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Device Details
        </h2>

        {/* Model Name */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            Model Name
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => refs.modelName.current?.focus()}
          />
          <input
            ref={refs.modelName}
            name="modelName"
            type="text"
            value={formData.modelName}
            onChange={handleChange}
            className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* IMEI1 */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            IMEI 1
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => refs.imei1.current?.focus()}
          />
          <input
            ref={refs.imei1}
            name="imei1"
            type="text"
            value={formData.imei1}
            onChange={handleChange}
            className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* IMEI2 */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            IMEI 2
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => refs.imei2.current?.focus()}
          />
          <input
            ref={refs.imei2}
            name="imei2"
            type="text"
            value={formData.imei2}
            onChange={handleChange}
            className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* SIM Details */}
        <div className="relative">
          <label className="block  font-medium text-gray-700">
            SIM Details
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => refs.simDetails.current?.focus()}
          />
          <input
            ref={refs.simDetails}
            name="simDetails"
            type="text"
            value={formData.simDetails}
            onChange={handleChange}
            className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Secret Code */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            Secret Code
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => refs.secretCode.current?.focus()}
          />
          <input
            ref={refs.secretCode}
            name="secretCode"
            type="text"
            value={formData.secretCode}
            onChange={handleChange}
            className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            Status
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => refs.status.current?.focus()}
          />
          <input
            ref={refs.status}
            name="status"
            type="text"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Actual Status */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            Actual Status
          </label>
          <FiEdit
            className="absolute right-3 top-9 text-indigo-500 hover:text-indigo-700 cursor-pointer"
            onClick={() => refs.actualStatus.current?.focus()}
          />
          <input
            ref={refs.actualStatus}
            name="actualStatus"
            type="text"
            value={formData.actualStatus}
            onChange={handleChange}
            className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-lg w-full hover:bg-indigo-700 transition"
        >
          Save Device Details
        </button>
      </form>
    </div>
  );
};

export default DeviceDetails;