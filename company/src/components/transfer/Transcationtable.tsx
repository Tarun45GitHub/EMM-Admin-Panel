import React, { useMemo, useState } from "react";


interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
}

interface TransactionTableProps {
  data: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const pageRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [page]);


  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full p-4 flex justify-center">
      <div className=" p-5 bg-white dark:bg-gray-900 rounded-xl shadow-lg border
       border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {/* Table Scroll */}
        <div className="w-70 sm:w-130 md:w-150 lg:w-230 xl:w-300 overflow-x-auto scrollbar-custom">
           <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-3 whitespace-nowrap">Transaction ID</th>
            <th className="px-6 py-3 whitespace-nowrap">Date</th>
            <th className="px-6 py-3 whitespace-nowrap">Description</th>
            <th className="px-6 py-3 text-right whitespace-nowrap">Amount</th>
            <th className="px-6 py-3 whitespace-nowrap">Status</th>
          </tr>
        </thead>

        <tbody>
          {pageRows.map((tx, index) => (
            <tr
              key={tx.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800 dark:text-gray-200" : "bg-white dark:bg-gray-900 dark:text-gray-200"
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                {tx.id}
              </td>
              <td className="px-6 py-4">{tx.date}</td>
              <td className="px-6 py-4">{tx.description}</td>
              <td className="px-6 py-4 text-right font-semibold">
                ${tx.amount.toFixed(2)}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                    tx.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : tx.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tx.status}
                </span>
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

export default TransactionTable;








