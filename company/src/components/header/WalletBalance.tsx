import React from "react";
import { Wallet } from "lucide-react";

type WalletBalanceProps = {
  balance: number | string;
};

const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
      bg-green-50 dark:bg-green-900/20
      border border-green-200 dark:border-green-800/40
      text-green-700 dark:text-green-400
      transition-colors duration-150">
      <Wallet size={16} strokeWidth={2} />
      <span className="text-sm font-semibold whitespace-nowrap">
        ₹ {balance}
      </span>
    </div>
  );
};

export default WalletBalance;
