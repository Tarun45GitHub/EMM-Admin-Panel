import React from "react";
import { Bell, Menu, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "../../hooks/UseThem";
import UserDropdown from "../header/UserDropdown";
import WalletBalance from "../header/WalletBalance";

type TopbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBar: React.FC<TopbarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}: TopbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        
        {/* Left Section (Hamburger + Search on Larger Screens) */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition"
          >
            <Menu size={22} />
          </button>

          {/* Search Input */}
          <div className="relative hidden sm:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Right Section (Icons + Wallet + Profile) */}
        <div className="flex items-center gap-4">
          
          {/* Wallet Balance */}
          <div className="hidden sm:block">
            <WalletBalance balance={500} />
          </div>

          {/* Theme Toggle (Sun / Moon) */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* User Dropdown */}
          <div>
            <UserDropdown />
          </div>
        </div>
      </div>

      {/* Mobile Search (Visible only on small screens) */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
