import React from "react";

interface EmiRecord {
  id: number;
  price: number;
  downPayment: number;
  interestRate: number;
  tenure: number;
  perMonthEmi: number;
  pendingEmi: number;
}

interface Props {
  data: EmiRecord[];
}

const EmiTable: React.FC<Props> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateTotalPaid = (item: EmiRecord) => {
    return (item.tenure - item.pendingEmi) * item.perMonthEmi;
  };

  const calculateOutstanding = (item: EmiRecord) => {
    return item.pendingEmi * item.perMonthEmi;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
      {/* <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          EMI Records
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {data.length} active records
        </div>
      </div> */}

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Down Payment
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Interest Rate
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Tenure
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Monthly EMI
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Pending EMI
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Outstanding
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, _index) => {
              // const totalPaid = calculateTotalPaid(item);
              const outstanding = calculateOutstanding(item);
              const progress = ((item.tenure - item.pendingEmi) / item.tenure) * 100;
              const isCompleted = item.pendingEmi === 0;

              return (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatCurrency(item.downPayment)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item.interestRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.tenure} months
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(item.perMonthEmi)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.pendingEmi} months
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <span className={`${
                      outstanding > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                    }`}>
                      {formatCurrency(outstanding)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            isCompleted ? 'bg-green-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${
                        isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {isCompleted ? 'Completed' : `${Math.round(progress)}%`}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg">
            <div className="text-sm font-medium opacity-90">Total Paid</div>
            <div className="text-lg font-bold">
              {formatCurrency(data.reduce((sum, item) => sum + calculateTotalPaid(item), 0))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg">
            <div className="text-sm font-medium opacity-90">Total Outstanding</div>
            <div className="text-xl font-bold">
              {formatCurrency(data.reduce((sum, item) => sum + calculateOutstanding(item), 0))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg">
            <div className="text-sm font-medium opacity-90">Active EMIs</div>
            <div className="text-2xl font-bold">
              {data.filter(item => item.pendingEmi > 0).length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmiTable;