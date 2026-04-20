import type React from "react";
import { useState } from "react";
import AddCustomerModal from "./AddCuctomerModel";
import { Plus } from "lucide-react";
import api from "../../api/Axios";

const AddCustomerButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    alternate_mobile_number: "",
    imei_1: "",
    imei_2: "",
    image: null as File | null,
    signature: null as File | null,
    product_price: "",
    down_payment: "",
    number_of_months: 0,
    rate_of_interest: "",
    loan_amount: "",
    per_month_emi: "",
    first_emi_date: "",
    notes: "",
    auto_lock: false,
    type: "", 
    aadhar_card_front: null as File | null,
    aadhar_card_back: null as File | null, 
    pan_card: null as File | null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // Create FormData to handle both text fields and file uploads
      const formDataToSend = new FormData();
      console.log(formData);
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && key !== 'signature') {
          
          
          formDataToSend.append(key, (formData as any)[key] as string);
          // console.log(formDataToSend);
          
        }
      });
      
      // Add files if they exist
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      if (formData.signature) {
        formDataToSend.append('signature', formData.signature);
      }
      console.log(formDataToSend);
      
      const token = localStorage.getItem('access_token');
      // console.log(token);
      
            if (!token) {
              console.warn("Token missing. Redirecting to login...");
              return;
            }
      // console.log(formData);
      
      // Make POST request
      await api.post('/crm/customers/add/', formDataToSend, {
        headers: {
          'Authorization':  `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Success - reset form and close modal
      setFormData({
        name: "",
        mobile_number: "",
        alternate_mobile_number: "",
        imei_1: "",
        imei_2: "",
        image: null,
        signature: null,
        product_price: "",
        down_payment: "",
        number_of_months: 0,
        rate_of_interest: "",
        loan_amount: "",
        per_month_emi: "",
        first_emi_date: "",
        notes: "",
        auto_lock: false,
        type: "", 
        aadhar_card_front: null,
        aadhar_card_back: null, 
        pan_card: null,
      });
      setShowModal(false);
      
    } catch (error: any) {
      console.error("Error saving customer:", error.response?.data?.message || error.message);
      setSaveError(error.response?.data?.message || "Failed to save customer. Please try again.");
    } finally {
      setIsSaving(false);
    }
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