import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  ChevronDown,
  Lock,
  FileText,
  Layers,
} from "lucide-react";

type SidebarProps = {
  sidebarOpen: boolean;
};

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>("Pages");

  const menu: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/admin",
    },
        {
      label: "Manage Banner",
      icon: <LayoutDashboard size={18} />,
      path: "/banner",
    },
    {
      label: "Users",
      icon: <FileText size={18} />,
      children: [
        { label: "Soupport", icon: <Users size={18} />, path: "/users" },
        { label: "National Dis.", icon: <ShoppingCart size={18} />, path: "/orders" },
        { label: "Super Dis.", icon: <Settings size={18} />, path: "/settings" },
        { label: "Distributer", icon: <Settings size={18} />, path: "/settings" },
        { label: "Retailer", icon: <Settings size={18} />, path: "/settings" },
        { label: "Coustomer", icon: <Settings size={18} />, path: "/settings" },


      ],
    },
    {
      label: "Authentication",
      icon: <Lock size={18} />,
      children: [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ],
    },
    {
      label: "Components",
      icon: <Layers size={18} />,
      children: [
        { label: "Tables", path: "/tables" },
        { label: "Forms", path: "/forms" },
      ],
    },
  ];

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside
      className={` top-0 left-0 h-vh bg-green-500 text-white transition-all duration-300
      ${sidebarOpen ? "w-64" : "w-20"} flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-green-700">
        <h1 className="font-bold text-xl tracking-wide">
          {sidebarOpen ? "logo" : "V"}
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menu.map((item) => {
          // Normal link
          if (item.path) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition
                   ${
                     isActive
                       ? "bg-green-600"
                       : "hover:bg-green-700 text-indigo-100"
                   }`
                }
              >
                <span>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            );
          }

          // Dropdown menu
          return (
            <div key={item.label} className="mx-2">
              <button
                onClick={() => toggleMenu(item.label)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </div>

                {sidebarOpen && (
                  <ChevronDown
                    size={18}
                    className={`transition ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Dropdown items */}
              {openMenu === item.label && sidebarOpen && item.children && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.path || "#"}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-sm transition
                         ${
                           isActive
                             ? "bg-indigo-600"
                             : "hover:bg-indigo-700 text-indigo-200"
                         }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-700 text-sm text-indigo-200">
        {sidebarOpen ? "Admin Panel © 2026" : "©"}
      </div>
    </aside>
  );
}
