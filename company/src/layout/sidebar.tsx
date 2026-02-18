import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Users,
  ShoppingCart,
  Settings,
  ChevronDown,
  FileText,
  ReceiptText,
  Search,
 
} from "lucide-react";

type SidebarProps = {
  sidebarOpen: boolean;
};

type MenuItem = {
  label: string;
  Icon?: React.ComponentType<any>;
  path?: string;
  children?: MenuItem[];
};

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const menu: MenuItem[] = [
    {
      label: "Dashboard",
      Icon: House,
      path: "/admin",
    },
    {
      label: "Manage Banner",
      Icon: FileText,
      path: "/banner",
    },
    {
      label: "Users",
      Icon: Users,
      children: [
        { label: "Support", path: "/users/support", Icon: Users },
        { label: "National Dis.", path: "/users/national", Icon: Users },
        { label: "Super Dis.", path: "/users/superdis", Icon: Users },
        { label: "Distributor", path: "/users/distributor", Icon: Users },
        { label: "Retailer", path: "/users/retailer", Icon: Users },
        { label: "Customer", path: "/users/customer", Icon: Users },
      ],
    },
    {
      label: "Transaction",
      Icon: ReceiptText,
      children: [
        { label: "My Transactions", path: "/transaction/my" },
        { label: "All Transactions", path: "/transaction/all" },
      ],
    },
    {
      label: "Transfer",
      Icon: ShoppingCart,
      path: "/transfer",
    },
    {
      label: "Settings",
      Icon: Settings,
      path: "/settings",
    },
  ];

  const filteredMenu = menu.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside
      className={`
       sticky top-0 z-50
        h-screen bg-linear-to-b from-green-600 to-green-700 text-white 
        transition-all duration-300
        ${sidebarOpen ? "w-65" : "w-20"}
        flex flex-col
        dark:bg-gray-900 
      `}
    >
      {/* Logo + Toggle */}
      <div className="h-18 flex items-center px-4 border-b border-green-800  dark:bg-gray-900  ">
        <h1 className="font-bold text-xl tracking-wide">
          {sidebarOpen ? "Admin Panel" : "AP"}
        </h1>
      </div>

      {/* Search Box */}
      {sidebarOpen && (
        <div className="p-3  dark:bg-gray-900 ">
          <div className="flex items-center bg-green-500/50 px-3 py-2 rounded-lg dark:bg-gray-700">
            <Search size={18} className="text-green-200" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="ml-2 w-full bg-transparent text-sm text-white placeholder-green-200 focus:outline-none  dark:border-gray-700"
            />
          </div>
        </div>
      )}

      {/* Menu Items with Scroll */}
      <nav
        className="flex-1 overflow-y-auto px-2 py-4 space-y-1
          [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-green-800
          [&::-webkit-scrollbar-thumb]:bg-green-500 [&::-webkit-scrollbar-thumb]:rounded  dark:bg-gray-900 "
      >
        {filteredMenu.map((item) =>
          item.path ? (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm
                 ${
                   isActive
                     ? "bg-green-500 text-white "
                     : "hover:bg-green-700 text-green-100  dark:bg-gray-900 "
                 }`
              }
            >
              {item.Icon && <item.Icon size={18} />}
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ) : (
            <div key={item.label} className="mx-1">
              <button
                onClick={() => toggleMenu(item.label)}
                className="flex justify-between items-center w-full px-4 py-3 rounded-lg hover:bg-green-700 transition"
              >
                <div className="flex items-center gap-3">
                  {item.Icon && <item.Icon size={18} />}
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </div>
                {sidebarOpen && (
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

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
                             ? "bg-green-800 text-white"
                             : "hover:bg-green-700 text-green-200  dark:bg-gray-900 "
                         }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-700 text-sm text-indigo-200  dark:bg-gray-950 ">
        {sidebarOpen ? "Admin Panel © 2026" : "©"}
      </div>
    </aside>
  );
}
