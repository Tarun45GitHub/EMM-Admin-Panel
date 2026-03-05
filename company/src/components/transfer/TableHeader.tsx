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

  // update subcategories when category changes
  useEffect(() => {
    setSubOptions(subcategoriesMap[category] || []);
    setSubcategory("");
  }, [category]);

  // notify parent whenever filters change
  useEffect(() => {
    onFilterChange({ category, subcategory, search, from, to });
  }, [category, subcategory, search, from, to]);

  // clear all filters
  const clearAllFilters = () => {
    setCategory("");
    setSubcategory("");
    setSearch("");
    setFrom("");
    setTo("");
  };

  return (
    <div className="dark:bg-gray-900 rounded-lg ">
    <div className="bg-white px-3 rounded-lg shadow flex flex-row gap-5 dark:bg-gray-800
     dark:text-gray-200">
      {/* Category dropdown */}
      <div className="flex flex-row gap-2">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 dark:text-gray-300">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value} className="dark:bg-gray-700">
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory dropdown */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 dark:text-gray-200">Subcategory</label>
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {subOptions.map((sub) => (
            <option key={sub.value} value={sub.value} className="dark:bg-gray-700">
              {sub.label}
            </option>
          ))}
        </select>
      </div>
      </div>

      {/* Search input */}
      <div className="flex flex-col grow  ">
        <label className="text-sm text-gray-600 dark:text-gray-200">Search</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border px-3 py-2 rounded"
        />
      </div>
      <div className="flex flex-row gap-2 ">
      {/* Date from input */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 dark:text-gray-200">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Date to input */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 dark:text-gray-200">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border px-3 py-2 rounded dark:texr"
        />
      </div>
      </div>
      <div className="flex justify-center p-4">
      {/* Clear filters button */}
      <button
        onClick={clearAllFilters}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear Filters
      </button>
      </div>
    </div>
    </div>
  );
};

export default TableHeader;