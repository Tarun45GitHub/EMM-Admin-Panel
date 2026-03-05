import React, { useState, type ChangeEvent } from "react";
import { FiSend } from "react-icons/fi"; // send icon

// example list of users (replace with real data or API results)
const userList = [
  { id: "u1", name: "John Doe" },
  { id: "u2", name: "Jane Smith" },
  { id: "u3", name: "Alice Johnson" },
];

const Transfer: React.FC = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleRecipientChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecipient(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient || !amount) {
      alert("Please select a user and enter an amount");
      return;
    }

    console.log("Sending", amount, "to", recipient);

    // TODO: call API/backend to initiate transfer
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-lg max-w-md w-full p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Transfer Money
        </h2>

        {/* Recipient Dropdown */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Select User to Send Money
          </label>
          <select
            value={recipient}
            onChange={handleRecipientChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-200"
            required
          >
            <option value="" >Choose user</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-300"
            required
          />
        </div>

        {/* Transfer Button */}
        <button
          type="submit"
          className="flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg w-full hover:bg-indigo-700 transition"
        >
          <FiSend className="mr-2" /> Transfer
        </button>
      </form>
    </div>
  );
};

export default Transfer;