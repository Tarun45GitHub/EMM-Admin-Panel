import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface LifeCycleData {
  name: string;
  value: number;
}

const data: LifeCycleData[] = [
  { name: "Installed", value: 350 },
  { name: "Inactive", value: 120 },
  { name: "Uninstalled", value: 80 }
];

const COLORS = ["#22c55e", "#f87171", "#9ca3af"];

const LifecyclePieChart: React.FC = () => {
  return (
    <div >
    <div className="w-full h-80 bg-white p-5 rounded-xl shadow-md border ">
      <h3 className="text-center text-lg text-black ">
        Lifecycle Status
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default LifecyclePieChart;
