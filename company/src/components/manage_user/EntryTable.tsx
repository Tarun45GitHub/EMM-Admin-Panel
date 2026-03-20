import React, { useMemo, useState, useCallback, useEffect } from "react";
import Action from "./action";
import toast from "react-hot-toast";

type RowData = {
  [key: string]: string | number;
};

const data: RowData[] = Array.from({ length: 30 }).map((_, i) => ({
  col1: `R${i + 1}C1`,
  col2: `R${i + 1}C2`,
  col3: `R${i + 1}C3`,
  col4: `R${i + 1}C4`,
  col5: `R${i + 1}C5`,
  col6: `R${i + 1}C6`,
  col7: `R${i + 1}C7`,
  col8: `R${i + 1}C8`,
}));


const COLUMNS = [
  { key: "col1", label: "Column 1" },
  { key: "col2", label: "Column 2" },
  { key: "col3", label: "Column 3" },
  { key: "col4", label: "Column 4" },
  { key: "col5", label: "Column 5" },
  { key: "col6", label: "Column 6" },
  { key: "col7", label: "Column 7" },
  { key: "col8", label: "Column 8" },
];

const EntryTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Calculate responsive rows per page
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setRowsPerPage(5); // Mobile
      else if (width < 1024) setRowsPerPage(6); // Tablet
      else setRowsPerPage(8); // Desktop
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const pageRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, sortedData]);

  const handleToggle = useCallback((idx: number) => {
    toast.success("Status updated successfully!");
    console.log("toggle row", idx);
  }, []);

  const handleEdit = useCallback((_idx: number) => {
    toast.success("Edit mode activated");
  }, []);

  const handlePrev = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

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

  // const handleSelectAll = useCallback((checked: boolean) => {
  //   if (checked) {
  //     setSelectedRows(pageRows.map((_, idx) => (page - 1) * rowsPerPage + idx));
  //   } else {
  //     setSelectedRows([]);
  //   }
  // }, [pageRows, page, rowsPerPage]);

  // const handleSelectRow = useCallback((rowIndex: number, checked: boolean) => {
  //   const globalIndex = (page - 1) * rowsPerPage + rowIndex;
  //   if (checked) {
  //     setSelectedRows(prev => [...prev, globalIndex]);
  //   } else {
  //     setSelectedRows(prev => prev.filter(idx => idx !== globalIndex));
  //   }
  // }, [page, rowsPerPage]);

  // const handleBulkAction = useCallback((action: string) => {
  //   if (selectedRows.length === 0) {
  //     toast.error("Please select at least one row");
  //     return;
  //   }
  //   toast.success(`${action} ${selectedRows.length} rows`);
  // }, [selectedRows.length]);

  if (data.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-[#1E293B] rounded-2xl shadow-xs border border-gray-100 dark:border-gray-800">
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No data available</h3>
          <p className="text-gray-500 dark:text-gray-400">Add some entries to get started.</p>
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
                {pageRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleEdit(idx);
                      }
                    }}
                  >
                    {COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-sm truncate max-w-xs"
                      >
                        {row[col.key]}
                      </td>
                    ))}
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Action
                          isActive={true}
                          onToggle={() => handleToggle(idx)}
                          onEdit={() => handleEdit(idx)}
                          onClick={() => handleEdit(idx)}
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

export default EntryTable;