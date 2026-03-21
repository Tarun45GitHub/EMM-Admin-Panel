import React from "react";
import MonthlyInstallBarChart from "./mothlyInstallBarChart"
import LifecyclePieChart from "./lifeCyclePieChart";
import UserPieChart from "./userPieChart";

const Chartpannel:React.FC=()=>{
  return(
    <div className="grid  sm:grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="p-2 dark:bg-gray-700 rounded-lg">
            <MonthlyInstallBarChart/>
        </div>
        <div className="p-2 dark:bg-gray-700 rounded-lg">
            <LifecyclePieChart/>
        </div>
        <div className="p-2 dark:bg-gray-700 rounded-lg">
            <UserPieChart/>
        </div>
    </div>
  );
};
export default Chartpannel;

