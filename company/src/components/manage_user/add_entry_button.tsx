import React,{useState} from "react";
import AddEntryFromModal from "./add_entry_from";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";


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
        <div className="mt-8 mx-5 ">
        <button
        onClick={() => setModalOpen(true)}
          className="bg-white text-center w-48 rounded-2xl h-10 relative text-black text-xl font-semibold group"
          type="button"
        >
          <div
            className="bg-green-400 rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
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
          <p className="translate-x-2">Add Entry</p>
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