import React from "react"
import CarouselBanner from "../components/dashbord/carousel_banner";
import TotalNav from "../components/dashbord/total_card_nav";
import Chartpannel from "../components/dashbord/Graph_div";

const Dashboard:React.FC=()=>{
  return(
   <div className="">
    <div className="m-5">
      <CarouselBanner/>
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

