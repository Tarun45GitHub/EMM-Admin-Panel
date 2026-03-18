import React, { useMemo, useState } from "react";
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
  const rowsPerPage = 8;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const pageRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [page]);

  const handleToggle = (idx: number) => {
    toast.success("Toggled successfully!");
    console.log("toggle row", idx);
  };

  const handleEdit = (idx: number) => {
    toast("Edit row " + idx);
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="p-2 md:p-4 w-full">
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xs border border-gray-100 dark:border-gray-800 overflow-hidden">

        {/* ── Desktop / tablet: horizontal scroll table ── */}
        <div className="hidden sm:block overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 dark:bg-[#0F172A]/50 text-gray-500 dark:text-gray-400">
              <tr>
                {[...COLUMNS.map((c) => c.label), "Action"].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-4 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 dark:border-gray-800 whitespace-nowrap"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {pageRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors duration-150"
                >
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">

                    <Action
                      isActive={true}
                      onToggle={() => handleToggle(idx)}
                      onEdit={() => handleEdit(idx)}
                      onClick={function (): void {
                        throw new Error("Function not implemented.");
                      } }                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile: card layout ── */}
        <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {pageRows.map((row, idx) => (
            <div
              key={idx}
              className="p-4 space-y-2 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {COLUMNS.map((col) => (
                  <div key={col.key} className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {col.label}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {row[col.key]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-1">
                <Action
                  isActive={true}
                  onToggle={() => handleToggle(idx)}
                  onClick={() => handleEdit(idx)} onEdit={function (): void {
                    throw new Error("Function not implemented.");
                  } }                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-gray-50/30 dark:bg-[#0F172A]/30 border-t border-gray-100 dark:border-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {totalPages}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 sm:px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 sm:px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-blue-200 dark:shadow-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryTable;