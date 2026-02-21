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
    <div className="w-full p-4 flex justify-center">
      <div className="  bg-white dark:bg-gray-900 rounded-xl shadow-lg border
       border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {/* Table Scroll */}
        <div className="w-70 sm:w-130 md:w-150 lg:w-230 xl:w-300 overflow-x-auto scrollbar-custom">
          <table className=" w-full table-auto text-sm border-collapse">
            <thead className="bg-gray-100   dark:text-gray-600 ">
              <tr>
                {[
                  "Column 1", "Column 2", "Column 3", "Column 4",
                  "Column 5", "Column 6", "Column 7", "Column 8", "Action",
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
              {pageRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                      : "bg-white dark:bg-gray-900 dark:text-gray-200"
                  }`}
                >
                  <td className="px-4 py-2 border text-center">{row.col1}</td>
                  <td className="px-4 py-2 border text-center">{row.col2}</td>
                  <td className="px-4 py-2 border text-center">{row.col3}</td>
                  <td className="px-4 py-2 border text-center">{row.col4}</td>
                  <td className="px-4 py-2 border text-center">{row.col5}</td>
                  <td className="px-4 py-2 border text-center">{row.col6}</td>
                  <td className="px-4 py-2 border text-center">{row.col7}</td>
                  <td className="px-4 py-2 border text-center">{row.col8}</td>
                  <td className="px-4 py-2 border text-center">
                    <Action
                      isActive={true}
                      onToggle={() => handleToggle(idx)}
                      onEdit={() => handleEdit(idx)}
                    />
                  </td>
                </tr>
              ))}
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

export default EntryTable;
