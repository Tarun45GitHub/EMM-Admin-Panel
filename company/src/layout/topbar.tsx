import React from "react";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/UseThem";
import UserDropdown from "../components/header/UserDropdown";
import WalletBalance from "../components/header/WalletBalance";

type TopbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Topbar: React.FC<TopbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xs">

      {/* Green accent strip at the top */}
      <div className="h-0.5 w-full bg-linear-to-r from-green-500 via-green-400 to-emerald-500" />

      <div className="flex items-center justify-between px-3 py-2 md:px-5">

        {/* Left — sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400
            hover:bg-green-50 dark:hover:bg-green-900/20
            hover:text-green-700 dark:hover:text-green-400
            transition-colors duration-150"
          aria-label="Toggle sidebar"
        >
          <Menu size={21} />
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1 md:gap-2">

          {/* Wallet balance */}
          <div className="">
            <WalletBalance balance={500} />
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400
              hover:bg-green-50 dark:hover:bg-green-900/20
              hover:text-green-700 dark:hover:text-green-400
              transition-colors duration-150"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={19} className="text-amber-400" />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Notification bell */}
          <button
            className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400
              hover:bg-green-50 dark:hover:bg-green-900/20
              hover:text-green-700 dark:hover:text-green-400
              transition-colors duration-150"
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
          </button>

          {/* User avatar + dropdown */}
          <UserDropdown />

        </div>
      </div>
    </header>
  );
};

export default Topbar;
