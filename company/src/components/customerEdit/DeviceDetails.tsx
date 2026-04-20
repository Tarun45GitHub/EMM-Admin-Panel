import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { FiEdit, FiSmartphone, FiHash, FiWifi, FiShield, FiSettings, FiSave } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useLoader } from "../ui/LoaderContext";
import api from "../../api/Axios";
import toast from "react-hot-toast";

interface DeviceData {
  modelName: string;
  imei1: string;
  imei2: string;
  simDetails: string;
  secretCode: string;
  status: string;
  actualStatus: string;
}

interface Props {
  customer: any;
  onSuccess?: () => void; // Callback to refresh customer data after update
}

const DeviceDetails: React.FC<Props> = ({ customer, onSuccess }) => {
  const [formData, setFormData] = useState<DeviceData>({
    modelName: "",
    imei1: "",
    imei2: "",
    simDetails: "",
    secretCode: "",
    status: "",
    actualStatus: "",
  });

  // Populate device info from backend data
  useEffect(() => {
    if (customer) {
      setFormData({
        modelName: customer.type || "",
        imei1: customer.imei_1 || "",
        imei2: customer.imei_2 || "",
        // Fallback to N/A or default values for fields not explicitly in top-level object
        simDetails: customer.sim_details || "Dual SIM 4G",
        secretCode: customer.secret_code || "****",
        status: customer.is_active ? "Active" : "Inactive",
        actualStatus: customer.actual_status || "In Use",
      });
    }
  }, [customer]);

  const { customer_id } = useParams<{ customer_id: string }>();
  const { showLoader, hideLoader } = useLoader();
  const [isSaving, setIsSaving] = useState(false);

  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({
    modelName: false,
    imei1: false,
    imei2: false,
    simDetails: false,
    secretCode: false,
    status: false,
    actualStatus: false,
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

  const handleEditClick = (field: string) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer_id) {
      toast.error("Customer ID is missing");
      return;
    }

    setIsSaving(true);
    showLoader();

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        window.location.href = "/login";
        return;
      }

      // Map form data to backend field names
      const payload = {
        type: formData.modelName,
        imei_1: formData.imei1.replace(/\D/g, ''), // Remove formatting for API
        imei_2: formData.imei2.replace(/\D/g, ''), // Remove formatting for API
        sim_details: formData.simDetails,
        secret_code: formData.secretCode,
        is_active: formData.status === "Active",
        actual_status: formData.actualStatus,
      };

      // Send PATCH request to update device details
      await api.patch(
        `/crm/customers/${customer_id}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Device details updated successfully!");
      
      // Exit editing mode for all fields
      setIsEditing({
        modelName: false,
        imei1: false,
        imei2: false,
        simDetails: false,
        secretCode: false,
        status: false,
        actualStatus: false,
      });

      // Trigger parent component refresh if callback provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error updating device details:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update device details";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
      hideLoader();
    }
  };

  const formatIMEI = (imei: string) => {
    // Add formatting for IMEI numbers
    const cleaned = imei.replace(/\D/g, '');
    if (cleaned.length === 15) {
      return cleaned.replace(/(\d{2})(\d{6})(\d{6})(\d)/, '$1-$2-$3-$4');
    }
    return imei;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <FiSmartphone className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Device Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage device specifications and security details
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Device Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Device Model
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSmartphone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={refs.modelName}
              name="modelName"
              type="text"
              value={formData.modelName}
              onChange={handleChange}
              disabled={!isEditing.modelName}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="e.g., Galaxy S22, iPhone 14"
            />
            <button
              type="button"
              onClick={() => handleEditClick('modelName')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <FiEdit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* IMEI Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              IMEI 1
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHash className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={refs.imei1}
                name="imei1"
                type="text"
                value={formatIMEI(formData.imei1)}
                onChange={handleChange}
                disabled={!isEditing.imei1}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="15-digit IMEI number"
                maxLength={18}
              />
              <button
                type="button"
                onClick={() => handleEditClick('imei1')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              IMEI 2
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHash className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={refs.imei2}
                name="imei2"
                type="text"
                value={formatIMEI(formData.imei2)}
                onChange={handleChange}
                disabled={!isEditing.imei2}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="15-digit IMEI number"
                maxLength={18}
              />
              <button
                type="button"
                onClick={() => handleEditClick('imei2')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SIM Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SIM Configuration
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiWifi className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={refs.simDetails}
              name="simDetails"
              type="text"
              value={formData.simDetails}
              onChange={handleChange}
              disabled={!isEditing.simDetails}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="e.g., Dual SIM 4G, Single SIM 5G"
            />
            <button
              type="button"
              onClick={() => handleEditClick('simDetails')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <FiEdit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Secret Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiShield className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={refs.secretCode}
              name="secretCode"
              type="password"
              value={formData.secretCode}
              onChange={handleChange}
              disabled={!isEditing.secretCode}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="Device security code"
            />
            <button
              type="button"
              onClick={() => handleEditClick('secretCode')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <FiEdit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Device Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSettings className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={refs.status}
                name="status"
                type="text"
                value={formData.status}
                onChange={handleChange}
                disabled={!isEditing.status}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="Active, Inactive, etc."
              />
              <button
                type="button"
                onClick={() => handleEditClick('status')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Actual Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSettings className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={refs.actualStatus}
                name="actualStatus"
                type="text"
                value={formData.actualStatus}
                onChange={handleChange}
                disabled={!isEditing.actualStatus}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="In Use, Available, etc."
              />
              <button
                type="button"
                onClick={() => handleEditClick('actualStatus')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4 mr-2 inline" />
                Save Device Details
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              // Reset form
              setFormData({
                modelName: "Galaxy S22",
                imei1: "123456789012345",
                imei2: "543210987654321",
                simDetails: "Dual SIM 4G",
                secretCode: "XYZ123",
                status: "Active",
                actualStatus: "In Use",
              });
              setIsEditing({
                modelName: false,
                imei1: false,
                imei2: false,
                simDetails: false,
                secretCode: false,
                status: false,
                actualStatus: false,
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

export default DeviceDetails;