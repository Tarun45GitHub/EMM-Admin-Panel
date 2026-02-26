import React, { useRef, useState } from "react";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);

  if (!show) return null;

  const commentOptions = [
    "Good", "Bad", "Pending", "Delivered", "Returned",
    "FollowUp", "Cancelled", "Hold", "Urgent", "New",
    "Repeat", "VIP", "Complaint", "Resolved", "Info",
  ];

  const commentColors: Record<string, string> = {
    Good: "text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-500",
    Bad: "text-red-600 border-red-200 bg-red-50 hover:bg-red-500",
    Pending: "text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-500",
    Delivered: "text-sky-600 border-sky-200 bg-sky-50 hover:bg-sky-500",
    Returned: "text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-500",
    FollowUp: "text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-500",
    Cancelled: "text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-500",
    Hold: "text-yellow-600 border-yellow-200 bg-yellow-50 hover:bg-yellow-500",
    Urgent: "text-red-700 border-red-300 bg-red-50 hover:bg-red-600",
    New: "text-teal-600 border-teal-200 bg-teal-50 hover:bg-teal-500",
    Repeat: "text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-500",
    VIP: "text-purple-600 border-purple-200 bg-purple-50 hover:bg-purple-500",
    Complaint: "text-pink-600 border-pink-200 bg-pink-50 hover:bg-pink-500",
    Resolved: "text-green-600 border-green-200 bg-green-50 hover:bg-green-500",
    Info: "text-gray-600 border-gray-200 bg-gray-50 hover:bg-gray-500",
  };

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

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-4">
      {children}
    </p>
  );

  const Divider = () => (
    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-gray-50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="relative bg-gray-950 px-8 py-7 overflow-hidden shrink-0">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-600 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-12 w-32 h-32 bg-cyan-400 opacity-10 rounded-full blur-2xl pointer-events-none" />
         <button
            onClick={onClose}
            className="absolute top-3 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-lg transition-all duration-200 hover:rotate-90"
          >
            ×
        </button>
          

          <div className="relative flex items-end gap-4">
            <div>
              <h2 className="text-2xl font-light text-white tracking-tight">
                Edit <span className="text-violet-400 italic">Customer</span>
              </h2>
              <p className="mt-1 text-xs text-white/40 font-light tracking-wide">
                Update the customer's information below
              </p>
            </div>
            {formData.id && (
              <span className="mb-0.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/50 font-mono">
                #{formData.id}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-8 py-7 space-y-7">

          {/* System Info */}
          <div>
            <SectionTitle>System Info</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "id", label: "ID" },
                { name: "activateBy", label: "Activated By" },
                { name: "activateNo", label: "Activate No" },
                { name: "status", label: "Status" },
                { name: "actualStatus", label: "Actual Status" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input
                    className={inputClass}
                    type="text"
                    name={name}
                    value={formData[name] ?? ""}
                    onChange={onChange}
                    placeholder="—"
                  />
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Personal Info */}
          <div>
            <SectionTitle>Personal Info</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input className={inputClass} type="text" name="name" value={formData.name ?? ""} onChange={onChange} placeholder="e.g. Arjun Sharma" />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input className={inputClass} type="text" name="phone" value={formData.phone ?? ""} onChange={onChange} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className={labelClass}>Alternate Phone</label>
                <input className={inputClass} type="text" name="altPhone" value={formData.altPhone ?? ""} onChange={onChange} placeholder="Optional" />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input className={inputClass} type="email" name="email" value={formData.email ?? ""} onChange={onChange} placeholder="name@example.com" />
              </div>
            </div>
          </div>

          <Divider />

          {/* Documents */}
          <div>
            <SectionTitle>Documents</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Customer Photo</label>
                <div
                  onClick={() => imageRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl bg-white p-5 cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 min-h-28"
                >
                  <input ref={imageRef} type="file" name="image" accept="image/*" className="hidden"
                    onChange={(e) => handleFile(e, setImagePreview)} />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-20 object-cover rounded-lg" />
                  ) : (
                    <>
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-violet-100 text-lg">📷</div>
                      <p className="text-xs text-gray-400 text-center leading-relaxed">
                        <span className="text-violet-500 font-medium">Click to upload</span><br />PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Signature</label>
                <div
                  onClick={() => signatureRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl bg-white p-5 cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 min-h-28"
                >
                  <input ref={signatureRef} type="file" name="signature" accept="image/*" className="hidden"
                    onChange={(e) => handleFile(e, setSignaturePreview)} />
                  {signaturePreview ? (
                    <img src={signaturePreview} alt="signature" className="w-full h-20 object-cover rounded-lg" />
                  ) : (
                    <>
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-violet-100 text-lg">✍️</div>
                      <p className="text-xs text-gray-400 text-center leading-relaxed">
                        <span className="text-violet-500 font-medium">Click to upload</span><br />PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Device Details */}
          <div>
            <SectionTitle>Device Details</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "loadBy", label: "Load By" },
                { name: "model", label: "Model" },
                { name: "imei1", label: "IMEI 1" },
                { name: "imei2", label: "IMEI 2" },
                { name: "simDetails", label: "SIM Details" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input
                    className={inputClass}
                    type="text"
                    name={name}
                    value={formData[name] ?? ""}
                    onChange={onChange}
                    placeholder="—"
                  />
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Comment Tags */}
          <div>
            <SectionTitle>Comment</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {commentOptions.map((opt) => {
                const isSelected = formData.comment === opt;
                const colors = commentColors[opt] ?? "text-gray-600 border-gray-200 bg-gray-50 hover:bg-gray-500";
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => onChange({ target: { name: "comment", value: opt } } as any)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-150 hover:text-white
                      ${isSelected
                        ? "bg-gray-950 text-white border-gray-950 shadow-md"
                        : colors
                      }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {formData.comment && (
              <p className="mt-3 text-xs text-gray-400">
                Selected: <span className="text-gray-700 font-medium">{formData.comment}</span>
              </p>
            )}
          </div>

          <Divider />

          {/* Location */}
          <div>
            <SectionTitle>Location</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Location</label>
                <input className={inputClass} type="text" name="location" value={formData.location ?? ""} onChange={onChange} placeholder="e.g. Mumbai" />
              </div>
              <div>
                <label className={labelClass}>Last Location</label>
                <input className={inputClass} type="text" name="lastLocation" value={formData.lastLocation ?? ""} onChange={onChange} placeholder="e.g. Delhi" />
              </div>
              <div>
                <label className={labelClass}>Sector Code</label>
                <input className={inputClass} type="text" name="sectorCode" value={formData.sectorCode ?? ""} onChange={onChange} placeholder="e.g. SEC-04" />
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="shrink-0 flex justify-end items-center gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50">
          <div>
            <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-500 hover:text-gray-700 transition-all duration-200"
          >
            Cancel
          </button>
          </div>
          <button
            onClick={onSave}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-gray-950 text-white hover:bg-gray-800 shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Save Changes
            <span className="text-violet-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditCustomerModal;