import React, { useState, useEffect, useCallback, useRef } from "react";
import AddEntrybutton from "../components/manage_user/add_entry_button"
import EntryTable, { type UserData } from "../components/manage_user/EntryTable";
import { useLoader } from "../components/ui/LoaderContext"
import TableHeader, { type FilterState as HeaderFilterState } from "../components/transfer/TableHeader"
import api from "../api/Axios"

interface ApiResponse {
 data:{
     total_pages: number; results: UserData[];
  count: number;
  next: string | null;
  previous: string | null;}
}

const SuperDistributer: React.FC = () => {
    const { showLoader, hideLoader } = useLoader();
    const [filters, setFilters] = useState<HeaderFilterState>({
        search: "",
    });
    const [data, setData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [totalCount, setTotalCount] = useState(0);
    
    // Use refs to access latest loader functions without causing re-renders
    const showLoaderRef = useRef(showLoader);
    const hideLoaderRef = useRef(hideLoader);
    
    useEffect(() => {
        showLoaderRef.current = showLoader;
        hideLoaderRef.current = hideLoader;
    }, [showLoader, hideLoader]);

    // Fetch data from backend
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            showLoaderRef.current();
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.warn("Token missing. Redirecting to login...");
                return;
            }
            const params: Record<string, string | number | boolean> = {
                page: page,
                page_size: pageSize,
                group: "Super Distributor",
            };

            // Add filters to params
            if (filters.search) params.search = filters.search;
            if (filters.state_id) params.state_id = filters.state_id;
            if (filters.city_id) params.city_id = filters.city_id;
            if (filters.is_active !== undefined) params.is_active = filters.is_active;
            if (filters.fromDate) params.from_date = filters.fromDate;
            if (filters.toDate) params.to_date = filters.toDate;

            const response = await api.get<ApiResponse>('/crm/users/', {
                params,
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            
            setData(response.data.data.results || []);
            setTotalCount(response.data.data.total_pages || 0);
            
        } catch (err) {
            console.error('Error fetching super distributors:', err);
            setData([]);
        } finally {
            setLoading(false);
            hideLoaderRef.current();
        }
    }, [filters, page, pageSize]);

    // Initial load and when filters/page changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = useCallback((newFilters: HeaderFilterState) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page when filters change
    }, []);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
       <div className="w-full min-h-screen bg-white dark:bg-[#0F172A] p-4 md:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Super Distributor</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your Super Distributor Team</p>
            </div>
            <AddEntrybutton value={"Add Super Dist."} />
        </div>

        {/* Filter and Actions Section */}
        <div className="w-full">
            <TableHeader 
                onFilterChange={handleFilterChange} 
                placeholder="Search by company, mobile, or email..."
                showFilters={true}
            />
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <EntryTable 
                data={data}
                loading={loading}
                page={page}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </div>
    </div>
    )
}

export default SuperDistributer;