import type React from "react";
import PersonalDetails from "./PersonalDetails";
import RetailerDetails from "./RetailerDetails";
import DeviceDetails from "./DeviceDetails";
import EmiTable from "./EmiTable";
import CommandButtons from "./CommndButton";
import { useEffect, useState } from "react";
import { type AxiosResponse } from "axios";
import { useLoader } from "../ui/LoaderContext";
import { useParams } from "react-router-dom"; // Assuming react-router-dom is used for routing
import api from "../../api/Axios";
import KycEditor from "./KycEditor";

// Define the structure for a single customer's data
interface CustomerData {
    id: number;
    name: string;
    mobile_number?: string;
    type?: string;
    imei_1?: string;
    imei_2?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    // Add any other fields expected from the /crm/customers/:customer_id/ endpoint
    address?: string;
    email?: string;
    emi_details?: any[]; // Updated to array to support EmiTable
    kyc_details?: {
        aadhar_card_front: string;
        aadhar_card_back: string;
        pan_card: string;
    };
}

// Define the API response structure for a single customer
interface SingleCustomerApiResponse {
    data: CustomerData;
}

const CustomerEdit: React.FC = () => {
    const { customer_id } = useParams<{ customer_id: string }>(); // Get customer_id from URL parameters
    const { showLoader, hideLoader } = useLoader();
    const [customer, setCustomer] = useState<CustomerData | null>(null); // State to hold single customer data
    const [error, setError] = useState('');
     useEffect(() => {
        const fetchData = async () => {
          try {
            showLoader();
    
            const myToken = localStorage.getItem('access_token');
    
            if (!myToken) {
              console.warn("Token missing. Redirecting to login...");
              window.location.href = "/login"; 
              return;
            }
    
            if (!customer_id) {
                setError("Customer ID is missing.");
                return;
            }

            const response: AxiosResponse<SingleCustomerApiResponse> = await api.get(`/crm/customers/${customer_id}/`, {
              headers: {
                "Authorization": `Bearer ${myToken}`,
                "Content-Type": "application/json"
              }
            });
            console.log(response.data.data);
            
             setCustomer(response.data.data); // Set the single customer object
            
    
          } catch (err: any) {
            if (err.response?.status === 401) {
              console.error("Token is invalid or expired.");
              // Optional: clear storage and logout user
            }
            setError(err.response?.data?.message || err.message || "An error occurred");
          } finally {
            hideLoader();
          }
        };
        fetchData(); // Call fetchData when component mounts or customer_id changes
      }, [customer_id]); // Re-run effect if customer_id changes
    
    
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-5">
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
                    <div className="lg:col-span-2 space-y-6">
                        {/* Form Sections */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="transform transition-all duration-300 ">
                                <PersonalDetails customer={customer} /> 
                                {/* Pass customer data */}
                            </div>
                    
                            <div className="transform transition-all duration-300 ">
                                <KycEditor initialKyc={customer?.kyc_details || { aadhar_card_front: "", aadhar_card_back: "", pan_card: "" }} /> 
                            </div>
                             <div className="transform transition-all duration-300 ">
                                <DeviceDetails customer={customer} /> 
                               
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
                                        {customer?.emi_details?.length || 0} active records
                                    </span>
                                </div>
                                <EmiTable data={customer?.emi_details || []} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Command Actions */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <CommandButtons />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerEdit;