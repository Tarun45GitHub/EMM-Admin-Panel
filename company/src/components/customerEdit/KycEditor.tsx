import React, { useState } from "react";
import { Camera, Edit2, Save, X, User, CreditCard } from "lucide-react";

interface KycDetails {
  aadhar_card_front: string;
  aadhar_card_back: string;
  pan_card: string;
}

interface Props {
  initialKyc: KycDetails;
  
}

const KycEditor: React.FC<Props> = ({ initialKyc }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [kyc, setKyc] = useState<KycDetails>(initialKyc);

  const handleInputChange = (field: keyof KycDetails, value: string) => {
    setKyc((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
   
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">KYC Documents</h3>
          <p className="text-sm text-gray-500">Manage identity verification files</p>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isEditing 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300"
          }`}
        >
          {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
          {isEditing ? "Save KYC" : "Edit Documents"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Document Cards */}
        <KycCard
          label="Aadhar Card (Front)"
          value={kyc.aadhar_card_front}
          isEditing={isEditing}
          onChange={(val: string) => handleInputChange("aadhar_card_front", val)}
        />
        <KycCard
          label="Aadhar Card (Back)"
          value={kyc.aadhar_card_back}
          isEditing={isEditing}
          onChange={(val: string) => handleInputChange("aadhar_card_back", val)}
        />
        <KycCard
          label="PAN Card"
          value={kyc.pan_card}
          isEditing={isEditing}
          onChange={(val: string) => handleInputChange("pan_card", val)}
        />
      </div>
    </div>
  );
};

/* --- Sub-component for individual Document Cards --- */
const KycCard = ({ label, value, isEditing, onChange }: any) => {
  return (
    <div className="group relative border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-all hover:border-indigo-400">
      <div className="flex flex-col items-center gap-3">
        {value ? (
          <img src={value} alt={label} className="w-full h-32 object-cover rounded-lg shadow-sm" />
        ) : (
          <div className="w-full h-32 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center text-gray-400">
            <Camera size={32} strokeWidth={1.5} />
            <span className="text-xs mt-2 uppercase font-semibold">No Image</span>
          </div>
        )}

        <div className="w-full">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
          {isEditing ? (
            <input
              type="text"
              className="mt-1 w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste Image URL"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {value ? "Document Uploaded" : "Action Required"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KycEditor;