import React, { useState } from "react";
import EditEntryModal from "./EditEntryModule";
import toast from "react-hot-toast";
import api from "../../api/Axios";

const initialFormData = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      email: "",
      password: "",
      company_name: "",
      gstin: "",
      state_id: "",
      city_id: "",
      address: "",
      group: "",
      parent_id: "",
};
const parentsList = [
  { id: "parent1", label: "Parent 1" },
  { id: "parent2", label: "Parent 2" },
];



// Props for the action component
type ActionProps = {
  isActive: boolean;
  onEdit:()=>void;
  userId: number;
  onToggle?: () => void; // Callback to notify parent about toggle
};

const Action: React.FC<ActionProps> = ({ isActive, userId }) => {
      const [modalOpen, setModalOpen] = useState(false);
      const [loading, setLoading] = useState(false);
      const [localIsActive, setLocalIsActive] = useState(isActive);
      const [formData, setFormData] = useState(initialFormData);

  // Sync local state when prop changes
  React.useEffect(() => {
    setLocalIsActive(isActive);
  }, [isActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      await api.patch(
        `/crm/users/${userId}/`,
        data,
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        }
      );
      
      toast.success("User updated successfully!");
      setModalOpen(false);
    } catch (err: any) {
      console.error('Update error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to update user. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-items-center space-x-2">
      {/* Active / Inactive Toggle */}
      <button
        onClick={handleFormSubmit}
        className={`
          cursor-pointer px-3 py-1 rounded-full text-sm font-medium
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
          ${
            localIsActive
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }
        `}
      >
          {loading ? "Updating..." : (localIsActive ? "Active" : "Inactive")}
      </button>

      {/* Edit Button */}
      <div
        
        className="
          cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium
          hover:bg-blue-600 transition-all
        "
      >
        <button 
        onClick={()=>setModalOpen(true)}>Edit</button>
        <EditEntryModal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          parents={parentsList}
          formData={formData}
          onChange={handleInputChange}
          onSave={() => {
            setModalOpen(false);
          }} 
          userId={userId.toString()}
        />
      </div>
    </div>
  );
};
export default Action;
