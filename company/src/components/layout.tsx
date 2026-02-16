import React from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import TopBar from "./ui/Topbar2";
import { Toaster } from "react-hot-toast";

const Layout:React.FC<{children:React.ReactNode}>=({children})=>{
      const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    return(
       <div className="min-h-screen flex bg-gray-100">
             {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen}/> 
       
             {/* Main Section */}
             <div className="flex-1 flex flex-col">
               {/* Topbar */}
               <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       
               {/* Page Content */}
               <div className="page-content dark:bg-gray-700">
                <Toaster/>
                {children}</div>

             </div>  
               
        </div>
    );
};
export default Layout;