import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import api from "../../api/Axios";

interface Props {
  onFilterChange: (filters: FilterState) => void;
  placeholder?: string;
  showFilters?: boolean;
}

export interface FilterState {
  search: string;
  state_id?: number | string;
  city_id?: number | string;
  is_active?: boolean;
  fromDate?: string;
  toDate?: string;
}

interface StateData {
  id: number;
  name: string;
}

interface CityData {
  id: number;
  name: string;
  state_id: number;
}

interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

const TableHeader: React.FC<Props> = ({ 
  onFilterChange, 
  placeholder = "Search...",
  showFilters = true
}) => {
  const [search, setSearch] = useState("");
  const [stateId, setStateId] = useState<number | string>("");
  const [cityId, setCityId] = useState<number | string>("");
  const [isActive, setIsActive] = useState<string>("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  // State and city data
  const [states, setStates] = useState<StateData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  
  // Ref to track previous filter values to avoid infinite loops
  const prevFiltersRef = useRef<{
    search: string;
    state_id?: number | string;
    city_id?: number | string;
    is_active?: boolean;
    fromDate?: string;
    toDate?: string;
  } | null>(null);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const token = localStorage.getItem('token');
        const response = await api.get<PaginatedResponse<StateData>>('/crm/states/', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        });
        setStates(response.data.results || []);
      } catch (err) {
        console.error('Error fetching states:', err);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (!stateId) {
        setCities([]);
        setCityId("");
        return;
      }

      try {
        setLoadingCities(true);
        const token = localStorage.getItem('token');
        const response = await api.get<PaginatedResponse<CityData>>('/crm/cities/', {
          params: { state_id: stateId },
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        });
        setCities(response.data.results || []);
        setCityId(""); // Reset city when state changes
      } catch (err) {
        console.error('Error fetching cities:', err);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [stateId]);

  const hasFilters = search || stateId || cityId || isActive || fromDate || toDate;

  // Notify parent of filter changes
  useEffect(() => {
    const filterParams: FilterState = {
      search,
      state_id: stateId,
      city_id: cityId,
      fromDate,
      toDate,
    };

    // Only include is_active if explicitly set
    if (isActive !== "") {
      filterParams.is_active = isActive === "true";
    }

    // Check if filters actually changed to avoid infinite loops
    const prevFilters = prevFiltersRef.current;
    const filtersChanged = !prevFilters || 
      prevFilters.search !== search ||
      prevFilters.state_id !== stateId ||
      prevFilters.city_id !== cityId ||
      prevFilters.is_active !== filterParams.is_active ||
      prevFilters.fromDate !== fromDate ||
      prevFilters.toDate !== toDate;

    if (filtersChanged) {
      prevFiltersRef.current = {
        search,
        state_id: stateId,
        city_id: cityId,
        is_active: filterParams.is_active,
        fromDate,
        toDate,
      };
      onFilterChange(filterParams);
    }
  }, [search, stateId, cityId, isActive, fromDate, toDate, onFilterChange]);

  const handleClear = () => {
    setSearch("");
    setStateId("");
    setCityId("");
    setIsActive("");
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
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all"
          />
        </div>

        {/* Filters Group */}
        {showFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {/* State Filter */}
          <select
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            disabled={loadingStates}
            className="flex-1 sm:flex-none px-3 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>

          {/* City Filter */}
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            disabled={!stateId || loadingCities}
            className="flex-1 sm:flex-none px-3 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            className="flex-1 sm:flex-none px-3 py-2 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer min-w-[100px]"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
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
        )}
      </div>
    </div>
  );
};

export default TableHeader;