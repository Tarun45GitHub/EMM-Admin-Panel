import type React from "react";
import { useState } from "react";
import AddCustomerModal from "./AddCuctomerModel";
import { Plus } from "lucide-react";



const AddCustomerButton:React.FC = () => {
  const [showModal, setShowModal] = useState(false);
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

  const handleSave = () => {
    console.log("Customer saved:", formData);
    setShowModal(false);
  };

  return (
    <div className=" dark:bg-[#1E293B]  rounded-lg p-3 ">
        <button
        onClick={() => setShowModal(true)}
          className="bg-white text-center w-48 rounded-2xl h-10 relative text-black text-xl font-semibold group"
          type="button"
        >
          <div
            className="bg-green-400 rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-1 group-hover:w-46 z-10 duration-500"
          >
            <Plus
            size={30}
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </Plus>
            
          </div>
          <p className="translate-x-2"> Customer</p>
        </button>
         <AddCustomerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSave={handleSave}
      />

      
    </div>
  );
};
 export default AddCustomerButton;