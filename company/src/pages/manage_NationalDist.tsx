import React,{useEffect} from "react"
// import CascadingDropdown from "../components/manage_user/cascading_dropdown";
import AddEntrybutton from "../components/manage_user/add_entry_button";
import EntryTable from "../components/manage_user/entry_table";
import { useLoader } from "../components/ui/LoaderContext";
import TableHeader from "../components/transfer/TableHeader";

const NationalDistributer:React.FC=()=>{
    const { showLoader, hideLoader } = useLoader();
         useEffect(() => {
          showLoader();
          const timer = setTimeout(() => {
            hideLoader();
          }, 1000);
      
          return () => clearTimeout(timer)
         }, []);
    return(
        <div className=" text-gray-800
             dark:text-gray-200  w-full ">
            <div className="  ">
               <div className=" flex flex-col lg:flex-row justify-between items-center dark:bg-[#1E293B] rounded-lg m-3 px-2">
                 <TableHeader onFilterChange={()=>{}}/>
              
                <AddEntrybutton value={"N-Dist"} />
               </div>
            </div>
            <div className="flex-1 min-w-0 dark:bg-[#1E293B] rounded-lg m-4">
                <EntryTable/>
            </div>
        </div>
    )
}
export default NationalDistributer;