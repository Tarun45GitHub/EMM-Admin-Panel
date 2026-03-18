import React,{lazy,Suspense,useEffect} from "react"
const CarouselBanner=lazy(()=>import("../components/dashbord/carousel_banner"))
import TotalNav from "../components/dashbord/total_card_nav";
import Chartpannel from "../components/dashbord/Graph_div";
import { useLoader } from "../components/ui/LoaderContext";

const Dashboard:React.FC=()=>{
 const { showLoader, hideLoader } = useLoader();
    useEffect(() => {
     showLoader();
     const timer = setTimeout(() => {
       hideLoader();
     }, 1000);
 
     return () => clearTimeout(timer)
    }, []);
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

