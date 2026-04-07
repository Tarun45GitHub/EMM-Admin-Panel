import React,{Suspense} from "react"
import TotalNav from "../components/dashboard/TotalCardNav";
import Chartpannel from "../components/dashboard/Graph_div";
// import { useLoader } from "../components/ui/LoaderContext";
// import axios from "axios";
import CarouselBanner from "../components/dashboard/CarouselBanner";

const Dashboard:React.FC=()=>{
  // const { showLoader, hideLoader } = useLoader();
  // const [data, setData] = useState<any>(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       showLoader();

  //       // Use .getItem() - it's more reliable
  //       const myToken = window.localStorage.token;

  //       if (!myToken) {
  //         console.warn("Token missing. Redirecting to login...");
  //         // window.location.href = "/login"; 
  //         return;
  //       }

  //       const response = await axios.get("https://backend.bharatemm.com/api/crm/dashboard/", {
  //         headers: {
  //           "Authorization": `Bearer ${myToken}`,
  //           "Content-Type": "application/json"
  //         }
  //       });
  //       const data=response?.data?.data;


  //     } catch (error: any) {
  //       if (error.response?.status === 401) {
  //         console.error("Token is invalid or expired.");
  //         // Optional: clear storage and logout user
  //       }
  //     } finally {
  //       hideLoader();
  //     }
  //   };
  //  // fetchData();
  // }, []);
   return(
   <div className="dark:bg-[#1E293B]">
    <div className="p-5  rounded-lg">
      <Suspense fallback={<h2 className="text-center font-bold">This is Loading...</h2>}>
      <CarouselBanner/>
      </Suspense>
    </div>
    <div className="p-5 rounded-lg">
      <TotalNav/>
    </div>
   <div className="p-5 ">
     <Chartpannel/>
   </div>
   </div>
   );

};
export default Dashboard;



