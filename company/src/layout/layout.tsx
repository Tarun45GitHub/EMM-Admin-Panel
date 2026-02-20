import React from "react";
import { useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Toaster } from "react-hot-toast";
import { RotateCcw } from "lucide-react";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  return (
    <div className="min-h-screen flex bg-gray-200 max-w-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <button
          onClick={() => window.location.reload()}
          className="fixed top-20 right-5 z-50 
                 bg-indigo-600 text-white 
                 p-3 rounded-full shadow-lg 
                 hover:bg-indigo-700 
                 transition duration-300 "
        >
          {/* 🔄 Refresh */}
          <RotateCcw size={20}/>
        </button>
        {/* Page Content */}
        <div className="flex-2 dark:bg-gray-700 w-full  ">
          <Toaster />
          {children}</div>

      </div>

    </div>
  );
};
export default Layout;