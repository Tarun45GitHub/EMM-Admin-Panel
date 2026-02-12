import React from "react";

type UserStatCardProps = {
  title: string;
  value: number;
};

const TotalCard: React.FC<UserStatCardProps> = ({ title="title", value="500" }) => {
  return (
    <div className="bg-white p-1 rounded-xl shadow-md border w-40 h-20">
      <h2 className="text-gray-500 text-sm font-medium text-center">{title}</h2>
      <p className="text-3xl font-bold text-gray-900 mt-2 text-center">{value}</p>
    </div>
  );
};

export default TotalCard;
