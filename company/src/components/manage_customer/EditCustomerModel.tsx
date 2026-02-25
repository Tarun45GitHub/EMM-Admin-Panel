import React from "react";

interface EditCustomerModalProps {
  show: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  show,
  onClose,
  formData,
  onChange,
  onFileChange,
  onSave,
}) => {
  if (!show) return null;

  const commentOptions = [
    "Good", "Bad", "Pending", "Delivered", "Returned",
    "FollowUp", "Cancelled", "Hold", "Urgent", "New",
    "Repeat", "VIP", "Complaint", "Resolved", "Info",
  ];
  

  return (
    <div className="fixed h-screen p-20   inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
      <div className="w-full h-screen mt-10 bg-white rounded-xl shadow-2xl overflow-auto border border-gray-200">
        <div>
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-4 bg-indigo-600 text-white rounded-t-xl">
          <h2 className="text-2xl font-semibold">Edit Customer</h2>
          <button onClick={onClose} className="text-2xl font-bold hover:text-gray-200">
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* ID */}
            <div>
              <label className="text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Activate By */}
            <div>
              <label className="text-sm font-medium text-gray-700">Activate By</label>
              <input
                type="text"
                name="activateBy"
                value={formData.activateBy}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Activate No */}
            <div>
              <label className="text-sm font-medium text-gray-700">Activate No</label>
              <input
                type="text"
                name="activateNo"
                value={formData.activateNo}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Actual Status</label>
              <input
                type="text"
                name="actualStatus"
                value={formData.actualStatus}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Status + Actual Status */}
         

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["name", "phone", "altPhone"].map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-gray-700">
                  {field === "altPhone" ? "Alternate Phone" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            ))}
          </div>

          {/* Email + Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="mt-2 w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Customer Image</label>
              <input
                type="file"
                name="image"
                onChange={onFileChange}
                className="mt-2 w-full"
                accept="image/*"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Signature</label>
              <input
                type="file"
                name="signature"
                onChange={onFileChange}
                className="mt-2 w-full"
                accept="image/*"
              />
            </div>
          </div>

          {/* Device Info */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {["loadBy", "model", "imei1", "imei2"].map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-gray-700">
                  {field === "imei1" || field === "imei2" ? field.toUpperCase() : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              
            ))}
            <div>
            <label className="text-sm font-medium text-gray-700">SIM Details</label>
            <input
              name="simDetails"
              value={formData.simDetails}
              onChange={onChange}
              className="mt-2 w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          </div>

          {/* SIM Details */}
          

          {/* Comment Buttons */}
          <div>
            <label className="text-sm font-medium text-gray-700">Comment</label>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-5 gap-2">
              {commentOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => onChange({ target: { name: "comment", value: opt } } as any)}
                  className={`px-2 py-1 text-sm rounded-lg border ${
                    formData.comment === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:bg-indigo-500 hover:text-white transition`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Location + Sector + Last Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["location", "lastLocation", "sectorCode"].map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-gray-700">
                  {field === "lastLocation" ? "Last Location" : field === "sectorCode" ? "Sector Code" : "Location"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end px-8 py-5 bg-gray-50 space-x-3 rounded-b-xl">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onSave} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
        </div>
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;