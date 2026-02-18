import React from "react";

type UserStatCardProps = {
  title: string;
  value: string;
};

const TotalCard: React.FC<UserStatCardProps> = ({ title, value }) => {
  return (
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      {/* 3D Card Container */}
      <div
        className="
          relative group 
          bg-white
          dark:bg-gray-800
          rounded-3xl
          shadow-lg
          px-4 py-2
          transform transition-all duration-300
          hover:-translate-y-1 hover:scale-105 hover:shadow-xl
        "
        style={{ perspective: "1000px" }}
      >
        {/* Soft Background Glow */}
        <span
          className="
            absolute top-0 left-1/2 -translate-x-1/2
            w-40 h-40
            bg-white/30
            rounded-full blur-3xl
            opacity-40
            group-hover:opacity-60
            transition-opacity duration-300
          "
        />

        {/* Content */}
        <div className="relative text-center text-gray-800 dark:text-gray-200">
          <p className="text-0.3lg font-medium">{title}</p>
          <p className=" text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;
