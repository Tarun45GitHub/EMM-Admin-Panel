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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Multi-Step Application Form</h2>
              <p className="text-sm text-indigo-100">Complete all steps to create your account</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-blue bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Section */}
        <div className="px-6 py-4 bg-gray-50">
          {/* Step Indicators */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { label: "Account", icon: "👤" },
              { label: "Contact", icon: "📱" },
              { label: "Business", icon: "🏢" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-4 font-semibold text-lg transition-all duration-300 ${
                    step === idx + 1
                      ? "border-indigo-600 bg-indigo-100 text-indigo-600 shadow-lg"
                      : step > idx + 1
                      ? "border-green-500 bg-green-100 text-green-600"
                      : "border-gray-300 bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > idx + 1 ? "✓" : item.icon}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  step === idx + 1 ? "text-indigo-600" : "text-gray-500"
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {step} of 3</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {step === 1 && (
            <div className="animate-in slide-in-from-left-2 duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Information</h3>
                <p className="text-gray-600 text-sm">Set up your login credentials</p>
              </div>
              <LoginDetails data={formData} handleChange={handleChange} />
            </div>
          )}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-2 duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
                <p className="text-gray-600 text-sm">Provide your personal contact details</p>
              </div>
              <PersonalDatails data={formData} handleChange={handleChange} />
            </div>
          )}
          {step === 3 && (
            <div className="animate-in slide-in-from-left-2 duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Information</h3>
                <p className="text-gray-600 text-sm">Enter your business details</p>
              </div>
              <BusinessDetails data={formData} handleChange={handleChange} />
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>*marked are required</span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Previous
            </button>

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium shadow-md"
              >
                Next 
                <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium shadow-md"
              >
                Submit
                <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEntryFromModal;
