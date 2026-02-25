import React, { useState } from "react";
import toast from "react-hot-toast";
import EditCustomerModal from "./EditCustomerModel";




// Props for the action component
type ActionProps = {
  isActive: boolean;
  onToggle: () =>void;
  onEdit: () => void;
};

const CustomerAction: React.FC<ActionProps> = ({
  isActive,
  onToggle,
  onEdit,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
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
      {/* Active / Inactive Toggle */}
      <div
        onClick={onToggle}
        className={`
          cursor-pointer px-3 py-1 rounded-full text-sm font-medium
          ${
            isActive
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }
        `}
      >
        {isActive ? "Active" : "Inactive"}
      </div>

      {/* Edit Button */}
      <div
        
        className="
          cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium
          hover:bg-blue-600 transition-all
        "
      >
        <button 
        onClick={()=>setModalOpen(true)}>Edit
        <EditCustomerModal
        show={modalOpen}
        onClose={()=>{setModalOpen(false)}}
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSave={onEdit}
        />
        </button>
      </div>
    </div>
  );
};
export default CustomerAction;


