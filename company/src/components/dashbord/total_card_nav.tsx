import React from "react"
import TotalCard from "./totalCard";

const TotalNav:React.FC=()=>{
  return(
    <div className="p-2">
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="Total Support Team" value={100}/>
            <TotalCard title="Last Months Support Team Add" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
    </div>
  );
};
export default TotalNav;

