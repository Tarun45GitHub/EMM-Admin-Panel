import React, { useRef, useState } from "react";
import avater from "../banners/defult_avatar.jpg"

interface Profile {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  role: string;
  country: string;
  city: string;
  postalCode: string;
  avatar: string;
}

const initialProfile: Profile = {
  firstName: "Natashia",
  lastName: "Khaleira",
  dob: "12-10-1990",
  email: "info@binary-fusion.com",
  phone: "(+62) 821 2554-5846",
  role: "Admin",
  country: "United Kingdom",
  city: "Leeds, East London",
  postalCode: "ERT 1254",
  avatar: "",
};

const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 space-y-6 ">
      {/* HEADER */}
      <div className="bg-white dark:bg-gray-700 dark:text-gray-200 p-6 rounded-xl shadow flex items-center gap-6">
        <div
          className="w-24 h-24 rounded-full border overflow-hidden cursor-pointer relative"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={profile.avatar || avater}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center text-sm text-white">
            Change
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div>
          <h2 className="text-xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-sm dark:text-gray-100">{profile.role}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {profile.city}, {profile.country}
          </p>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="bg-white  dark:bg-gray-700 dark:text-gray-200 p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button
            className="text-sm px-3 py-1 bg-orange-500 text-white rounded"
            onClick={() =>
              setEditingSection(
                editingSection === "personal" ? null : "personal"
              )
            }
          >
            {editingSection === "personal" ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400">First Name</label>
            <input
              disabled={editingSection !== "personal"}
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Last Name</label>
            <input
              disabled={editingSection !== "personal"}
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Date of Birth</label>
            <input
              disabled={editingSection !== "personal"}
              name="dob"
              value={profile.dob}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">User Role</label>
            <input
              disabled
              value={profile.role}
              className="w-full border px-2 py-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Email Address</label>
            <input
              disabled={editingSection !== "personal"}
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Phone Number</label>
            <input
              disabled={editingSection !== "personal"}
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="bg-white  dark:bg-gray-700 dark:text-gray-200 p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Address</h3>
          <button
            className="text-sm px-3 py-1 bg-orange-500 text-white rounded"
            onClick={() =>
              setEditingSection(
                editingSection === "address" ? null : "address"
              )
            }
          >
            {editingSection === "address" ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-400">Country</label>
            <input
              disabled={editingSection !== "address"}
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">City</label>
            <input
              disabled={editingSection !== "address"}
              name="city"
              value={profile.city}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Postal Code
            </label>
            <input
              disabled={editingSection !== "address"}
              name="postalCode"
              value={profile.postalCode}
              onChange={handleInputChange}
              className="w-full border px-2 py-1 rounded mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;