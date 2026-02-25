import React from "react";

interface AddCustomerModalProps {
  show: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  show,
  onClose,
  formData,
  onChange,
  onFileChange,
  onSave,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-auto border border-gray-200">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 bg-indigo-600 text-white rounded-t-xl">
          <h2 className="text-2xl font-semibold">Add New Customer</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-gray-200 transition"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-6">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          {/* Alternate Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alternate Phone
              </label>
              <input
                type="text"
                name="altPhone"
                value={formData.altPhone}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          {/* Image + Signature Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer Image
              </label>
              <input
                type="file"
                name="image"
                onChange={onFileChange}
                className="block w-full text-gray-600  cursor-pointer bg-gray-300 rounded-md
                    border-dashed border-gray-300 hover:bg-gray-200 transition"
                accept="image/*"
                />
             
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Signature
              </label>
              <input
                type="file"
                name="signature"
                onChange={onFileChange}
                className="mt-2 w-full"
                accept="image/*"
              />
            </div>
          </div>

          {/* Model + IMEI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                IMEI 1
              </label>
              <input
                type="text"
                name="imei1"
                value={formData.imei1}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                IMEI 2
              </label>
              <input
                type="text"
                name="imei2"
                value={formData.imei2}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
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
            Add Customer
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCustomerModal;