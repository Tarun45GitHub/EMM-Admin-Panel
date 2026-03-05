import { useState } from "react";

const CustomerToggleButton:React.FC=()=>{
    const [isActive,setIsActive]=useState(false);
    const onToggle=()=>{
        if(isActive) setIsActive(false);
        else setIsActive(true);
    }
    return(
        <div>
            <div
                onClick={onToggle}
                className={`
          cursor-pointer px-3 py-1 rounded-full text-sm font-medium
          ${isActive
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
        `}
            >
                {isActive ? "Active" : "Inactive"}
            </div>
        </div>
    );
}
export default CustomerToggleButton;