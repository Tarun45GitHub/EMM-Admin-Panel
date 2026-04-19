import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  House,
  Users,
  ShoppingCart,
  Settings,
  ChevronDown,
  FileText,
  ReceiptText,
  Search,
  X,
} from "lucide-react";
import CompanyLogo from "../components/assets/CompanyLogo.png"

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type MenuItem = {
  label: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
  path?: string;
  children?: MenuItem[];
};

const MENU: MenuItem[] = [
  { label: "Dashboard", Icon: House, path: "/dashboard" },
  { label: "Manage Banner", Icon: FileText, path: "/banner" },
  {
    label: "Users",
    Icon: Users,
    children: [
      { label: "Support", path: "/users/support" },
      { label: "National Dis.", path: "/users/national" },
      { label: "Super Dis.", path: "/users/superdis" },
      { label: "Distributor", path: "/users/distributor" },
      { label: "Retailer", path: "/users/retailer" },
      { label: "Customer", path: "/users/customer" },
    ],
  },
  {
    label: "Transaction",
    Icon: ReceiptText,
    path: "/transaction/my"
  },
  { label: "Transfer", Icon: ShoppingCart, path: "/transfer" },
  { label: "Settings", Icon: Settings, path: "/settings" },
];

function isParentActive(item: MenuItem, pathname: string): boolean {
  return item.children?.some((c) => c.path && pathname.startsWith(c.path)) ?? false;
}

interface SidebarContentProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
}

function SidebarContent({
  sidebarOpen,
  setSidebarOpen,
  isMobile = false,
}: SidebarContentProps) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-expand parent menu if a child route is currently active
  useEffect(() => {
    const activeParent = MENU.find(
      (item) => item.children && isParentActive(item, location.pathname)
    );
    if (activeParent) setOpenMenu(activeParent.label);
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  // Close mobile sidebar on navigation
  const handleNavClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  // Search filters both top-level and child labels
  const filteredMenu = MENU.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.children?.some((c) =>
        c.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-green-800/50 shrink-0 dark:border-gray-700/50">
        {sidebarOpen ? (
          <img src={CompanyLogo} alt="CompanyLogo" className="h-20 w-40"  />
        ) : (
          <span className="font-bold text-base mx-auto">AP</span>
        )}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition ml-2"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search — only visible when expanded */}
      {sidebarOpen && (
        <div className="px-3 py-2.5 shrink-0">
          <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-700/60 px-3 py-2 rounded-lg border border-white/10 dark:border-gray-600/40 focus-within:border-white/30 transition-colors">
            <Search size={14} className="text-green-200 dark:text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu..."
              className="w-full bg-transparent text-sm text-white placeholder-green-300/60 dark:placeholder-gray-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-green-300/70 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-green-500/40
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-gray-600"
      >
        {filteredMenu.map((item) => {
          const parentActive = item.children
            ? isParentActive(item, location.pathname)
            : false;
          const isOpen = openMenu === item.label;

          if (item.path) {
            // Leaf nav item with optional tooltip in collapsed state
            return (
              <div key={item.label} className="relative group/navitem">
                <NavLink
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                    ${sidebarOpen ? "" : "justify-center"}
                    ${
                      isActive
                        ? "bg-white/20 text-white shadow-sm"
                        : "text-green-100 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/60 hover:text-white"
                    }`
                  }
                >
                  {item.Icon && <item.Icon size={18} className="shrink-0" />}
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </NavLink>

                {/* Tooltip — only in collapsed/icon-only mode */}
                {!sidebarOpen && (
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[100]
                      px-2.5 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium
                      rounded-lg shadow-xl border border-gray-700
                      opacity-0 pointer-events-none
                      group-hover/navitem:opacity-100
                      transition-opacity duration-200 whitespace-nowrap"
                  >
                    {item.label}
                    {/* Arrow */}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-800" />
                  </div>
                )}
              </div>
            );
          }

          // Parent item with collapsible children
          return (
            <div key={item.label} className="relative group/navitem">
              <button
                onClick={() => toggleMenu(item.label)}
                aria-expanded={isOpen}
                className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-150
                  ${sidebarOpen ? "justify-between" : "justify-center"}
                  ${
                    parentActive && !isOpen
                      ? "bg-white/10 text-white dark:bg-gray-700/50"
                      : "text-green-100 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/60 hover:text-white"
                  }`}
              >
                <div className={`flex items-center gap-3 ${!sidebarOpen ? "justify-center" : ""}`}>
                  {item.Icon && <item.Icon size={18} className="shrink-0" />}
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </div>
                {sidebarOpen && (
                  <ChevronDown
                    size={15}
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* Tooltip in collapsed state */}
              {!sidebarOpen && (
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[100]
                    px-2.5 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium
                    rounded-lg shadow-xl border border-gray-700
                    opacity-0 pointer-events-none
                    group-hover/navitem:opacity-100
                    transition-opacity duration-200 whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-800" />
                </div>
              )}

              {/* Smooth animated submenu */}
              {sidebarOpen && item.children && (
                <div
                  className={`overflow-hidden transition-all duration-250 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"}`}
                >
                  <div className="ml-4 pl-3 border-l border-white/20 dark:border-gray-600/50 space-y-0.5 py-1">
                    {item.children
                      .filter((c) =>
                        searchQuery
                          ? c.label.toLowerCase().includes(searchQuery.toLowerCase())
                          : true
                      )
                      .map((child) => (
                        <NavLink
                          key={child.label}
                          to={child.path || "#"}
                          onClick={handleNavClick}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg text-sm transition-all duration-150
                            ${
                              isActive
                                ? "bg-white/20 text-white font-medium"
                                : "text-green-200 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-gray-700/60 hover:text-white"
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className={`px-4 py-3 border-t border-green-800/50 dark:border-gray-700/50
          text-xs text-green-300/60 dark:text-gray-500 shrink-0
          ${!sidebarOpen ? "text-center" : ""}`}
      >
        {sidebarOpen ? "Admin Panel © 2026" : "©"}
      </div>
    </>
  );
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`
          sticky top-0 z-40 h-screen shrink-0
          bg-linear-to-b from-green-600 to-green-700
          dark:from-[#0F172A] dark:to-[#0F172A]
          text-white flex flex-col
          transition-all duration-300 ease-in-out
          hidden lg:flex
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        <SidebarContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* ── Mobile: Backdrop overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden
          transition-opacity duration-300
          ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Sidebar (slide-in) ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-linear-to-b from-green-600 to-green-700
          dark:from-[#0F172A] dark:to-[#0F172A]
          text-white flex flex-col
          transition-transform duration-300 ease-in-out
          lg:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent
          sidebarOpen={true}
          setSidebarOpen={setSidebarOpen}
          isMobile
        />
      </aside>
    </>
  );
}
