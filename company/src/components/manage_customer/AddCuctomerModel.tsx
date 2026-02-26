import React, { useRef, useState } from "react";

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

  const inputClass =
    "w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200";

  const labelClass = "block text-xs font-medium text-gray-500 mb-1.5 tracking-wide";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-gray-50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="relative bg-gray-950 px-8 py-7 overflow-hidden shrink-0">
          {/* Decorative glows */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-600 opacity-20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 left-8 w-32 h-32 bg-teal-400 opacity-10 rounded-full blur-2xl pointer-events-none" />
          <div className="felx flex-col">
          <div className="">
            <button
            onClick={onClose}
            className="absolute top-3 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-lg transition-all duration-200 hover:rotate-90"
          >
            ×
          </button>
          </div>

          <div>
            <h2 className="relative text-2xl font-light text-white tracking-tight">
            New <span className="text-violet-400 italic font-normal">Customer</span>
          </h2>
          <p className="relative mt-1 w-full text-xs text-white/40 font-light tracking-wide">
            Fill in the details to create a new customer record
          </p>
          </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-8 py-7 space-y-7">

          {/* Personal Info */}
          <div>
            <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-4">
              Personal Info
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input className={inputClass} type="text" name="name" value={formData.name} onChange={onChange} placeholder="e.g. Arjun Sharma" />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input className={inputClass} type="text" name="phone" value={formData.phone} onChange={onChange} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className={labelClass}>Alternate Phone</label>
                <input className={inputClass} type="text" name="altPhone" value={formData.altPhone} onChange={onChange} placeholder="Optional" />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input className={inputClass} type="email" name="email" value={formData.email} onChange={onChange} placeholder="name@example.com" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Documents */}
          <div>
            <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-4">
              Documents
            </p>
            <div className="grid grid-cols-2 gap-4">

              {/* Image Upload */}
              <div>
                <label className={labelClass}>Customer Photo</label>
                <div
                  onClick={() => imageRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl bg-white p-5 cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 min-h-28"
                >
                  <input
                    ref={imageRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e, setImagePreview)}
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-20 object-cover rounded-lg" />
                  ) : (
                    <>
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-violet-100 text-lg">📷</div>
                      <p className="text-xs text-gray-400 text-center leading-relaxed">
                        <span className="text-violet-500 font-medium">Click to upload</span>
                        <br />PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Signature Upload */}
              <div>
                <label className={labelClass}>Signature</label>
                <div
                  onClick={() => signatureRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl bg-white p-5 cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 min-h-28"
                >
                  <input
                    ref={signatureRef}
                    type="file"
                    name="signature"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e, setSignaturePreview)}
                  />
                  {signaturePreview ? (
                    <img src={signaturePreview} alt="signature" className="w-full h-20 object-cover rounded-lg" />
                  ) : (
                    <>
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-violet-100 text-lg">✍️</div>
                      <p className="text-xs text-gray-400 text-center leading-relaxed">
                        <span className="text-violet-500 font-medium">Click to upload</span>
                        <br />PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Device Details */}
          <div>
            <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-4">
              Device Details
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Model</label>
                <input className={inputClass} type="text" name="model" value={formData.model} onChange={onChange} placeholder="iPhone 15 Pro" />
              </div>
              <div>
                <label className={labelClass}>IMEI 1</label>
                <input className={inputClass} type="text" name="imei1" value={formData.imei1} onChange={onChange} placeholder="123456789012345" />
              </div>
              <div>
                <label className={labelClass}>IMEI 2</label>
                <input className={inputClass} type="text" name="imei2" value={formData.imei2} onChange={onChange} placeholder="123456789012346" />
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="shrink-0 flex justify-end items-center gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-gray-950 text-white hover:bg-gray-800 shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Add Customer
            <span className="text-violet-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCustomerModal;