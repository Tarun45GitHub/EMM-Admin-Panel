import React, { useState, useEffect } from "react";
import { Search, Filter, Calendar, X } from "lucide-react";

interface Props {
  onFilterChange: (filters: any) => void;
}

const categoriesMap: Record<string, string[]> = {
  Electronics: ["Laptops", "Smartphones", "Accessories", "Audio"],
  Fashion: ["Men's Wear", "Women's Wear", "Footwear", "Watches"],
  Home: ["Furniture", "Appliances", "Decor", "Kitchen"],
  Beauty: ["Skincare", "Makeup", "Fragrance", "Haircare"],
};

const TableHeader: React.FC<Props> = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const hasFilters = search || category || subcategory || fromDate || toDate;

  useEffect(() => {
    onFilterChange({ search, category, subcategory, fromDate, toDate });
  }, [search, category, subcategory, fromDate, toDate, onFilterChange]);

  const handleClear = () => {
    setSearch("");
    setCategory("");
    setSubcategory("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="w-full bg-white dark:bg-[#1E293B] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-0 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Level 1: Category */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
            className="flex-1 sm:flex-none px-3 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer min-w-[120px]"
          >
            <option value="">Category</option>
            {Object.keys(categoriesMap).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Level 2: Subcategory */}
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category}
            className="flex-1 sm:flex-none px-3 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            <option value="">Subcategory</option>
            {category && categoriesMap[category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          {/* Date Range Group */}
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl px-2 py-1 flex-1 sm:flex-none justify-between sm:justify-start">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase ml-1 shrink-0">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-transparent border-none p-1 text-sm text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer w-full min-w-[100px] [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-transparent border-none p-1 text-sm text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer w-full min-w-[100px] [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
          </div>

          {/* Clear Button */}
          {hasFilters && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20 rounded-xl text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all animate-in fade-in zoom-in duration-200"
            >
              <X size={14} />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
