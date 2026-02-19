import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative " ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl px-2 py-1 bg-white text-gray-800
                        dark:bg-gray-900 dark:text-gray-200
                        hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="profile"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="hidden md:flex items-center gap-1">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Tarun
          </span>
          <ChevronDown className="text-slate-500 dark:text-slate-400" size={18} />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg animate-fadeIn">
          <ul className="flex flex-col text-sm text-slate-700 dark:text-slate-300">
            <li>
              <a
                href="/profile"
                className="block  px-4 py-3 hover:bg-slate-100 dark:hover:bg-gray-700"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/changepassword"
                className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-gray-700"
              >
               Change Password
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
            </li>
            <li>
              <hr className="my-1 border-slate-200 dark:border-gray-700" />
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-gray-700"
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
