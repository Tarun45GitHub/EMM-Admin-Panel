import React, { useRef, useState } from "react";

interface EditCustomerModalProps {
  show: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const TextInput = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600 font-medium">{label}</label>
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-400 transition"
      {...props}
    />
  </div>
);

const UploadInput = ({
  label,
  preview,
  onClick,
}: {
  label: string;
  preview: string | null;
  onClick: () => void;
}) => (
  <div>
    <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-300 transition"
    >
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full h-24 object-cover rounded-md"
        />
      ) : (
        <p className="text-sm text-gray-400">Click to Upload</p>
      )}
    </div>
  </div>
);

const commentTags = [
  "Good","Bad","Pending","Delivered","Returned","FollowUp",
  "Cancelled","Hold","Urgent","New","Repeat","VIP","Complaint",
  "Resolved","Info"
];

const EditCustomerModalPage1: React.FC<EditCustomerModalProps> = ({
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
    setter: (val: string | null) => void
  ) => {
    onFileChange(e);
    if (e.target.files?.[0]) setter(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-auto">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit <span className="text-indigo-600">Customer</span>
          </h2>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-6">

          {/* System Fields */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TextInput label="ID" name="id" value={formData.id || ""} onChange={onChange} />
            <TextInput label="Active By" name="activeBy" value={formData.activeBy || ""} onChange={onChange} />
            <TextInput label="Active On" name="activeOn" value={formData.activeOn || ""} onChange={onChange} />
            <TextInput label="Status" name="status" value={formData.status || ""} onChange={onChange} />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput label="First Name" name="firstName" value={formData.firstName || ""} onChange={onChange} />
            <TextInput label="Middle Name" name="middleName" value={formData.middleName || ""} onChange={onChange} />
            <TextInput label="Last Name" name="lastName" value={formData.lastName || ""} onChange={onChange} />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput label="Phone" name="phone" value={formData.phone || ""} onChange={onChange} />
            <TextInput label="Alternate Phone" name="altPhone" value={formData.altPhone || ""} onChange={onChange} />
            <TextInput label="Email" name="email" value={formData.email || ""} onChange={onChange} />
          </div>

          {/* Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadInput
              label="Image"
              preview={imagePreview}
              onClick={() => imageRef.current?.click()}
            />
            <UploadInput
              label="Signature"
              preview={signaturePreview}
              onClick={() => signatureRef.current?.click()}
            />
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

          {/* Device Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput label="Load By" name="loadBy" value={formData.loadBy || ""} onChange={onChange} />
            <TextInput label="Model No" name="modelNo" value={formData.modelNo || ""} onChange={onChange} />
            <TextInput label="Access Code" name="accessCode" value={formData.accessCode || ""} onChange={onChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput label="IMEI 1" name="imei1" value={formData.imei1 || ""} onChange={onChange} />
            <TextInput label="IMEI 2" name="imei2" value={formData.imei2 || ""} onChange={onChange} />
            <TextInput label="SIM Details" name="simDetails" value={formData.simDetails || ""} onChange={onChange} />
          </div>

          {/* Comment Tags */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Comment</p>
            <div className="flex gap-2 flex-wrap">
              {commentTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    onChange({ target: { name: "comment", value: tag } } as any)
                  }
                  className={`px-3 py-1 text-sm rounded-full border ${
                    formData.comment === tag
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput label="Location" name="location" value={formData.location || ""} onChange={onChange} />
            <TextInput label="Last Location" name="lastLocation" value={formData.lastLocation || ""} onChange={onChange} />
            <TextInput label="Secret Code" name="secretCode" value={formData.secretCode || ""} onChange={onChange} />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditCustomerModalPage1;