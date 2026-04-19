import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/Axios";

type CustomerToggleButtonProps = {
  isActive: boolean;
  customerId: string;
  onToggle?: () => void; // Callback to notify parent about toggle
};

const CustomerToggleButton: React.FC<CustomerToggleButtonProps> = ({ 
  isActive, 
  customerId,
  onToggle 
}) => {
  const [localIsActive, setLocalIsActive] = useState(isActive);
  const [loading, setLoading] = useState(false);

  // Sync local state when prop changes
  useEffect(() => {
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
      await api.patch(
        `/crm/customers/${customerId}/`,
        { is_active: newIsActive },
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        }
      );
      
      toast.success(`Customer ${newIsActive ? 'activated' : 'deactivated'} successfully!`);
      
      // Notify parent component if callback provided
      if (onToggle) {
        onToggle();
      }
    } catch (err: any) {
      console.error('Toggle error:', err);
      // Revert the local state if the API call fails
      setLocalIsActive(localIsActive);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to toggle customer status. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
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
      </div>
    </div>
  );
};

export default CustomerToggleButton;