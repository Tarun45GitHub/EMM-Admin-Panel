import React, { useRef, useState } from "react";

interface AddCustomerModalProps {
  show: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const InputField = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 transition"
      {...props}
    />
  </div>
);

const UploadBox = ({
  label,
  preview,
  onClick,
}: {
  label: string;
  preview: string | null;
  onClick: () => void;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-300 bg-white transition"
    >
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full h-24 object-cover rounded-md"
        />
      ) : (
        <>
          <div className="text-2xl">+</div>
          <p className="text-xs text-gray-400 mt-1">
            Click to upload PNG/JPG up to 5MB
          </p>
        </>
      )}
    </div>
  </div>
);

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  show,
  onClose,
  formData,
  onChange,
  onFileChange,
  onSave,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);

  if (!show) return null;

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string | null) => void
  ) => {
    onFileChange(e);
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg overflow-auto w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            New <span className="text-indigo-500">Customer</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to create a new customer
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Arjun Sharma"
            />
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+91 98765 43210"
            />
            <InputField
              label="Alternate Phone"
              name="altPhone"
              value={formData.altPhone}
              onChange={onChange}
              placeholder="Optional"
            />
            <InputField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="name@example.com"
              type="email"
            />
          </div>

          {/* Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadBox
              label="Customer Photo"
              preview={imagePreview}
              onClick={() => imageRef.current?.click()}
            />
            <UploadBox
              label="Signature"
              preview={signaturePreview}
              onClick={() => signatureRef.current?.click()}
            />

            {/* Hidden File Inputs */}
            <input
              ref={imageRef}
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e, setImagePreview)}
            />
            <input
              ref={signatureRef}
              type="file"
              name="signature"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e, setSignaturePreview)}
            />
          </div>

          {/* Device Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Model"
              name="model"
              value={formData.model}
              onChange={onChange}
              placeholder="iPhone 15 Pro"
            />
            <InputField
              label="IMEI 1"
              name="imei1"
              value={formData.imei1}
              onChange={onChange}
              placeholder="123456789012345"
            />
            <InputField
              label="IMEI 2"
              name="imei2"
              value={formData.imei2}
              onChange={onChange}
              placeholder="123456789012346"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Customer
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCustomerModal;