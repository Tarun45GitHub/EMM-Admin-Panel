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
  }, [page, data]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="p-2 md:p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">

        {/* Scroll Container */}
        <div className="w-full overflow-x-auto scrollbar-custom">

          <table className="min-w-22.5 w-full text-sm text-left text-gray-700 dark:text-gray-200">

            <thead className="bg-gray-100 dark:bg-gray-800 text-xs font-semibold uppercase">
              <tr>
                <th className="px-3 py-2 md:px-6 md:py-3">Transaction ID</th>
                <th className="px-3 py-2 md:px-6 md:py-3">Date</th>
                <th className="px-3 py-2 md:px-6 md:py-3">Description</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-right">Amount</th>
                <th className="px-3 py-2 md:px-6 md:py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.map((tx, index) => (
                <tr
                  key={tx.id}
                  className={`border-b ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="px-3 py-2 md:px-6 md:py-4 font-medium">
                    {tx.id}
                  </td>

                  <td className="px-3 py-2 md:px-6 md:py-4">
                    {tx.date}
                  </td>

                  <td className="px-3 py-2 md:px-6 md:py-4">
                    {tx.description}
                  </td>

                  <td className="px-3 py-2 md:px-6 md:py-4 text-right font-semibold">
                    ${tx.amount.toFixed(2)}
                  </td>

                  <td className="px-3 py-2 md:px-6 md:py-4">
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
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">

          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-gray-900 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-gray-900 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default TransactionTable;