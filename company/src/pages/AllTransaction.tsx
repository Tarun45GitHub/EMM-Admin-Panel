import TransactionTable from "../components/transfer/Transcationtable";
import {useEffect } from "react";
import  { useLoader } from "../components/ui/LoaderContext";
import TableHeader from "../components/transfer/TableHeader";


const AllTransaction:React.FC=()=>{
   const { showLoader, hideLoader } = useLoader();
   useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 1000);

    return () => clearTimeout(timer)
   }, []);

    return(
        <div className="min-h-screen overflow-x-hidden  ">
            <div className="p-2  dark:bg-[#1E293B] m-5  rounded-2xl ">
              <h2 className="text-center px-3 dark:text-gray-200 text-xl">Table 1</h2>
               <div className="  dark:bg-gray-900 rounded-lg mx-5 ">
                <TableHeader onFilterChange={()=>{}}/></div>
              <TransactionTable/>
            </div>
           <div className="p-2  dark:bg-[#1E293B] m-5 rounded-2xl ">
              <h2 className="text-center px-3 dark:text-gray-200 text-xl">Table 1</h2>
               <div className="  dark:bg-gray-900 rounded-lg m-4">
                 <TableHeader onFilterChange={()=>{}}/></div>
              <TransactionTable/>
            </div>
           <div className="p-2  dark:bg-[#1E293B] m-5 rounded-2xl ">
              <h2 className="text-center px-3 dark:text-gray-200 text-xl">Table 1</h2>
               <div className="  dark:bg-gray-900 rounded-lg m-4">
                <TableHeader onFilterChange={()=>{}}/></div>
              <TransactionTable/>
            </div>
            <div className="p-2  dark:bg-[#1E293B] m-5 rounded-2xl ">
              <h2 className="text-center px-3 dark:text-gray-200 text-xl">Table 1</h2>
               <div className="  dark:bg-gray-900 rounded-lg m-4">
                <TableHeader onFilterChange={()=>{}}/></div>
              <TransactionTable/>
            </div>
           <div className="p-2  dark:bg-[#1E293B] m-5 rounded-2xl ">
              <h2 className="text-center px-3 dark:text-gray-200 text-xl">Table 1</h2>
               <div className="  dark:bg-gray-900 rounded-lg m-4"> 
                <TableHeader onFilterChange={()=>{}}/></div>
              <TransactionTable/>
            </div>
        </div>
    );
   
}
export default AllTransaction;