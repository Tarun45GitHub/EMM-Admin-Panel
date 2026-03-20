import TransactionTable from "../components/transfer/Transcationtable";
import { useEffect, useState } from "react";
import { useLoader } from "../components/ui/LoaderContext";
import TableHeader from "../components/transfer/TableHeader";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
}

const MyTransaction: React.FC = () => {
  const { showLoader, hideLoader } = useLoader();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from an API
  const mockTransactions: Transaction[] = [
    {
      "id": "TRX1001",
      "date": "2025-02-12",
      "description": "Subscription Payment",
      "amount": 59.99,
      "status": "Paid"
    },
    {
      "id": "TRX1002",
      "date": "2025-02-10",
      "description": "Refund Issued",
      "amount": -20.00,
      "status": "Paid"
    },
    {
      "id": "TRX1003",
      "date": "2025-02-09",
      "description": "Online Purchase",
      "amount": 120.75,
      "status": "Pending"
    },
    {
      "id": "TRX1004",
      "date": "2025-02-08",
      "description": "Point of Sale Sale",
      "amount": 45.50,
      "status": "Failed"
    },
    {
      "id": "TRX1005",
      "date": "2025-02-05",
      "description": "Refund Credit",
      "amount": -10.25,
      "status": "Paid"
    },
    {
      "id": "TRX1006",
      "date": "2025-02-14",
      "description": "Monthly Subscription",
      "amount": 29.99,
      "status": "Paid"
    },
    {
      "id": "TRX1007",
      "date": "2025-02-15",
      "description": "Service Fee",
      "amount": 15.00,
      "status": "Processing"
    },
    {
      "id": "TRX1008",
      "date": "2025-02-16",
      "description": "Product Purchase",
      "amount": 89.99,
      "status": "Paid"
    }
  ];

  useEffect(() => {
    showLoader();
    setLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
      hideLoader();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: any) => {
    // In a real app, this would filter the data
    console.log('Filter changed:', filters);
  };

  const getSummaryStats = () => {
    const totalTransactions = transactions.length;
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const paidTransactions = transactions.filter(tx => tx.status.toLowerCase() === 'paid').length;
    const pendingTransactions = transactions.filter(tx => tx.status.toLowerCase() === 'pending').length;

    return {
      totalTransactions,
      totalAmount,
      paidTransactions,
      pendingTransactions
    };
  };

  const stats = getSummaryStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Transactions</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage your transaction history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount</p>
                <p className={`text-2xl font-bold ${stats.totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${stats.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Paid Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.paidTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* <div className=" border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction History</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Detailed view of all your transactions</p>
          </div> */}
          
          <div className="px-2">
            <TableHeader onFilterChange={handleFilterChange} />
          </div>

          <div className="">
            <div className="">
              <TransactionTable data={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTransaction;
