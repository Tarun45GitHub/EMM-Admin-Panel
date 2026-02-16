import React, { useState } from "react";
import {
  House,
  Users,
  User,
  Package,
  ShoppingCart,
  Mail,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  Icon: React.ComponentType<any>;
  path: string;
  subItems?: MenuItem[];
}

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: (path: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  onToggle,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [active, setActive] = useState<string>("1");

  const menuItems: MenuItem[] = [
    { id: "1", title: "Dashboard", Icon: House, path: "/dashboard" },
    {
      id: "2",
      title: "Manage Users",
      Icon: Users,
      path: "/users",
      subItems: [
        { id: "2-1", title: "Support", Icon: User, path: "/users/support" },
        { id: "2-2", title: "National Dis.", Icon: User, path: "/users/national" },
        { id: "2-3", title: "Super Dis", Icon: User, path: "/users/superdis" },
        { id: "2-4", title: "Distributor", Icon: User, path: "/users/distributor" },
        { id: "2-5", title: "Retailer", Icon: User, path: "/users/retailer" },
        { id: "2-6", title: "Customer", Icon: User, path: "/users/customer" },
      ],
    },
    {
      id: "3",
      title: "Transaction",
      Icon: Package,
      path: "/transaction",
      subItems: [
        { id: "3-1", title: "All Transaction", Icon: FileText, path: "/transaction/all" },
        { id: "3-2", title: "My Transaction", Icon: FileText, path: "/transaction/my" },
      ],
    },
    { id: "4", title: "Transfer", Icon: ShoppingCart, path: "/transfer" },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleClick = (item: MenuItem) => {
    setActive(item.id);
    if (item.subItems) handleExpand(item.id);
    if (onNavigate) onNavigate(item.path);
  };

  return (
    <aside
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header + Toggle */}
      <div className="flex items-center justify-between p-4">
        {isOpen && <h2 className="text-lg font-bold">ADMIN</h2>}
        {/* <button
          onClick={onToggle}
          className="p-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button> */}
      </div>

      {/* Search */}
      {isOpen && (
        <div className="p-3">
          <div className="flex items-center bg-gray-700 rounded px-2 py-1">
            <Search size={18} className="text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none w-full text-sm text-white placeholder-gray-400"
            />
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="p-2 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const hasSub = item.subItems && item.subItems.length > 0;
          const isExpanded = expanded.includes(item.id);
          const isActive = active === item.id;

          return (
            <div key={item.id}>
              <button
                onClick={() => handleClick(item)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded ${
                  isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                }`}
              >
                <item.Icon size={18} />
                {isOpen && (
                  <>
                    <span className="flex-1 text-sm">{item.title}</span>
                    {hasSub && (
                      <>
                        {isExpanded ? (
                          <ChevronDown size={14} />
                        ) : (
                          <ChevronRight size={14} />
                        )}
                      </>
                    )}
                  </>
                )}
              </button>

              {/* Submenu */}
              {hasSub && isExpanded && isOpen && (
                <div className="ml-6 space-y-1">
                  {item.subItems!.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActive(sub.id);
                        if (onNavigate) onNavigate(sub.path);
                      }}
                      className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                        active === sub.id ? "bg-indigo-500" : "hover:bg-gray-700"
                      }`}
                    >
                      <sub.Icon size={16} />
                      <span>{sub.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="mt-auto p-4">
          <button className="flex items-center gap-2 w-full px-3 py-2 bg-red-600 rounded hover:bg-red-700">
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
