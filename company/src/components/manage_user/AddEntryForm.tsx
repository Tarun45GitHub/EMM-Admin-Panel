import React, { useState } from "react";
import LoginDetails from "./EntryFormPage1";
import PersonalDatails from "./EntryFormPage2";
import BusinessDetails from "./EntryFormPage3";

export interface ApplicationData {
  userName: string;
  password: string;
  confirmPassword?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  emailid: string;
  state: string;
  city: string;
  Address: string;
  shop_company: string;
  owner_name: string;
  GST: string;
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
    userName: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    emailid: "",
    state: "",
    city: "",
    Address: "",
    shop_company: "",
    owner_name: "",
    GST: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleFinish = () => onSubmit(formData);

  if (!show) return null;

  const progress = (step / 3) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">

      {/* Modal Container */}
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl dark:bg-gray-800 overflow-hidden relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-100 p-1 rounded-full transition"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-6 py-4 bg-indigo-600 text-white text-center font-semibold text-lg">
          Multi-Step Application Form
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {["Account", "Contact", "Business"].map((label, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-sm font-medium ${
                  step === idx + 1 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    step === idx + 1
                      ? "border-indigo-600 bg-indigo-100"
                      : "border-gray-300"
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-1 bg-gray-200 rounded mt-4">
            <div
              className="absolute top-0 left-0 h-full bg-indigo-600 rounded transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 py-4">
          {step === 1 && (
            <LoginDetails data={formData} handleChange={handleChange} />
          )}
          {step === 2 && (
            <PersonalDatails data={formData} handleChange={handleChange} />
          )}
          {step === 3 && (
            <BusinessDetails data={formData} handleChange={handleChange} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 py-4 bg-gray-100 flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
          >
            Previous
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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