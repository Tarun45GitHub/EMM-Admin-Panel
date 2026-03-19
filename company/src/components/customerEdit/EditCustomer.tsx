import type React from "react";
import PersonalDetails from "./PersonalDetails";
import RetailerDetails from "./RetailerDetails";
import DeviceDetails from "./DeviceDetails";
import EmiTable from "./EmiTable";
import CommandButtons from "./CommndButton";

const emiData = [
    {
      id: 1,
      price: 500000,
      downPayment: 50000,
      interestRate: 9.5,
      tenure: 60,
      perMonthEmi: 10582,
      pendingEmi: 15,
    },
    {
      id: 2,
      price: 750000,
      downPayment: 75000,
      interestRate: 10,
      tenure: 72,
      perMonthEmi: 13745,
      pendingEmi: 20,
    },
]

const CustomerEdit: React.FC = () => {
    return (
        <div className="flex flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Customer Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Edit customer details and manage their account information
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Form Sections */}
                        <div className="grid grid-cols-1  gap-6">
                            <div className="transform transition-all duration-300 ">
                                <PersonalDetails />
                            </div>
                            <div className="transform transition-all duration-300 ">
                                <RetailerDetails />
                            </div>
                            <div className="transform transition-all duration-300 ">
                                <DeviceDetails />
                            </div>
                        </div>

                        {/* EMI Table Section */}
                        <div className="transform transition-all duration-300 hover:scale-102">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        EMI Records
                                    </h2>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {emiData.length} active records
                                    </span>
                                </div>
                                <EmiTable data={emiData} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Command Actions */}
                  
                </div>
                
            </div>
            <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <CommandButtons />
                        </div>
            </div>
        </div>
    )
}

export default CustomerEdit;