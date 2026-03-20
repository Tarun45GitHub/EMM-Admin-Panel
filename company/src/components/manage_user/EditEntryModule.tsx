import React from "react";
import EntryTableEditModel from "./Entry_table_Edit_model";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 ">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Edit User Details</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 bg-blue bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={onChange}
                className="w-full text-gray-400 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                name="emailid"
                value={formData.emailid}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="user@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["first_name", "middle_name", "last_name"].map((field, idx) => (
              <div key={idx} className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={`Enter ${field.replace("_", " ")}`}
                />
              </div>
            ))}
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Shop / Company</label>
              <input
                type="text"
                name="shop_company"
                value={formData.shop_company}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter shop/company name"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-black">Address</label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter complete address"
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["state", "city", "pincode"].map((field, idx) => (
              <div key={idx} className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="w-full px-3  py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">iOS Wallet Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="walletIOS"
                  value={formData.walletIOS}
                  onChange={onChange}
                  className="w-full pl-8 pr-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Android Wallet Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="walletAndroid"
                  value={formData.walletAndroid}
                  onChange={onChange}
                  className="w-full pl-8 pr-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">PIN</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••"
                maxLength={4}
                pattern="[0-9]{4}"
              />
            </div>
          </div>

          {/* Parent Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Parent Node</label>
            <select
              name="parent"
              value={formData.parent}
              onChange={onChange}
              className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">Select Parent</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id} className="bg-blue text-gray-200">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-gray-50 space-x-3 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Save Changes
          </button>
        </div>
        
        <div className="hidden">
          <EntryTableEditModel 
            show={false} 
            onClose={() => {}} 
            onSave={() => {}} 
            formData={undefined} 
            onChange={() => {}} 
          />
        </div>

      </div>
    </div>
  );
};

export default EditEntryModal;
