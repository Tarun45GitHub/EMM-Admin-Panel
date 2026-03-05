import React, { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";




// Props for the action component
type ActionProps = {
  isActive: boolean;
  onToggle: () =>void;
  onEdit: () => void;
};

const CustomerAction: React.FC<ActionProps> = ({
  onEdit
}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    // console.log(showEditModal)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        altPhone: "",
        model: "",
        imei1: "",
        imei2: "",
        image: null,
        signature: null,
      });
      

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
     
   };
   
     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files) {
       setFormData({ ...formData, [e.target.name]: e.target.files[0] });
     }
   };
   
  return (
    <div className="flex justify-items-center space-x-2">
      {/* Edit Button */}
      <div
        onClick={()=>setShowEditModal(true)}
        className="
          cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium
          hover:bg-blue-600 transition-all
        "
      >
        <button>
          <a href="/customer/edit">Edit</a>
        </button>
      </div>
      
      
    </div>
  );
};
export default CustomerAction;


