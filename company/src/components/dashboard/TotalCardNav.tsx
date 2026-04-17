import React, { useEffect, useState } from "react"
import {Headset,ShieldCheck,Users,Briefcase,Store,User } from "lucide-react";
import { useLoader } from "../ui/LoaderContext.tsx";
import axios from "axios";
import NotFound from "../../pages/NotFound.tsx";
import TotalCard from "./TotalCard.tsx";


const TotalNav: React.FC = () => {
    const { showLoader, hideLoader } = useLoader();
    const [error,setError]=useState<string>()
     const [data, setData] = useState<any>(null);

     useEffect(() => {
  if (data !== null) {
    // console.log("SUCCEESS",data); 
  }
}, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader();

        // Use .getItem() - it's more reliable
        const myToken = window.localStorage.access_token;

        if (!myToken) {
          console.warn("Token missing. Redirecting to login...");
          // window.location.href = "/login"; 
          return;
        }

        const response = await axios.get("https://backend.bharatemm.com/api/crm/dashboard/", {
          headers: {
            "Authorization": `Bearer ${myToken}`,
            "Content-Type": "application/json"
          }
        });
         if(!response) throw new Error('Failed to data fetch');
        //  console.log(response);
         setData(response.data.data)
        
        

      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error("Token is invalid or expired.");
          // Optional: clear storage and logout user
        }
        setError(error);
      } finally {
        hideLoader();
      }
    };
    fetchData();
  }, []);

    if(error){
        return(
            <NotFound/>
        );
    }
    return (
        <div className="p-3 dark:bg-gray-700 rounded-lg">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard
                 title="Total No. Support Team" 
                 value={"000"} 
                 change="28.4" 
                 positive={true} 
                 Icon={Headset} />
                <TotalCard title="Last Month Support Add" value="000" change="28.4" positive={true} Icon={Headset} />
                <TotalCard title="Last Week Support Add" value="000" change="28.4" positive={true} Icon={Headset} />
                <TotalCard title="Last Day Support Add" value="000" change="28.4" positive={true} Icon={Headset} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2  ">
                <TotalCard title="Total No. National Dist. Team"
                 value={data?.this_month_total_national_distributors_created.toLocaleString()||" "}
                 change="28.4" positive={true} Icon={ShieldCheck} />
                <TotalCard title="Last Month National Dist. Add " 
                 value={data?.this_month_total_national_distributors_created.toLocaleString()}
                  change="28.4" positive={true} Icon={ShieldCheck} />
                <TotalCard title="Last Week National Dist. Add" 
                 value={data?.this_month_total_national_distributors_created.toLocaleString()}
                 change="28.4" positive={true} Icon={ShieldCheck} />
                <TotalCard title="Last Day National Dist. Add" 
                 value={data?.this_month_total_national_distributors_created.toLocaleString()}
                change="-28.4" positive={true} Icon={ShieldCheck} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard 
                title="Total No. Super Dist. Team" 
                value={data?.total_super_distributors.toLocaleString() || " "}
                change="28.4" 
                positive={true} 
                Icon={Users} />
                <TotalCard
                 title="Last Month Super Dist. Add"
                  value={data?.this_month_total_super_distributors_created} change="28.4" positive={true} Icon={Users} />
                <TotalCard title="Last Week Super Dist. Add"
                 value={data?.this_week_total_super_distributors_created} change="28.4" positive={true} Icon={Users} />
                <TotalCard title="Last Day Super Dist. Add"
                 value={data?.today_total_super_distributors_created} 
                 change="28.4" positive={true} Icon={Users} /> 

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2  ">
                <TotalCard title="Total No. Distributor Team"
                 value={data?.total_distributors} change="28.4" positive={true} Icon={Briefcase} />
                <TotalCard title="Last Month Distributor Add"
                 value={data?.this_month_total_distributors_created} change="28.4" positive={true} Icon={Briefcase} />
                <TotalCard title="Last Week Distributor Add" 
                 value={data?.this_week_total_distributors_created} change="28.4" positive={true} Icon={Briefcase} />
                <TotalCard title="Last Day Distributor Add"
                 value={data?.today_total_distributors_created} change="28.4" positive={true} Icon={Briefcase} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard title="Total No. Retailer Team" 
                value={data?.total_retailers} change="28.4" positive={true} Icon={Store} />
                <TotalCard title="Last Month Retailer Add"
                 value={data?.this_month_total_retailers_created} change="28.4" positive={true} Icon={Store} />
                <TotalCard title="Last Week Retailer Add"
                 value={data?.this_week_total_retailers_created} change="28" positive={true} Icon={Store} />
                <TotalCard title="Last Day Retailer Add" 
                value={data?.today_total_retailers_created} change="28.4" positive={true} Icon={Store} />

            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 ">
                <TotalCard title="Total No. Customer Team" value="00" change="28.4" positive={true} Icon={User} />
                <TotalCard title="Last Month Customer Add" value="00" change="28.4" positive={true} Icon={User} />
                <TotalCard title="Last Week Customer Add" value="00" change="28.4" positive={true} Icon={User} />
                <TotalCard title="Last Day Customer Add" value="00" change="28.4" positive={true} Icon={User} />

            </div>
           
        </div>

    );
};
export default TotalNav;
