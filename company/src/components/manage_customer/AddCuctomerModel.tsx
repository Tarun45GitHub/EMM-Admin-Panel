import React, { useEffect, useRef, useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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

// 🔹 Reusable Select
const Select = ({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
      {label}
    </label>
    <select
      {...props}
      className="
        border rounded-lg px-3 py-2 text-sm transition
        bg-white dark:bg-gray-800
        border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
    >
      {children}
    </select>
  </div>
);

// 🔹 Reusable Textarea
const Textarea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
      {label}
    </label>
    <textarea
      {...props}
      className="
        border rounded-lg px-3 py-2 text-sm transition
        bg-white dark:bg-gray-800
        border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        resize-none
      "
      rows={3}
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
  const [sign, setSign] = useState<string | null>(null);
  const [aadharFront, setAadharFront] = useState<string | null>(null);
  const [aadharBack, setAadharBack] = useState<string | null>(null);
  const [panCard, setPanCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signRef = useRef<HTMLInputElement>(null);
  const aadharFrontRef = useRef<HTMLInputElement>(null);
  const aadharBackRef = useRef<HTMLInputElement>(null);
  const panCardRef = useRef<HTMLInputElement>(null);

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

  const totalSteps = 5;

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
          {["Personal", "Device", "Financial", "Documents", "Additional"].map((tab, i) => (
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
        <div className="p-5 space-y-5 max-h-[65vh] overflow-y-auto">

          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" name="name" value={formData.name || ""} onChange={onChange} />
              <Input label="Mobile Number" name="mobile_number" value={formData.mobile_number || ""} onChange={onChange} />
              <Input label="Alternate Mobile Number" name="alternate_mobile_number" value={formData.alternate_mobile_number || ""} onChange={onChange} />
              {/* <Input label="Email" name="email" value={formData.email || ""} onChange={onChange} type="email" /> */}
            </div>
          )}

          {/* STEP 2: Device Information */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Type" name="type" value={formData.type || ""} onChange={onChange}>
                <option value="">Select Type</option>
                <option value="new_android">New Android</option>
                <option value="old_android">Old Android</option>
                <option value="new_ios">New iOS</option>
                <option value="old_ios">Old iOS</option>
              </Select>
              <Input label="IMEI 1" name="imei_1" value={formData.imei_1 || ""} onChange={onChange} />
              <Input label="IMEI 2" name="imei_2" value={formData.imei_2 || ""} onChange={onChange} />
            </div>
          )}

          {/* STEP 3: Financial Details */}
          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Product Price (₹)" name="product_price" value={formData.product_price || ""} onChange={onChange} type="number" step="0.01" />
              <Input label="Down Payment (₹)" name="down_payment" value={formData.down_payment || ""} onChange={onChange} type="number" step="0.01" />
              <Input label="Number of Months" name="number_of_months" value={formData.number_of_months || ""} onChange={onChange} type="number" />
              <Input label="Rate of Interest (%)" name="rate_of_interest" value={formData.rate_of_interest || ""} onChange={onChange} type="number" step="0.01" />
              <Input label="Loan Amount (₹)" name="loan_amount" value={formData.loan_amount || ""} onChange={onChange} type="number" step="0.01" />
              <Input label="Per Month EMI (₹)" name="per_month_emi" value={formData.per_month_emi || ""} onChange={onChange} type="number" step="0.01" />
              <Input label="First EMI Date" name="first_emi_date" value={formData.first_emi_date || ""} onChange={onChange} type="date" />
            </div>
          )}

          {/* STEP 4: Documents Upload */}
          {step === 4 && (
            <div className="space-y-5">
              {/* Signature */}
              <div
                onClick={() => signRef.current?.click()}
                className="
                  border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition
                  border-gray-300 dark:border-gray-600
                  hover:border-indigo-400 hover:bg-indigo-50
                  dark:hover:bg-gray-800
                "
              >
                {sign ? (
                  <img src={sign} className="h-24 mx-auto object-cover rounded-md" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xl">✍️</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Customer Signature
                    </p>
                  </div>
                )}
              </div>
              <input ref={signRef} type="file" className="hidden" onChange={(e) => handleFile(e, setSign)} />

              {/* Aadhar Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => aadharFrontRef.current?.click()}
                  className="
                    border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition
                    border-gray-300 dark:border-gray-600
                    hover:border-indigo-400 hover:bg-indigo-50
                    dark:hover:bg-gray-800
                  "
                >
                  {aadharFront ? (
                    <img src={aadharFront} className="h-24 mx-auto object-cover rounded-md" />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">🪪</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Aadhar Front
                      </p>
                    </div>
                  )}
                </div>
                <div
                  onClick={() => aadharBackRef.current?.click()}
                  className="
                    border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition
                    border-gray-300 dark:border-gray-600
                    hover:border-indigo-400 hover:bg-indigo-50
                    dark:hover:bg-gray-800
                  "
                >
                  {aadharBack ? (
                    <img src={aadharBack} className="h-24 mx-auto object-cover rounded-md" />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">🪪</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Aadhar Back
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <input ref={aadharFrontRef} type="file" className="hidden" onChange={(e) => handleFile(e, setAadharFront)} />
              <input ref={aadharBackRef} type="file" className="hidden" onChange={(e) => handleFile(e, setAadharBack)} />

              {/* PAN Card */}
              <div
                onClick={() => panCardRef.current?.click()}
                className="
                  border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition
                  border-gray-300 dark:border-gray-600
                  hover:border-indigo-400 hover:bg-indigo-50
                  dark:hover:bg-gray-800
                "
              >
                {panCard ? (
                  <img src={panCard} className="h-24 mx-auto object-cover rounded-md" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xl">📄</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PAN Card
                    </p>
                  </div>
                )}
              </div>
              <input ref={panCardRef} type="file" className="hidden" onChange={(e) => handleFile(e, setPanCard)} />
            </div>
          )}

          {/* STEP 5: Additional Information */}
          {step === 5 && (
            <div className="space-y-4">
              <Textarea label="Notes" name="notes" value={formData.notes || ""} onChange={onChange} placeholder="Enter any additional notes..." />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="auto_lock"
                  id="auto_lock"
                  checked={formData.auto_lock || false}
                  onChange={onChange}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="auto_lock" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  Enable Auto Lock
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition
                  ${step > i + 1 ? "bg-indigo-600 text-white" : step === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"}
                `}>
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${step > i + 1 ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`} />
                )}
              </div>
            ))}
          </div>
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
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm border rounded-md border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Back
              </button>
            )}

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
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