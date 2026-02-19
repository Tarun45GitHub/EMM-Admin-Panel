import React, { useState } from "react";

const designations = [
  "National Dis.",
  "Super Dis",
  "Distributer",
  "Retailer",
];

const TransferCoin: React.FC = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [designation, setDesignation] = useState(designations[0]);
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !id.trim() || !amount.trim()) {
      setMessage("Name, ID & Amount are required!");
      setSuccess(false);
      return;
    }
    if (isNaN(Number(amount))) {
      setMessage("Amount must be a valid number!");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
      setMessage("Transfer submitted successfully!");
      setName("");
      setId("");
      setAmount("");
      setRemarks("");
    } catch (err) {
      setSuccess(false);
      setMessage("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 dark:bg-gray-700">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg p-8 dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-bold text-center text-green-500 mb-6">
          Transfer Digital Coin
        </h2>

        {message && (
          <div
            className={`text-center px-4 py-2 mb-4 rounded ${
              success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter full name"
            />
          </div>

          {/* ID */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter reference ID"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
              Designation
            </label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {designations.map((desg) => (
                <option key={desg} value={desg} className="dark:bg-gray-800">
                  {desg}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
              Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="0.00"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-100">
              Remarks (Optional)
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none 
              focus:ring-2 focus:ring-indigo-400"
              placeholder="Add any remarks (optional)"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg
             hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Transfer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferCoin;
