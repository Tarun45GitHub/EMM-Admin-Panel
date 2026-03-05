import AddEntrybutton from "../components/manage_user/add_entry_button";
import EntryTable from "../components/manage_user/entry_table";
import { useEffect } from "react";
import { useLoader } from "../components/ui/LoaderContext";
import TableHeader from "../components/transfer/TableHeader";

const SuperDistributer:React.FC=()=>{
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
            <div className="flex flex-col justify-between md:flex-row  ">
               <div className="w-full flex justify-between dark:bg-[#1E293B] rounded-lg mx-5 mt-5 p-2 ">
                 <TableHeader onFilterChange={()=>{}}/>
                <AddEntrybutton value={"SuperDist."}/>
               </div>
            </div>
            <div className="flex-1 min-w-0 dark:bg-[#1E293B] rounded-lg m-4">
                <EntryTable/>
            </div>
        </div>
    )
}
export default SuperDistributer;