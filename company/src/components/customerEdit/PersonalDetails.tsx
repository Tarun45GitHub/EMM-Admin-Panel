import React, { useState, type ChangeEvent } from "react";
import { FiEdit } from "react-icons/fi"; // pencil icon

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

const PersonalDetails: React.FC = () => {
  // Example initial data (replace this with data you fetch from API)
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "John",
    middleName: "K.",
    lastName: "Doe",
    email: "[email protected]",
    phone: "9876543210",
    altPhone: "9123456780",
    imageFile: null,
    signatureFile: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0], // store selected file
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Details:", formData);
    // Save to backend API
  };

  return (
    <div className="w-full p-6 h-full flex items-center justify-center bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full  p-4 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Edit Personal Details
        </h2>

        {/* First, Middle, Last Name */}
        <div className="grid grid-cols-1 gap-2">
          <div className="relative ">
            <label className="block mb-1 font-medium text-gray-700">
              First Name
            </label>
            <FiEdit className="absolute right-3 top-9 text-indigo-500 cursor-pointer" />
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">
              Middle Name
            </label>
            <FiEdit className="absolute right-3 top-9 text-indigo-500 cursor-pointer" />
            <input
              name="middleName"
              type="text"
              value={formData.middleName}
              onChange={handleChange}
              className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">
              Last Name
            </label>
            <FiEdit className="absolute right-3 top-9 text-indigo-500 cursor-pointer" />
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-2">
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <FiEdit className="absolute right-3 top-9 text-indigo-500 cursor-pointer" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">Phone</label>
            <FiEdit className="absolute right-3 top-9 text-indigo-500 cursor-pointer" />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">
              Alternate Phone
            </label>
            <FiEdit className="absolute right-3 top-9 text-indigo-500 cursor-pointer" />
            <input
              name="altPhone"
              type="tel"
              value={formData.altPhone}
              onChange={handleChange}
              className="border rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 gap-2">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Profile Image
            </label>
            <input
              name="imageFile"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Signature
            </label>
            <input
              name="signatureFile"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-1 rounded-lg w-full hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;