import React from "react"
import TotalCard from "./totalCard";
import {Headset,ShieldCheck,Users,Briefcase,Store,User } from "lucide-react";

const TotalNav: React.FC = () => {
    return (
        <div className="p-3 dark:bg-gray-700 rounded-lg">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard title="Total No. Support Team" value="50.8K" change="28.4" positive={true} Icon={Headset} />
                <TotalCard title="Last Month Support Add" value="50.8K" change="28.4" positive={true} Icon={Headset} />
                <TotalCard title="Last Week Support Add" value="50.8K" change="28.4" positive={true} Icon={Headset} />
                <TotalCard title="Last Day Support Add" value="50.8K" change="28.4" positive={true} Icon={Headset} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2  ">
                <TotalCard title="Total No. National Dist. Team" value="50.8K" change="28.4" positive={true} Icon={ShieldCheck} />
                <TotalCard title="Last Month National Dist. Add " value="50.8K" change="28.4" positive={true} Icon={ShieldCheck} />
                <TotalCard title="Last Week National Dist. Add" value="50.8K" change="28.4" positive={true} Icon={ShieldCheck} />
                <TotalCard title="Last Day National Dist. Add" value="50.8K" change="-28.4" positive={true} Icon={ShieldCheck} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard title="Total No. Super Dist. Team" value="50.8K" change="28.4" positive={true} Icon={Users} />
                <TotalCard title="Last Month Super Dist. Add" value="50.8K" change="28.4" positive={true} Icon={Users} />
                <TotalCard title="Last Week Super Dist. Add" value="50.8K" change="28.4" positive={true} Icon={Users} />
                <TotalCard title="Last Day Super Dist. Add" value="50.8K" change="28.4" positive={true} Icon={Users} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2  ">
                <TotalCard title="Total No. Distributor Team" value="50.8K" change="28.4" positive={true} Icon={Briefcase} />
                <TotalCard title="Last Month Distributor Add" value="50.8K" change="28.4" positive={true} Icon={Briefcase} />
                <TotalCard title="Last Week Distributor Add" value="50.8K" change="28.4" positive={true} Icon={Briefcase} />
                <TotalCard title="Last Day Distributor Add" value="50.8K" change="28.4" positive={true} Icon={Briefcase} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard title="Total No. Retailer Team" value="50.8K" change="28.4" positive={true} Icon={Store} />
                <TotalCard title="Last Month Retailer Add" value="50.8K" change="28.4" positive={true} Icon={Store} />
                <TotalCard title="Last Week Retailer Add" value="50.8K" change="28" positive={true} Icon={Store} />
                <TotalCard title="Last Day Retailer Add" value="50.8K" change="28.4" positive={true} Icon={Store} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard title="Total No. Customer Team" value="50.8K" change="28.4" positive={true} Icon={User} />
                <TotalCard title="Last Month Customer Add" value="50.8K" change="28.4" positive={true} Icon={User} />
                <TotalCard title="Last Week Customer Add" value="50.8K" change="28.4" positive={true} Icon={User} />
                <TotalCard title="Last Day Customer Add" value="50.8K" change="28.4" positive={true} Icon={User} />

            </div>
           
        </div>

    );
};
export default TotalNav;

