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
   <div className="">
    <div className="m-5">
      <Suspense fallback={<h2 className="text-center font-bold">This is Loading...</h2>}>
      <CarouselBanner/>
      </Suspense>
    </div>
    <div className="m-3">
      <TotalNav/>
    </div>
   <div className="m-3">
     <Chartpannel/>
   </div>
   </div>
   );

};
export default Dashboard;

