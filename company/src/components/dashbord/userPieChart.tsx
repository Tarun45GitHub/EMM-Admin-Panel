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

const UserPieChart: React.FC = ({  }) => {
  return (
    <div>
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h2 className="text-gray-700 font-semibold ">User Type</h2>

     <div className="h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default UserPieChart;
