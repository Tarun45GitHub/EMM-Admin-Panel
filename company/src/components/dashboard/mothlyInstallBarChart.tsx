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



const MonthlyInstallBarChart: React.FC = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6b7280" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            cursor={{ fill: '#f3f4f6' }}
          />
          <Legend />
          <Bar 
            dataKey="installs" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MonthlyInstallBarChart;

