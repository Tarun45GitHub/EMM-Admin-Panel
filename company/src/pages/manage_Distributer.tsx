import AddEntrybutton from "../components/manage_user/add_entry_button"
import CascadingDropdown from "../components/manage_user/cascading_dropdown"
import EntryTable from "../components/manage_user/entry_table"
import { useEffect } from "react"
import { useLoader } from "../components/ui/LoaderContext"

const Distributer:React.FC=()=>{
    const { showLoader, hideLoader } = useLoader();
         useEffect(() => {
          showLoader();
          const timer = setTimeout(() => {
            hideLoader();
          }, 1000);
      
          return () => clearTimeout(timer)
         }, []);
    return (
        <div className="bg-gray-200 b text-gray-800
                dark:bg-gray-700 dark:text-gray-200  w-full ">
            <div className="flex flex-col md:flex-row ">
                <CascadingDropdown/>
                <AddEntrybutton/>
            </div>
            <div className="flex-1 min-w-0">
                <EntryTable/>
            </div>
        </div>
    )
}
export default Distributer;