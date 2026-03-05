import React, { useEffect, useState } from "react";
import Transfer from "../components/transfer/Transfer";
import Reclaim from "../components/transfer/Reclaim";
import { useLoader } from "../components/ui/LoaderContext";


const TransferPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"transfer" | "reclaim">("transfer");

  const { showLoader, hideLoader } = useLoader();
           useEffect(() => {
            showLoader();
            const timer = setTimeout(() => {
              hideLoader();
            }, 1000);
        
            return () => clearTimeout(timer)
           }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
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
          onClick={() => setActiveTab("reclaim")}
          className={`py-2 px-5 rounded-lg font-semibold transition ${
            activeTab === "reclaim"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          }`}
        >
          Reclaim
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl">
        {activeTab === "transfer" && <Transfer />}
        {activeTab === "reclaim" && <Reclaim />}
      </div>
    </div>
  );
};

export default TransferPage;