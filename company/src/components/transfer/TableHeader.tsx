import React, { useState, useEffect } from "react";

type FilterValues = {
  category: string;
  subcategory: string;
  search: string;
  from: string;
  to: string;
};

const categories = [
  { label: "All", value: "" },
  { label: "Product", value: "product" },
  { label: "Order", value: "order" },
  { label: "User", value: "user" },
];

const subcategoriesMap: Record<string, { label: string; value: string }[]> = {
  product: [
    { label: "All", value: "" },
    { label: "Electronics", value: "electronics" },
    { label: "Apparel", value: "apparel" },
  ],
  order: [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ],
  user: [
    { label: "All", value: "" },
    { label: "Admin", value: "admin" },
    { label: "Customer", value: "customer" },
  ],
};

interface Props {
  onFilterChange: (filters: FilterValues) => void;
}

const TableHeader: React.FC<Props> = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subOptions, setSubOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    setSubOptions(subcategoriesMap[category] || []);
    setSubcategory("");
  }, [category]);

  useEffect(() => {
    onFilterChange({ category, subcategory, search, from, to });
  }, [category, subcategory, search, from, to]);

  const clearAllFilters = () => {
    setCategory("");
    setSubcategory("");
    setSearch("");
    setFrom("");
    setTo("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow p-4">

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded w-full dark:bg-gray-700"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300">Subcategory</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="border px-3 py-2 rounded w-full dark:bg-gray-700"
          >
            {subOptions.map((sub) => (
              <option key={sub.value} value={sub.value}>
                {sub.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* From Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* Clear Button */}
        <div className="flex items-end">
          <button
            onClick={clearAllFilters}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>

      </div>
    </div>
  );
};

export default TableHeader;