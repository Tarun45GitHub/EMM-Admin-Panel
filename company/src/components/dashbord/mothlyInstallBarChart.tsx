import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

interface MonthlyData {
  month: string;
  installs: number;
}

const data: MonthlyData[] = [
  { month: "Jan", installs: 120 },
  { month: "Feb", installs: 180 },
  { month: "Mar", installs: 140 },
  { month: "Apr", installs: 200 },
  { month: "May", installs: 240 },
  { month: "Jun", installs: 180 },
  { month: "Jul", installs: 220 },
  { month: "Aug", installs: 260 },
  { month: "Sep", installs: 230 },
  { month: "Oct", installs: 280 },
  { month: "Nov", installs: 310 },
  { month: "Dec", installs: 350 },
];



const MonthlyInstallBarChart:React.FC=()=>{
  return(
    
    <div className="w-full h-80 bg-white p-5 rounded-xl shadow-md border ">
      <h3 className="text-center font-semibold text-lg text-black ">
        Monthly Installs
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Legend />
          <Bar dataKey="installs" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
   
  );
};
export default MonthlyInstallBarChart;

