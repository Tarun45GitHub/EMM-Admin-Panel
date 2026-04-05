import React, { useMemo, useState, useCallback, useEffect } from "react";
import Action from "./action";
import toast from "react-hot-toast";
import api from "../../api/Axios";

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  company_name: string;
  gstin?: string;
  wallet?: number | string;
  state_id?: number;
  state?: string;
  city_id?: number;
  city?: string;
  address?: string;
  group?: string;
  username?: string;
  parent_user?: string;
  parent_user_id?: number;
  is_active?: boolean;
  date_joined?: string;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  results: UserData[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface FilterState {
  search?: string;
  state_id?: number | string;
  city_id?: number | string;
  is_active?: boolean;
  from_date?: string;
  to_date?: string;
  group?: string;
}

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "username", label: "Username" },
  { key: "first_name", label: "Name" },
  { key: "mobile_number", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "company_name", label: "Company" },
  { key: "gstin", label: "GSTIN" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "address", label: "Address" },
  { key: "parent_user", label: "Parent User" },
  { key: "wallet", label: "Wallet" },
  { key: "date_joined", label: "Date Joined" },
  { key: "is_active", label: "Status" },
];

interface EntryTableProps {
  filters?: FilterState;
  onUserEdit?: (user: UserData) => void;
  // Props for external data mode (when data is fetched by parent)
  data?: UserData[];
  loading?: boolean;
  page?: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

const EntryTable: React.FC<EntryTableProps> = ({ 
  filters = {}, 
  onUserEdit,
  data,
  loading: externalLoading,
  page: externalPage,
  totalCount: externalTotalCount,
  pageSize: externalPageSize,
  onPageChange
}) => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Determine if we're in external data mode
  const isExternalMode = data !== undefined;
  const currentPage = isExternalMode && externalPage !== undefined ? externalPage : page;
  const currentRowsPerPage = isExternalMode && externalPageSize !== undefined ? externalPageSize : rowsPerPage;
  const currentTotalCount = isExternalMode && externalTotalCount !== undefined ? externalTotalCount : totalCount;
  const currentLoading = isExternalMode && externalLoading !== undefined ? externalLoading : loading;

  // Calculate responsive rows per page
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setRowsPerPage(5);
      else if (width < 1024) setRowsPerPage(6);
      else setRowsPerPage(8);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchUsers = useCallback(async () => {
    // Skip fetching if in external mode
    if (isExternalMode) return;
    
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      const params: Record<string, string | number | boolean> = {
        page: page,
        page_size: rowsPerPage,
      };

      // Add filters to params
      if (filters.search) params.search = filters.search;
      if (filters.state_id) params.state_id = filters.state_id;
      if (filters.city_id) params.city_id = filters.city_id;
      if (filters.is_active !== undefined) params.is_active = filters.is_active;
      if (filters.from_date) params.from_date = filters.from_date;
      if (filters.to_date) params.to_date = filters.to_date;
      if (filters.group) params.group = filters.group;

      const response = await api.get<ApiResponse>('/crm/users/', {
        params,
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        }
      });

      setUsers(response.data.results || []);
      setTotalCount(response.data.count || 0);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Failed to fetch users. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filters, isExternalMode]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Update users when external data changes
  useEffect(() => {
    if (isExternalMode && data) {
      setUsers(data);
    }
  }, [data, isExternalMode]);

  // Update totalCount when external totalCount changes
  useEffect(() => {
    if (isExternalMode && externalTotalCount !== undefined) {
      setTotalCount(externalTotalCount);
    }
  }, [externalTotalCount, isExternalMode]);

  const totalPages = Math.ceil(currentTotalCount / currentRowsPerPage);

  const sortedData = useMemo(() => {
    if (!sortConfig) return users;
    
    return [...users].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof UserData];
      const bValue = b[sortConfig.key as keyof UserData];
      
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, sortConfig]);

  const pageRows = useMemo(() => {
    return sortedData;
  }, [sortedData]);

  const handleToggle = useCallback(async (userId: number, currentState: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(
        `/crm/users/${userId}/`,
        { is_active: !currentState },
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        }
      );
      toast.success("Status updated successfully!");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update status");
      console.error('Toggle error:', err);
    }
  }, [fetchUsers]);

  const handleEdit = useCallback((user: UserData) => {
    if (onUserEdit) {
      onUserEdit(user);
    } else {
      toast.success("Edit mode activated for user " + user.id);
    }
  }, [onUserEdit]);

  const handlePrev = useCallback(() => {
    if (isExternalMode && onPageChange) {
      onPageChange(Math.max(1, currentPage - 1));
    } else {
      setPage((p) => Math.max(1, p - 1));
    }
  }, [isExternalMode, onPageChange, currentPage]);

  const handleNext = useCallback(() => {
    if (isExternalMode && onPageChange) {
      onPageChange(Math.min(totalPages, currentPage + 1));
    } else {
      setPage((p) => Math.min(totalPages, p + 1));
    }
  }, [totalPages, isExternalMode, onPageChange, currentPage]);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  // Loading state
  if (currentLoading) {
    return (
      <div className="py-3 flex justify-center">
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xs border border-gray-100 dark:border-gray-800 p-8 text-center w-full max-w-md">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-3 flex justify-center">
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xs border border-gray-100 dark:border-gray-800 p-8 text-center w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Users</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (users.length === 0 && !currentLoading) {
    return (
      <div className="py-3 flex justify-center">
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xs border border-gray-100 dark:border-gray-800 p-8 text-center w-full max-w-md">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No users found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filters.search || filters.group ? 'Try adjusting your filters.' : 'Add some users to get started.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 flex justify-center ">
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xs border border-gray-100 dark:border-gray-800 overflow-hidden">

        {/* ── Desktop / tablet: horizontal scroll table ── */}
        <div className="w-70 sm:w-130 md:w-150 lg:w-230 xl:w-300 overflow-x-auto scrollbar-custom">
          <div className="min-w-full">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 dark:bg-[#0F172A]/50 text-gray-500 dark:text-gray-400 sticky top-0 z-10">
                <tr>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 dark:border-gray-800 whitespace-nowrap cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="truncate">{col.label}</span>
                        {sortConfig?.key === col.key && (
                          <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 dark:border-gray-800 whitespace-nowrap text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {pageRows.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleEdit(user);
                      }
                    }}
                  >
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm font-mono">
                      {user.id}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {user.username || '-'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {`${user.first_name} ${user.last_name}`}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {user.mobile_number}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm truncate max-w-xs">
                      {user.email}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm truncate max-w-xs">
                      {user.company_name}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {user.gstin || '-'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {user.state || '-'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {user.city || '-'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm truncate max-w-xs">
                      {user.address || '-'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {user.parent_user || '-'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      ₹{typeof user.wallet === 'number' ? user.wallet.toFixed(2) : user.wallet || '0.00'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm">
                      {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.is_active 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Action
                          isActive={user.is_active ?? true}
                          onToggle={() => handleToggle(user.id, user.is_active ?? true)}
                          onEdit={() => handleEdit(user)}
                          onClick={() => handleEdit(user)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile: card layout ── */}
  

        {/* ── Pagination ── */}
       <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryTable;

