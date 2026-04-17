import React from "react";

// This matches the exact object you showed from your backend
interface BackendEmiData {
  product_price: string | number;
  down_payment: string | number;
  rate_of_interest: string | number;
  number_of_months: number;
  per_month_emi: string | number;
  loan_amount?: string | number;
  first_emi_date?: string;
  // If your backend doesn't send these yet, we will calculate them
  pending_emi_count?: number; 
}

interface Props {
  data?: BackendEmiData | BackendEmiData[];
}

const EmiTable: React.FC<Props> = ({ data }) => {
  // 1. Normalize data into an array and handle the specific backend keys
  const emiList = React.useMemo(() => {
    if (!data) return [];
    const rawArray = Array.isArray(data) ? data : [data];

    return rawArray.map((item) => {
      const price = parseFloat(String(item.product_price)) || 0;
      const downPayment = parseFloat(String(item.down_payment)) || 0;
      const emi = parseFloat(String(item.per_month_emi)) || 0;
      const tenure = item.number_of_months || 0;
      
      // If backend doesn't provide 'pending', we assume it's just started
      const pending = item.pending_emi_count ?? tenure; 

      return {
        price,
        downPayment,
        interest: item.rate_of_interest,
        tenure,
        emi,
        pending,
        outstanding: pending * emi,
        progress: tenure > 0 ? ((tenure - pending) / tenure) * 100 : 0
      };
    });
  }, [data]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Product Price</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Down Payment</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">ROI</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Tenure</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Monthly EMI</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Outstanding</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {emiList.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                  {formatCurrency(item.price)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
                  {formatCurrency(item.downPayment)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {item.interest}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
                  {item.tenure} Months
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white">
                  {formatCurrency(item.emi)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(item.outstanding)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{Math.round(item.progress)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmiTable;