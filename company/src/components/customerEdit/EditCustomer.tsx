import type React from "react";
import PersonalDetails from "./PersonalDetails";
import RetailerDetails from "./RetailerDetails";
import DeviceDetails from "./DeviceDetails";
import EmiTable from "./EmiTable";
import CommandButtons from "./CommndButton";

const emiData = [
    {
      id: 1,
      price: 500000,
      downPayment: 50000,
      interestRate: 9.5,
      tenure: 60,
      perMonthEmi: 10582,
      pendingEmi: 15,
    },
    {
      id: 2,
      price: 750000,
      downPayment: 75000,
      interestRate: 10,
      tenure: 72,
      perMonthEmi: 13745,
      pendingEmi: 20,
    },
]

const CustomerEdit:React.FC=()=>{
    return(
        <div className="min-w-full p-5">
            <div className="flex flex-col-reverse sm:flex-row justify-around">
                <div className="flex flex-col ">
                    <div className="grid grid-cols-1  lg:grid-cols-3 lg:gap-3 ">
                        <div className="px-1"><PersonalDetails/></div>
                        <div className="px-1"><RetailerDetails/> </div>
                        <div className="px-1"><DeviceDetails/> </div>
                    </div>
                    <div className="flex items-center justify-center"><EmiTable data={emiData}/> </div>
                </div>
                <div className=""><CommandButtons/> </div>
            </div>
        </div>
    )
}
export default CustomerEdit;