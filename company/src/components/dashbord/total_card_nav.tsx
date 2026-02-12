import React from "react"
import TotalCard from "./totalCard";

const TotalNav:React.FC=()=>{
  return(
    <div className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-2">
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-2">
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-2">
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-2">
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
            <TotalCard title="titel1" value={100}/>
        </div>
    </div>
  );
};
export default TotalNav;

