import React, { useState, useEffect, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { RotateCcw, Loader2 } from "lucide-react";

// Local Component Imports
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import api from "../api/Axios";

// 1. Define the Profile Schema based on your backend structure
interface UserProfile {
    name: string;
    rolle: string;
    wallet_balance:string;
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  
  // 2. Data Fetching Logic
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Adjusted to common naming
        if (!token) throw new Error("No authentication token found");

        const response = await api.get(`/crm/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data.data);
        
        setUser(response.data.data);
        setStatus("success");
      } catch (err) {
        console.error("Layout Fetch Error:", err);
        setStatus("error");
      }
    };

    getProfileData();
  }, []);

  // 3. Prevent unnecessary re-renders of the sidebar/topbar
  const memoizedUser = useMemo(() => user, [user]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0B0E14] transition-colors duration-300">
      {/* Sidebar - Receiving User Data */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar - Receiving User Data */}
        <Topbar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          userData={user}
        />

        {/* Global Action: Refresh */}
        <button
          onClick={() => window.location.reload()}
          title="Reload Page"
          className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-3.5 rounded-full shadow-xl hover:bg-indigo-700 hover:rotate-180 transition-all duration-500 active:scale-90"
        >
          <RotateCcw size={22} />
        </button>

        {/* Page Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700',
            }} 
          />
          
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {status === "loading" ? (
              <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;