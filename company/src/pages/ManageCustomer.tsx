import { useEffect } from "react";
import { useLoader } from "../components/ui/LoaderContext";
import CustomerEnrtyTable from "../components/manage_customer/CustomerEntryTable";
import TableHeader from "../components/transfer/TableHeader";
import AddCustomerButton from "../components/manage_customer/AddCustomerButtom";

const Customer:React.FC=()=>{
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your Customer team</p>
        </div>
        <AddCustomerButton  />
      </div>

      {/* Filter and Actions Section */}
      <div className="w-full">
        <TableHeader onFilterChange={() => {}} />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <CustomerEnrtyTable />
      </div>
    </div>
    )
}
export default Customer;