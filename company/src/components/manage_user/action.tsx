import React, { useState } from "react";
import EditEntryModal from "./EditEntryModule";
import toast from "react-hot-toast";
import api from "../../api/Axios";
const Appl={
   userName: "johnDoe",
      emailid: "john@example.com",
      first_name: "John",
      middle_name: "",
      last_name: "Doe",
      password: "dfghjkl;'",
      shop_company: "JD Co",
      owner_name: "John Doe",
      Address: "123 Main St",
      GST: "",
      state: "State X",
      city: "City Y",
      pincode: "700001",
      walletIOS: 100,
      walletAndroid: 150,
      pin: "1234",
      parent: "parent1",

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
};

const Action: React.FC<ActionProps> = ({ isActive, userId }) => {
      const [modalOpen, setModalOpen] = useState(false);
      const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      await api.patch(
        `/crm/users/${userId}/`,
        { is_active: !isActive },
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        }
      );
      
      toast.success("Status updated successfully!");
      
    } catch (err: any) {
      console.error('Toggle error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to update status. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
        onClick={handleToggle}
        className={`
          cursor-pointer px-3 py-1 rounded-full text-sm font-medium
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
          ${
            isActive
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }
        `}
      >
          {loading ? "Updating..." : (isActive ? "Active" : "Inactive")}
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
          formData={Appl}
          onChange={() => { } }
          onSave={handleFormSubmit} 
          userId={userId.toString()}
        />
      </div>
    </div>
  );
};
export default Action;


