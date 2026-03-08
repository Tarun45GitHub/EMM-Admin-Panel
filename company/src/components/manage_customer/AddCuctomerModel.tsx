import React, { useRef, useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

const AddCustomerModal: React.FC<Props> = ({
  show,
  onClose,
  formData,
  onChange,
  onFileChange,
  onSave,
}) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [sign, setSign] = useState<string | null>(null);

  const photoRef = useRef<HTMLInputElement>(null);
  const signRef = useRef<HTMLInputElement>(null);

  if (!show) return null;

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => {
    onFileChange(e);
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50">

      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Add Customer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
            />
            <Input
              label="Alternate Phone"
              name="altPhone"
              value={formData.altPhone}
              onChange={onChange}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              type="email"
            />
          </div>

          {/* Upload */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => photoRef.current?.click()}
              className="border-2 border-dashed rounded-md p-3 text-center cursor-pointer"
            >
              {photo ? (
                <img src={photo} className="h-20 mx-auto object-cover" />
              ) : (
                <p className="text-sm text-gray-400">Upload Photo</p>
              )}
            </div>

            <div
              onClick={() => signRef.current?.click()}
              className="border-2 border-dashed rounded-md p-3 text-center cursor-pointer"
            >
              {sign ? (
                <img src={sign} className="h-20 mx-auto object-cover" />
              ) : (
                <p className="text-sm text-gray-400">Upload Signature</p>
              )}
            </div>

            <input
              ref={photoRef}
              type="file"
              name="image"
              className="hidden"
              onChange={(e) => handleFile(e, setPhoto)}
            />
            <input
              ref={signRef}
              type="file"
              name="signature"
              className="hidden"
              onChange={(e) => handleFile(e, setSign)}
            />
          </div>

          {/* Device Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Model"
              name="model"
              value={formData.model}
              onChange={onChange}
            />
            <Input
              label="IMEI 1"
              name="imei1"
              value={formData.imei1}
              onChange={onChange}
            />
            <Input
              label="IMEI 2"
              name="imei2"
              value={formData.imei2}
              onChange={onChange}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCustomerModal;