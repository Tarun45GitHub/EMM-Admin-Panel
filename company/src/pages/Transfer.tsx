import React, { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { ArrowRightLeft, Landmark, IndianRupee } from 'lucide-react';
import api from '../api/Axios';
// import TransactionTable from '../components/transfer/Transcationtable';

// --- Types & Interfaces ---
type TransactionType = 'transfer' | 'withdraw';

interface User {
  company_name: ReactNode;
  id: number;
  // Add other fields that might be in the API response
  mobile_number?: string;
  email?: string;
}

const Transfer: React.FC = () => {
  // --- State ---
  const [type, setType] = useState<TransactionType>('transfer');
  const [targetUserId, setTargetUserId] = useState<number | ''>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // User list state
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users on component mount
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/crm/users/lower-hierarchy/', {
          params: { search: '' },
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }
        });
        console.log(response);
        
        // Handle different possible response structures
        if (response.data) {
          // If response has a data wrapper (like { success: true, data: [...] })
          const usersData = response.data.data || response.data.results || response.data;
          if (Array.isArray(usersData)) {
            setUsers(usersData);
          } else if (Array.isArray(response.data)) {
            setUsers(response.data);
          }
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        // Fallback to empty array if API fails
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // --- Handlers ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!targetUserId || !amount) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        target_user_id: typeof targetUserId === 'string' ? parseInt(targetUserId) : targetUserId,
        type,
        amount: amount.toString(),
      };

      // Get authentication tokens
      const token = localStorage.getItem('access_token');

      // Set up headers with authentication
      const config = {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        }
      };

      const response = await api.post('/crm/wallet/transactions/add/', payload, config);

      if (response.status === 200 || response.status === 201) {
        setSuccess(`Transaction successful! ${type === 'transfer' ? 'Transferred' : 'Withdrew'} ${amount} coins.`);
        // Reset form
        setAmount('');
        setTargetUserId('');
      }
    } catch (err: any) {
      console.error('Transaction error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Transaction failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-12 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden font-sans">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {type === 'transfer' ? <ArrowRightLeft size={20} /> : <Landmark size={20} />}
            {type === 'transfer' ? 'Transfer Funds' : 'Withdrawal Request'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Complete the fields below to process your transaction.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type Toggle */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {(['transfer', 'revert'] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 py-2 text-sm font-bold capitalize transition-all rounded-lg ${
                  type === t 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* User Dropdown */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {type === 'transfer' ? 'Recipient User' : 'Account Holder'}
            </label>
            <select
              required
              value={targetUserId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTargetUserId(
                e.target.value === '' ? '' : parseInt(e.target.value)
              )}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-all"
            >
              <option value="">Select a user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id} - {user.company_name}
                </option>
              ))}
            </select>
            {users.length === 0 && (
              <p className="mt-1 text-xs text-gray-400">No users available. Please check your connection.</p>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Amount (coin)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee size={16} className="text-gray-400" />
              </div>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition-all duration-200 ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Processing...' : 'Confirm Transaction'}
          </button>
        </form>
      </div>

      {/* Transaction History */}
      {/* <div className="max-w-6xl mx-auto mt-12">
        <TransactionTable initialPageSize={10} />
      </div> */}
    </>
  );
};

export default Transfer;