import React from "react";
import MonthlyInstallBarChart from "./mothlyInstallBarChart";
import LifecyclePieChart from "./lifeCyclePieChart";
import UserPieChart from "./userPieChart";

// Icons as SVG components for better visual hierarchy
const BarChartIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const PieChartIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  colorClass: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, icon, children, colorClass }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Chart Header */}
      <div className={`flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-700 ${colorClass}`}>
        <div className={`p-2 rounded-lg ${colorClass.replace('text-', 'bg-').replace('600', '100')} dark:bg-opacity-20`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </div>
      {/* Chart Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

const ChartPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Monthly Installs Bar Chart */}
      <ChartCard
        title="Monthly Installs"
        icon={<BarChartIcon />}
        colorClass="text-blue-600 dark:text-blue-400"
      >
        <MonthlyInstallBarChart />
      </ChartCard>

      {/* Lifecycle Status Pie Chart */}
      <ChartCard
        title="Lifecycle Status"
        icon={<PieChartIcon />}
        colorClass="text-emerald-600 dark:text-emerald-400"
      >
        <LifecyclePieChart />
      </ChartCard>

      {/* User Type Pie Chart */}
      <ChartCard
        title="User Distribution"
        icon={<UsersIcon />}
        colorClass="text-violet-600 dark:text-violet-400"
      >
        <UserPieChart />
      </ChartCard>
    </div>
  );
};

export default ChartPanel;

