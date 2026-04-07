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
  return (
    <div className="w-full h-80 bg-white pb-10 rounded-xl shadow-md border dark:bg-gray-800">
      <h3 className="text-center font-semibold text-lg text-black dark:text-gray-200 mb-4">
        Monthly Installs
      </h3>

      {/* Added minWidth and minHeight to satisfy the ResizeObserver */}
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ab0" />
          <YAxis stroke="#aa0" />
          <Tooltip />
          <Legend />
          <Bar dataKey="installs" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MonthlyInstallBarChart;

