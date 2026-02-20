import React, { useState } from "react";

const locationData: Record<string, any> = {
  "West Bengal": {
    Kolkata: ["Salt Lake", "BBD Bagh", "Park Street"],
    Howrah: ["Shibpur", "Benaras Road"],
  },
  Maharashtra: {
    Mumbai: ["Andheri", "Bandra"],
    Pune: ["Shivaji Nagar", "Hadapsar"],
  },
};

const CascadingDropdown: React.FC = () => {
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    area: "",
  });

  const states = Object.keys(locationData);
  const cities = filters.state
    ? Object.keys(locationData[filters.state] || {})
    : [];
  const areas = filters.city ? locationData[filters.state][filters.city] : [];

  const handleClearAll = () => {
    setFilters({ state: "", city: "", area: "" });
  };

  return (
    <div className="mx-2 p-2  w-full">
      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 px-5">
        {/* State Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-200 font-medium mb-1">
            State
          </label>
          <select
            value={filters.state}
            onChange={(e) =>
              setFilters({
                state: e.target.value,
                city: "",
                area: "",
              })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-200 font-medium mb-1">
            City
          </label>
          <select
            value={filters.city}
            onChange={(e) =>
              setFilters({
                ...filters,
                city: e.target.value,
                area: "",
              })
            }
            disabled={!filters.state}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Area Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-200 font-medium mb-1">
            Area
          </label>
          <select
            value={filters.area}
            onChange={(e) =>
              setFilters({ ...filters, area: e.target.value })
            }
            disabled={!filters.city}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400"
          >
            <option value="">All Areas</option>
            {areas.map((a: string) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Tags & Clear */}
      <div className="mt-4 flex flex-wrap gap-3 items-center">
        {filters.state && (
          <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
            State: {filters.state}
          </span>
        )}
        {filters.city && (
          <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
            City: {filters.city}
          </span>
        )}
        {filters.area && (
          <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
            Area: {filters.area}
          </span>
        )}
        {(filters.state || filters.city || filters.area) && (
          <button
            onClick={handleClearAll}
            className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default CascadingDropdown;
