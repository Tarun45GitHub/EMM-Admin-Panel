import React from "react";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../banners/banner1.jpg"
import banner2 from "../banners/banner2.jpg"
import banner3 from "../banners/banner3.jpg"
import banner4 from "../banners/banner4.jpg"


// import {} from "../"

const CarouselBanner:React.FC=()=>{
  return(
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      interval={1000}
    >
      <div className="w-full h-50 md:h-72 lg:h-150 overflow-hidden rounded-xl">
        <img src={banner1} alt="Banner 1" className="w-full h-full object-fit" />
        <p className="legend">Banner 1</p>
      </div>
      <div className="w-full h-50 md:h-72 lg:h-150 overflow-hidden rounded-xl">
        <img src={banner2} alt="Banner 2"  className="w-full h-full object-fit"/>
        <p className="legend">Banner 2</p>
      </div>
      <div className="w-full h-50 md:h-72 lg:h-150 overflow-hidden rounded-xl">
        <img src={banner3} alt="Banner 3" className="w-full h-full object-fit" />
        <p className="legend">Banner 3</p>
      </div>
      <div className="w-full h-50 md:h-72 lg:h-150 overflow-hidden rounded-xl">
        <img src={banner4} alt="Banner 3"  className="w-full h-full object-fit"/>
        <p className="legend">Banner 3</p>
      </div>
    </Carousel>

  );
};
export default CarouselBanner;

