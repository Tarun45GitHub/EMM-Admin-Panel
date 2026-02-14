import React from "react";
import MonthlyInstallBarChart from "./mothlyInstallBarChart"
import LifecyclePieChart from "./lifeCyclePieChart";
import UserPieChart from "./userPieChart";

const Chartpannel:React.FC=()=>{
  return(
    <div className="grid  sm:grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
            <MonthlyInstallBarChart/>
        </div>
        <div>
            <LifecyclePieChart/>
        </div>
        <div>
            <UserPieChart/>
        </div>
    </div>
  );
};
export default Chartpannel;

