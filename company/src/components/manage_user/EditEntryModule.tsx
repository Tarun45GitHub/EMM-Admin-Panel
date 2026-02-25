import React from "react";

interface ParentOption {
  id: string;
  label: string;
}

interface EditDetailsModalProps {
  show: boolean;
  onClose: () => void;
  parents: ParentOption[];
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
}

const EditEntryModal: React.FC<EditDetailsModalProps> = ({
  show,
  onClose,
  parents,
  formData,
  onChange,
  onSave,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-auto border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-xl">
          <h2 className="text-2xl font-semibold">Edit User Details</h2>
          <button 
            onClick={onClose} 
            className="text-2xl font-bold hover:text-gray-200 transition"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="emailid"
                value={formData.emailid}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

          </div>

          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["first_name", "middle_name", "last_name"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          {/* Address / Shop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Shop / Company</label>
              <input
                type="text"
                name="shop_company"
                value={formData.shop_company}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          {/* State, City, Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["state", "city", "pincode"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
            ))}
          </div>

          {/* Wallet & PIN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">iOS Wallet Balance</label>
              <input
                type="number"
                name="walletIOS"
                value={formData.walletIOS}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Android Wallet Balance</label>
              <input
                type="number"
                name="walletAndroid"
                value={formData.walletAndroid}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">PIN</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          {/* Parent Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Node</label>
            <select
              name="parent"
              value={formData.parent}
              onChange={onChange}
              className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:border-indigo-500 text-gray-700"
            >
              <option value="">Select Parent</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end px-8 py-5 bg-gray-50 space-x-3 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditEntryModal;