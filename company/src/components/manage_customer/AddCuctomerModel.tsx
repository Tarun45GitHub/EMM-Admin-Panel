import React, { useEffect, useRef, useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => Promise<void> | void;
}

// 🔹 Reusable Input
const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
      {label}
    </label>
    <input
      {...props}
      className="
        border rounded-lg px-3 py-2 text-sm transition
        bg-white dark:bg-gray-800
        border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
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
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [sign, setSign] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const photoRef = useRef<HTMLInputElement>(null);
  const signRef = useRef<HTMLInputElement>(null);

  // ESC close
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  if (!show) return null;

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => {
    onFileChange(e);
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 z-50">

      {/* Modal */}
      <div className="
        w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-100
      ">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-4
          border-gray-200 dark:border-gray-700">
          
          <div>
            <h2 className="text-lg font-semibold">Add Customer</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Fill details to create new customer
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b text-sm border-gray-200 dark:border-gray-700">
          {["Personal", "Device"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setStep(i + 1)}
              className={`flex-1 py-2 ${
                step === i + 1
                  ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" name="name" value={formData.name} onChange={onChange} />
                <Input label="Phone" name="phone" value={formData.phone} onChange={onChange} />
                <Input label="Alternate Phone" name="altPhone" value={formData.altPhone} onChange={onChange} />
                <Input label="Email" name="email" value={formData.email} onChange={onChange} type="email" />
              </div>

              {/* Upload */}
              <div className="grid grid-cols-2 gap-4">
                {[{ state: photo, set: setPhoto, ref: photoRef, icon: "📷", text: "Upload Photo" },
                  { state: sign, set: setSign, ref: signRef, icon: "✍️", text: "Upload Signature" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => item.ref.current?.click()}
                    className="
                      border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition
                      border-gray-300 dark:border-gray-600
                      hover:border-indigo-400 hover:bg-indigo-50
                      dark:hover:bg-gray-800
                    "
                  >
                    {item.state ? (
                      <img src={item.state} className="h-24 mx-auto object-cover rounded-md" />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xl">{item.icon}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <input ref={photoRef} type="file" className="hidden" onChange={(e) => handleFile(e, setPhoto)} />
              <input ref={signRef} type="file" className="hidden" onChange={(e) => handleFile(e, setSign)} />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="Model" name="model" value={formData.model} onChange={onChange} />
              <Input label="IMEI 1" name="imei1" value={formData.imei1} onChange={onChange} />
              <Input label="IMEI 2" name="imei2" value={formData.imei2} onChange={onChange} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t p-4
          border-gray-200 dark:border-gray-700">

          <button
            onClick={onClose}
            className="
              px-4 py-2 text-sm border rounded-md
              border-gray-300 dark:border-gray-600
              hover:bg-gray-100 dark:hover:bg-gray-800
            "
          >
            Cancel
          </button>

          <div className="flex gap-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Back
              </button>
            )}

            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddCustomerModal;