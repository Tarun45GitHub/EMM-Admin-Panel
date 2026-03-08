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
  return (
    <div className="p-2">
      <div className="w-70 sm:w-110 md:w-130 lg:w-200 xl:w-250 overflow-x-auto scrollbar-custom">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Down Payment</th>
              <th className="px-4 py-3 text-left">Interest Rate (%)</th>
              <th className="px-4 py-3 text-left">Tenure (months)</th>
              <th className="px-4 py-3 text-left">Per Month EMI</th>
              <th className="px-4 py-3 text-left">Pending EMI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800 dark:text-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">₹{item.price.toLocaleString()}</td>
                <td className="px-4 py-3">₹{item.downPayment.toLocaleString()}</td>
                <td className="px-4 py-3">{item.interestRate}%</td>
                <td className="px-4 py-3">{item.tenure}</td>
                <td className="px-4 py-3">
                  ₹{item.perMonthEmi.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  ₹{item.pendingEmi.toLocaleString()}
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