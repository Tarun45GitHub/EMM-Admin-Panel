import React,{useState} from "react";
import AddEntryFromModal from "./add_entry_from";
import toast from "react-hot-toast";


const AddEntrybutton:React.FC=()=>{
    const [modalOpen, setModalOpen] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "" });

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);

    setModalOpen(false);
    toast.success("Application Submitted")
    // setToast({ show: true, message: "Application submitted!" });
  };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-6">
      <button
        onClick={() => setModalOpen(true)}
        className=" bg-indigo-600 text-white rounded-2xl shadow p-5"
      >
        Add New Entry
      </button>

      <AddEntryFromModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      
    </div>

    )
}
export default AddEntrybutton;