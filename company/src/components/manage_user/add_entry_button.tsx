import React,{useState} from "react";
import AddEntryFromModal from "./AddEntryForm";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

type ActionProps={
  value:String
}


const AddEntrybutton: React.FC<ActionProps> = ({ value }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setModalOpen(false);
    toast.success("Application Submitted");
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E65F3E] text-white rounded-lg text-sm font-bold hover:bg-[#D54E2D] transition-all shadow-sm active:scale-95"
        type="button"
      >
        <Plus size={18} />
        {value}
      </button>

      <AddEntryFromModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
export default AddEntrybutton;