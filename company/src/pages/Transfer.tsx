import React, { useEffect, useState } from "react";
import Transfer from "../components/transfer/Transfer";
import Reclaim from "../components/transfer/Reclaim";
import { useLoader } from "../components/ui/LoaderContext";


const TransferPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"transfer" | "withdraw">("transfer");

  const { showLoader, hideLoader } = useLoader();
           useEffect(() => {
            showLoader();
            const timer = setTimeout(() => {
              hideLoader();
            }, 1000);
        
            return () => clearTimeout(timer)
           }, []);

  return (
    <div className="h-full p-6 flex flex-col items-center">
      {/* Buttons */}
      <div className="flex gap-4 mb-6 ">
        <button
          onClick={() => setActiveTab("transfer")}
          className={`py-2 px-5 rounded-lg font-semibold transition ${
            activeTab === "transfer"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          }`}
        >
          Transfer
        </button>

        <button
          onClick={() => setActiveTab("withdraw")}
          className={`py-2 px-5 rounded-lg font-semibold transition ${
            activeTab === "withdraw"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          }`}
        >
          withdraw
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl">
        {activeTab === "transfer" && <Transfer />}
        {activeTab === "withdraw" && <Reclaim />}
      </div>
    </div>
  );
};

export default TransferPage;