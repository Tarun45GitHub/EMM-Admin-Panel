import React from "react";
import { Bell, Menu, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "../hooks/UseThem";
import UserDropdown from "../components/header/UserDropdown";
import WalletBalance from "../components/header/WalletBalance";

type TopbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Topbar: React.FC<TopbarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">

      {/* Top Row */}
      <div className="flex items-center justify-between px-3 py-2 md:px-6">

        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-40 md:w-56 lg:w-64
                pl-10 pr-4 py-2
                rounded-xl
                border border-gray-200 dark:border-gray-700
                bg-gray-100 dark:bg-gray-800
                text-sm text-gray-700 dark:text-gray-200
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Wallet (Desktop Only) */}
          <div className="hidden md:block">
            <WalletBalance balance={500} />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Notification */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* User Profile */}
          <UserDropdown />

        </div>
      </div>

      {/* Mobile Section */}
      <div className="md:hidden px-3 pb-3 flex flex-row gap-2 ">

        {/* Mobile Search */}
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-full
              pl-10 pr-4 py-2
              rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-gray-100 dark:bg-gray-800
              text-sm text-gray-700 dark:text-gray-200
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* Wallet Mobile */}
        <div className="flex gap-2">
        <div><WalletBalance balance={500} /></div>
        <div className="hidden"><WalletBalance balance={500} /></div>
        </div>
      </div>

    </header>
  );
};

export default Topbar;