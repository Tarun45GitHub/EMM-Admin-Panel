import React from "react";
import { useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Toaster } from "react-hot-toast";

const Layout:React.FC<{children:React.ReactNode}>=({children})=>{
      const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    return(
       <div className="min-h-screen flex bg-gray-200 max-w-screen">
             {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen}/> 
       
             {/* Main Section */}
             <div className="flex-1 flex flex-col">
               {/* Topbar */}
               <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       
               {/* Page Content */}
               <div className="flex-2 dark:bg-gray-700  ">
                <Toaster/>
                {children}</div>

             </div>  
               
        </div>
    );
};
export default Layout;