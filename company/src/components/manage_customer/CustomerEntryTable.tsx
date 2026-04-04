import React, { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomerAction from "./CustomerAction";
import CustomerToggleButton from "./CustomerToggleButton";
import api from "../../api/Axios";

interface StateData {
  id: number;
  name: string;
  code?: string;
  country?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  results: StateData[];
  count: number;
  next: string | null;
  previous: string | null;
}

const CustomerEnrtyTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [states, setStates] = useState<StateData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const fetchStates = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      const response = await api.get<ApiResponse>('/crm/states/', {
        params: {
          page: page,
          page_size: rowsPerPage,
        },
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        }
      });

      setStates(response.data.results || []);
      setTotalCount(response.data.count || 0);
    } catch (err: any) {
      console.error('Error fetching states:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to fetch states. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, [page]);

  const handleEdit = (id: number) => {
    toast("Edit state " + id);
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Loading state
  if (loading) {
    return (
      <div className="p-4 flex justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading states...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 flex justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading States</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchStates}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">States List</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total States: {totalCount}</p>
        </div>

        {/* Table Scroll */}
        <div className="w-70 sm:w-130 md:w-150 lg:w-230 xl:w-300 overflow-x-auto scrollbar-custom">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-gray-100 dark:text-gray-600">
              <tr>
                {[
                  "ID", "Name", "Code", "Country", "Status", "Created", "Updated", "Action", "Toggle",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-4 py-3 font-semibold border whitespace-nowrap text-center"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {states.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No states found.
                  </td>
                </tr>
              ) : (
                states.map((state, idx) => (
                  <tr
                    key={state.id}
                    className={`${
                      idx % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                        : "bg-white dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    <td className="px-4 py-2 border text-center font-mono">{state.id}</td>
                    <td className="px-4 py-2 border text-center font-medium">{state.name}</td>
                    <td className="px-4 py-2 border text-center">{state.code || '-'}</td>
                    <td className="px-4 py-2 border text-center">{state.country || '-'}</td>
                    <td className="px-4 py-2 border text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        state.is_active 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}>
                        {state.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-center text-xs">
                      {state.created_at ? new Date(state.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-2 border text-center text-xs">
                      {state.updated_at ? new Date(state.updated_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <CustomerAction
                        onEdit={() => handleEdit(state.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <CustomerToggleButton />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerEnrtyTable;

