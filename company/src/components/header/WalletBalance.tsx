import React from "react";
import { Wallet } from "lucide-react";

type WalletBalanceProps = {
  balance: number | string;
  currency?: string;
};

const WalletBalance: React.FC<WalletBalanceProps> = ({
  balance,
  currency = "EMM",
}) => {
  return (
    <div
      className=" w-full max-w-xs p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
        rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header with Lucide Icon */}
      <div className="flex items-center gap-2">
        <Wallet
          size={15}
          strokeWidth={2}
          className="text-indigo-600 dark:text-indigo-400"
        />

        <h2 className="text-base font-medium text-gray-700 dark:text-gray-200">
          Wallet : {balance}{" "}{currency}
        </h2>
        
      </div>
    </div>
  );
};

export default WalletBalance;
