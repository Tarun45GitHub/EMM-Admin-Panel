import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import userIcon from "../assets/favicon.png"

type userData={
   name?: string|null;
    rolle?: string|null;
    wallet_balance?: string|null;
  
}

const UserDropdown=({userData}:{userData: userData | null | undefined}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg
          text-gray-700 dark:text-gray-200
          hover:bg-green-50 dark:hover:bg-green-900/20
          hover:text-green-700 dark:hover:text-green-400
          transition-colors duration-150"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <img
          src={userIcon}
          alt="Admin avatar"
          className="h-8 w-8 rounded-full object-cover ring-2 ring-green-200 dark:ring-green-800/60"
        />
        <div className="hidden md:flex items-center gap-1">
          <span className="text-sm font-semibold">{userData?.name}</span>
          <ChevronDown
            size={15}
            className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-48
          rounded-xl border border-gray-100 dark:border-gray-700
          bg-white dark:bg-gray-900
          shadow-lg shadow-gray-200/60 dark:shadow-black/30
          overflow-hidden z-50">

          {/* User info header */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{userData?.name}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{userData?.rolle}</p>
          </div>

          <ul className="py-1 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center px-4 py-2.5
                  hover:bg-green-50 dark:hover:bg-green-900/20
                  hover:text-green-700 dark:hover:text-green-400
                  transition-colors duration-150"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/changepassword"
                onClick={() => setOpen(false)}
                className="flex items-center px-4 py-2.5
                  hover:bg-green-50 dark:hover:bg-green-900/20
                  hover:text-green-700 dark:hover:text-green-400
                  transition-colors duration-150"
              >
                Change Password
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center px-4 py-2.5
                  hover:bg-green-50 dark:hover:bg-green-900/20
                  hover:text-green-700 dark:hover:text-green-400
                  transition-colors duration-150"
              >
                Settings
              </Link>
            </li>
            <li className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2.5
                  text-red-500 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-900/20
                  transition-colors duration-150"
                onClick={() => alert("Logged out!")}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;