import React from "react";

interface RowData {
  [key: string]: string | number;
}

const tableData: RowData[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Home"][i % 3],
  price: `$${(i + 1) * 15}`,
  stock: `${(i + 1) * 5}`,
  sold: `${(i + 1) * 10}`,
}));

const ResponsiveTable: React.FC = () => {
  return (
    <div className="p-4 ">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Product Overview
      </h2>

      {/* Scrollable Container */}
      <div className="relative scrollbar-custom overflow-x-auto  bg-neutral-primary-soft
   shadow-xs rounded-base border border-default ">
        <table className=" w-full table-auto h-full  ">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left font-medium">ID</th>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Category</th>
              <th className="px-4 py-2 text-left font-medium">Price</th>
              <th className="px-4 py-2 text-left font-medium">Stock</th>
              <th className="px-4 py-2 text-left font-medium">Units Sold</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.category}</td>
                <td className="px-4 py-2">{row.price}</td>
                <td className="px-4 py-2">{row.stock}</td>
                <td className="px-4 py-2">{row.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
