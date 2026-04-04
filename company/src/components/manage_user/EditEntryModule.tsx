import React, { useState } from "react";
import api from "../../api/Axios";
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
  userId: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: (success: boolean) => void;
}

const EditEntryModal: React.FC<EditDetailsModalProps> = ({
  show,
  onClose,
  formData,
  userId,
  onChange,
  onSave,
}) => {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!show) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSaveError("Token not found. Please log in again.");
        setSaving(false);
        return;
      }

      // Prepare payload matching the API endpoint structure
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile_number: formData.mobile_number,
        email: formData.email,
        password: formData.password,
        company_name: formData.company_name,
        gstin: formData.gstin,
        wallet: parseFloat(formData.wallet) || 0,
        state_id: parseInt(formData.state_id) || null,
        city_id: parseInt(formData.city_id) || null,
        address: formData.address,
        group: formData.group,
      };

      const response = await api.put(
        `/crm/users/${userId}/`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        onSave(true);
      }
    } catch (err: any) {
      console.error('Update error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to update user. Please try again.';
      setSaveError(errorMessage);
      onSave(false);
    } finally {
      setSaving(false);
    }
  };

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
              <label className="block text-sm font-medium text-black">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter first name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter last name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Group</label>
              <select
                name="group"
                value={formData.group}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select Group</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>


          {/* Company & Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter GSTIN"
              />
            </div>
            <div className="md:col-span-1 space-y-2">
              <label className="block text-sm font-medium text-black">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter complete address"
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">State ID</label>
              <input
                type="number"
                name="state_id"
                value={formData.state_id}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter state ID"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">City ID</label>
              <input
                type="number"
                name="city_id"
                value={formData.city_id}
                onChange={onChange}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter city ID"
              />
            </div>
          </div>

          {/* Wallet Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Wallet Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="wallet"
                  value={formData.wallet}
                  onChange={onChange}
                  className="w-full pl-8 pr-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>


        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mx-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {saveError}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-gray-50 space-x-3 rounded-b-xl">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
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
