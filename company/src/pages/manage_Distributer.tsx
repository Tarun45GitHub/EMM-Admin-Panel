import AddEntrybutton from "../components/manage_user/add_entry_button"
import EntryTable from "../components/manage_user/EntryTable";
import { useEffect } from "react"
import { useLoader } from "../components/ui/LoaderContext"
import TableHeader from "../components/transfer/TableHeader"

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
       <div className="w-full min-h-screen bg-white dark:bg-[#0F172A] p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Distributer</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your Distributer Team </p>
        </div>
        <AddEntrybutton value={"Add Product"} />
      </div>

      {/* Filter and Actions Section */}
      <div className="w-full">
        <TableHeader onFilterChange={() => {}} />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <EntryTable />
      </div>
    </div>
    )
}
export default Distributer;