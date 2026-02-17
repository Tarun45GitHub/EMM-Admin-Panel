import React from "react"
import TotalCard from "./totalCard";

const TotalNav:React.FC=()=>{
  return(
    <div className="p-2">
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="Total No. of Support Team" value="5984"/>
            <TotalCard title="Last Month Support Add" value="0345"/>
            <TotalCard title="Last Week Support Add" value="0025"/>
            <TotalCard title="Yesterday Support Add " value="0007"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="Total No. of National Dis." value="3465"/>
            <TotalCard title="Last Month National Dis. Add" value="0297"/>
            <TotalCard title="Last Week National Dis. Add" value="0028"/>
            <TotalCard title="Yesterday National Dis. Add" value="0003"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="Total No. of Super Dis." value="5642"/>
            <TotalCard title="Last Month Super Dis. Add" value="0457"/>
            <TotalCard title="Last Week Super Dis. Add" value="0013"/>
            <TotalCard title="Yesterday Super Dis. Add" value="0001"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="Total No. of Distributer" value="0000"/>
            <TotalCard title="Last Month Distributer Add" value="0000"/>
            <TotalCard title="Last Week Distributer Add" value="0000"/>
            <TotalCard title="Yesterday Distributer Add" value="0000"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="Total No. of Retailer" value="0000"/>
            <TotalCard title="Last Month Retailer Add" value="0000"/>
            <TotalCard title="Last Week Retailer Add" value="0000"/>
            <TotalCard title="Yesterday Retailer Add" value="0000"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 gap-4 p-2">
            <TotalCard title="Total No. of Customer" value="0000"/>
            <TotalCard title="Last Month Customer Add" value="0000"/>
            <TotalCard title="Last Week Customer Add" value="0000"/>
            <TotalCard title="Yesterday Customer Add" value="0000"/>
        </div>
    </div>
  );
};
export default TotalNav;

