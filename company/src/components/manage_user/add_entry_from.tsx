import React, { useState } from "react";

interface ApplicationData {
  name: string;
  email: string;
  message: string;
  deviceModel: string;
  deviceSerial: string;
  bankName: string;
  accountNumber: string;
}

interface MultiStepApplicationModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationData) => void;
}

const AddEntryFromModal: React.FC<MultiStepApplicationModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<ApplicationData>({
    name: "",
    email: "",
    message: "",
    deviceModel: "",
    deviceSerial: "",
    bankName: "",
    accountNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleFinish = () => onSubmit(formData);

  if (!show) return null;

  const progress = (step / 3) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow-md space-y-6 relative">

        {/* Close (X) Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-800 "
        >
          ✕
        </button>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 h-2 rounded overflow-hidden">
          <div
            className="h-2 bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-xl font-semibold text-center">
          Step {step} of 3
        </h2>

        {/* Step 1 — Personal Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 2 — Device Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Device Model</label>
              <input
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Device Serial</label>
              <input
                name="deviceSerial"
                value={formData.deviceSerial}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
        )}

        {/* Step 3 — Bank Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Bank Name</label>
              <input
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Account Number</label>
              <input
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {step < 3 && (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Next
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleFinish}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEntryFromModal;
