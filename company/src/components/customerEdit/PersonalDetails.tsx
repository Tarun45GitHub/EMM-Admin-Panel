import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { FiEdit, FiUser, FiMail, FiPhone, FiUpload } from "react-icons/fi";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useLoader } from "../ui/LoaderContext";
import api from "../../api/Axios";
import toast from "react-hot-toast";

interface ProfileFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  altPhone: string;
  imageFile: File | null;
  signatureFile: File | null;
}

interface Props {
  customer: any; // Ideally use the CustomerData interface from EditCustomer.tsx
  onSuccess?: () => void; // Callback to refresh customer data after update
}

const PersonalDetails: React.FC<Props> = ({ customer, onSuccess }) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    altPhone: "",
    imageFile: null,
    signatureFile: null,
  });

  // Synchronize form data when customer prop changes
  useEffect(() => {
    if (customer) {
      // Note: Backend provides 'name' as a single string, mapping it to firstName
      // You can split the name if your backend supports specific fields
      setFormData(prev => ({
        ...prev,
        firstName: customer.name || "",
        email: customer.email || "",
        phone: customer.mobile_number || "",
        // Map other fields if they exist in your backend response
        middleName: customer.middle_name || "",
        lastName: customer.last_name || "",
        altPhone: customer.alternate_mobile_number || "",
      }));
    }
  }, [customer]);

  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({
    firstName: false,
    middleName: false,
    lastName: false,
    email: false,
    phone: false,
    altPhone: false,
  });

  const { customer_id } = useParams<{ customer_id: string }>();
  const { showLoader, hideLoader } = useLoader();
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

      // Create FormData to handle both text fields and file uploads
      const formDataToSend = new FormData();

      // Map form fields to backend field names
      formDataToSend.append("name", formData.firstName);
      if (formData.middleName) formDataToSend.append("middle_name", formData.middleName);
      if (formData.lastName) formDataToSend.append("last_name", formData.lastName);
      if (formData.email) formDataToSend.append("email", formData.email);
      if (formData.phone) formDataToSend.append("mobile_number", formData.phone);
      if (formData.altPhone) formDataToSend.append("alternate_mobile_number", formData.altPhone);

      // Add files if they exist
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }
      if (formData.signatureFile) {
        formDataToSend.append("signature", formData.signatureFile);
      }

      // Send PATCH request to update personal details
      await api.patch(
        `/crm/customers/${customer_id}/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Personal details updated successfully!");

      // Exit editing mode for all fields
      setIsEditing({
        firstName: false,
        middleName: false,
        lastName: false,
        email: false,
        phone: false,
        altPhone: false,
      });

      // Clear file selections
      setFormData(prev => ({
        ...prev,
        imageFile: null,
        signatureFile: null,
      }));

      // Trigger parent component refresh if callback provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error updating personal details:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update personal details";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
      hideLoader();
    }
  };

  // const formatPhoneNumber = (phone: string) => {
  //   // Add formatting for phone numbers
  //   const cleaned = phone.replace(/\D/g, '');
  //   const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  //   if (match) {
  //     return `(${match[1]}) ${match[2]}-${match[3]}`;
  //   }
  //   return phone;
  // };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <FiUser className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update customer personal details
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <div className="relative">
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing.firstName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="Enter first name"
              />
              <button
                type="button"
                onClick={() => handleEditClick('firstName')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Middle Name
            </label>
            <div className="relative">
              <input
                name="middleName"
                type="text"
                value={formData.middleName}
                onChange={handleChange}
                disabled={!isEditing.middleName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="Enter middle name"
              />
              <button
                type="button"
                onClick={() => handleEditClick('middleName')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <div className="relative">
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing.lastName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="Enter last name"
              />
              <button
                type="button"
                onClick={() => handleEditClick('lastName')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing.email}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                placeholder="customer@example.com"
              />
              <button
                type="button"
                onClick={() => handleEditClick('email')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing.phone}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
                <button
                  type="button"
                  onClick={() => handleEditClick('phone')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alternate Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="altPhone"
                  type="tel"
                  value={formData.altPhone}
                  onChange={handleChange}
                  disabled={!isEditing.altPhone}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                  placeholder="(555) 987-6543"
                />
                <button
                  type="button"
                  onClick={() => handleEditClick('altPhone')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Photo
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <MdOutlinePhotoCamera className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                  <FiUpload className="w-4 h-4 mr-2" />
                  {formData.imageFile ? formData.imageFile.name : 'Upload Photo'}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Signature
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Signature</span>
                </div>
              </div>
              <div className="flex-1">
                <input
                  ref={signatureInputRef}
                  name="signatureFile"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => signatureInputRef.current?.click()}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                  <FiUpload className="w-4 h-4 mr-2" />
                  {formData.signatureFile ? formData.signatureFile.name : 'Upload Signature'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
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
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              // Reset form
              setFormData({
                firstName: "John",
                middleName: "K.",
                lastName: "Doe",
                email: "[email protected]",
                phone: "9876543210",
                altPhone: "9123456780",
                imageFile: null,
                signatureFile: null,
              });
              setIsEditing({
                firstName: false,
                middleName: false,
                lastName: false,
                email: false,
                phone: false,
                altPhone: false,
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

export default PersonalDetails;