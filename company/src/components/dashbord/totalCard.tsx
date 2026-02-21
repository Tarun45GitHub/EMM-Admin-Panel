import React from "react";
// import { FiBarChart2 } from "react-icons/fi"; // optional, for icon

type UserStatCardProps = {
  title: string;
  value: string;
  // icon?: React.ReactNode;
};

const TotalCard: React.FC<UserStatCardProps> = ({ title, value }) => {
  return (
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-2">
      <div
        className="
          relative overflow-hidden rounded-3xl
          bg-linear-to-r from-indigo-100 via-gray-100 to-indigo-100
          dark:from-gray-500 dark:via-gray-500 dark:to-gray-500
          shadow-md dark:shadow-xl
          transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300
        "
      >
        {/* Decorative Top Blur */}
        <div
          className="
            absolute -top-8 -left-8 w-32 h-full
            bg-indigo-200/40 dark:bg-indigo-800/40
            rounded-full blur-2xl
            pointer-events-none
          "
        />

        <div className="relative p-1 text-center">
          <div className="flex justify-center items-center mb-1 text-indigo-600 dark:text-indigo-400 text-3xl">
            {/* {icon ?? <FiBarChart2 />} */}
          </div>

          <p className=" font-semibold text-gray-700 dark:text-gray-200 ">
            {title}
          </p>

          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;