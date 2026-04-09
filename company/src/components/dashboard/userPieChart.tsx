import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

type DataItem = {
  name: string;
  value: number;
};


const  data: DataItem[]=[
    { name: "Installed", value: 350 },
    { name: "Inactive", value: 120 },
  ]

const COLORS = ["#6366F1", "#22C55E"];

const UserPieChart: React.FC = () => {
  return (
    <div className="w-full h-80">
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
            labelLine={{ stroke: '#9ca3af' }}
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-gray-600 dark:text-gray-300">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPieChart;
