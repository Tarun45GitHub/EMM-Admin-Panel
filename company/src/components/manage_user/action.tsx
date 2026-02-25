import React, { useState } from "react";
import EditEntryModal from "./EditEntryModule";
import toast from "react-hot-toast";
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
  onToggle: () =>void;
  onEdit: () => void;
};

const Action: React.FC<ActionProps> = ({
  isActive,
  onToggle,
  onEdit,
}) => {
      const [modalOpen, setModalOpen] = useState(false);
      

   const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);

    setModalOpen(false);
    toast.success("Application Submitted")
    // setToast({ show: true, message: "Application submitted!" });
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
        onClick={()=>setModalOpen(true)}>Edit</button>
        <EditEntryModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        parents={parentsList} 
        formData={Appl}
        onChange={(e) => {}}
        onSave={()=>handleFormSubmit}
          />
      </div>
    </div>
  );
};
export default Action;


