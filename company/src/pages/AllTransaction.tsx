import CascadingDropdown from "../components/manage_user/cascading_dropdown";
import TransactionTable from "../components/transfer/Transcationtable";
import {useEffect } from "react";
import  { useLoader } from "../components/ui/LoaderContext";

const transactions=[
  {
    "id": "TRX1001",
    "date": "2025-02-12",
    "description": "Subscription Payment",
    "amount": 59.99,
    "status": "Paid"
  },
  {
    "id": "TRX1002",
    "date": "2025-02-10",
    "description": "Refund Issued",
    "amount": -20.00,
    "status": "Paid"
  },
  {
    "id": "TRX1003",
    "date": "2025-02-09",
    "description": "Online Purchase",
    "amount": 120.75,
    "status": "Pending"
  },
  {
    "id": "TRX1004",
    "date": "2025-02-08",
    "description": "Point of Sale Sale",
    "amount": 45.50,
    "status": "Failed"
  },
  {
    "id": "TRX1005",
    "date": "2025-02-05",
    "description": "Refund Credit",
    "amount": -10.25,
    "status": "Paid"
  }
]

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
        <div className="min-h-screen ">
            <div className="flex flex-col">
              <h2 className="text-center p-3  dark:text-gray-200 text-xl">Table 1</h2>
              <CascadingDropdown/>
              <TransactionTable data={transactions}/>
            </div>
           <div>
              <h2 className="text-center p-3  dark:text-gray-200 text-xl">Table 1</h2>
              <CascadingDropdown/>
              <TransactionTable data={transactions}/>
            </div>
          <div>
              <h2 className="text-center p-3  dark:text-gray-200 text-xl">Table 1</h2>
              <CascadingDropdown/>
              <TransactionTable data={transactions}/>
            </div>
           <div>
              <h2 className="text-center p-3  dark:text-gray-200 text-xl">Table 1</h2>
              <CascadingDropdown/>
              <TransactionTable data={transactions}/>
            </div>
           <div>
              <h2 className="text-center p-3  dark:text-gray-200 text-xl">Table 1</h2>
              <CascadingDropdown/>
              <TransactionTable data={transactions}/>
            </div>
        </div>
    );
   
}
export default AllTransaction;