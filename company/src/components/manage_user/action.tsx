import React, { useState } from "react";
// import EditEntryModal from "./EditEntryModule";
import toast from "react-hot-toast";
import api from "../../api/Axios";



// Props for the action component
type ActionProps = {
  isActive: boolean|undefined;
  onEdit:()=>void;
  onToggle?: () => void; // Callback to notify parent about toggle
  userId: number;
};

const Action: React.FC<ActionProps> = ({ isActive, onEdit, onToggle, userId }) => {
      const [loading, setLoading] = useState(false);
      const [localIsActive, setLocalIsActive] = useState(isActive);

  // Sync local state when prop changes
  React.useEffect(() => {
    setLocalIsActive(isActive);
  }, [isActive]);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      // Toggle the local state immediately for better UX
      const newIsActive = !localIsActive;
      setLocalIsActive(newIsActive);
      
      // Send the update to the server
      const response=await api.patch(
        `/crm/users/${userId}/`,
        { is_active: newIsActive },
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response);
      
      toast.success(`User ${newIsActive ? 'activated' : 'deactivated'} successfully!`);
      
      // Notify parent about toggle
      if (onToggle) {
        onToggle();
      }
    } catch (err: any) {
      console.error('Toggle error:', err);
      // Revert the local state if the API call fails
      setLocalIsActive(localIsActive);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to toggle user status. Please try again.';
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
        onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};
export default Action;
