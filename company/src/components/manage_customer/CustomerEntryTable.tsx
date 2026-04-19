import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import CustomerToggleButton from "./CustomerToggleButton";
import api from "../../api/Axios";
import { Link, useNavigate } from "react-router-dom";
import { Edit3 } from "lucide-react";

// Updated interface to match Customer data
interface CustomerData {
  id: string;
  name: string;
  mobile_number?: string;
  type?: string;
  imei_1?: string;
  imei_2?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: CustomerData[];
  };
}


const CustomerEntryTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const rowsPerPage = 5;

  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('access_token');

      // Updated API endpoint and parameters
      const response = await api.get<ApiResponse>('/crm/customers/', {
        params: {
          page: page,
          page_size: rowsPerPage,
          // You can add search filters here later:
          // name: '',
          // mobile_number: '',
        },
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        }
      });
      // console.log('API Response:', response.data.data);

      setCustomers(response.data.data.results || []);
      setTotalCount(response.data.data.count || 0);
    } catch (err: any) {
      console.error('Error fetching customers:', err);
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to fetch customers. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const handleEdit = (id: string) => {
    navigate(`/customer/edit/${id}`);
  };

  const handleCustomerToggle = () => {
    // Refresh the customer list after toggle
    fetchCustomers();
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading) {
    return (
      <div className="p-4 flex justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading customers...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-red-600">Error Loading Customers</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchCustomers}
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
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-full max-w-6xl">

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customers List</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Records: {totalCount}</p>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="text-gray-700 dark:text-gray-300">
                {["ID", "Name", "Mobile Number", "Type", "IMEI 1", "IMEI 2", "Status", "Created", "Updated", "Action"].map(
                  (title) => (
                    <th key={title} className="px-4 py-3 font-semibold border dark:border-gray-700 whitespace-nowrap text-center">
                      {title}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer, idx) => (
                  <tr key={customer.id} className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"}>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center font-mono">{customer.id}</td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center font-medium">{customer.name}</td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center">{customer.mobile_number || '-'}</td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center">{customer.type || '-'}</td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center">{customer.imei_1 || '-'}</td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center">{customer.imei_2 || '-'}</td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${customer.is_active
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}>
                        {customer.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center text-xs">
                      {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center text-xs">
                      {customer.updated_at ? new Date(customer.updated_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-2 border dark:border-gray-700 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <Link
                          to={`/customer/edit/${customer.id}`} // Dynamic URL for editing specific customer
                          onClick={() => handleEdit(customer.id)}
                          className="
          flex items-center gap-1.5 px-3 py-1.5 
          bg-blue-50 dark:bg-blue-900/20 
          text-blue-600 dark:text-blue-400 
          rounded-lg text-xs font-semibold
          hover:bg-blue-100 dark:hover:bg-blue-900/30 
          transition-all duration-200
        "
                        >
                          <Edit3 size={14} />
                          Edit
                        </Link>
                        {/* <CustomerToggleButton 
                          isActive={customer.is_active || false} 
                          customerId={customer.id}
                          onToggle={handleCustomerToggle}
                        /> */}
                      </div>
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

export default CustomerEntryTable;