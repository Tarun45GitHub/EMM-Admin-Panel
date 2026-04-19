import React,{Suspense} from "react"
import TotalNav from "../components/dashboard/TotalCardNav";
import Chartpannel from "../components/dashboard/Graph_div";
// import { useLoader } from "../components/ui/LoaderContext";
// import axios from "axios";
import CarouselBanner from "../components/dashboard/CarouselBanner";

const Dashboard:React.FC=()=>{
   return(
   <div className="dark:bg-[#1E293B]">
    <div className="p-3  rounded-lg">
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



