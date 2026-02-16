import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import banner1 from "../banners/banner1.jpg";
import banner2 from "../banners/banner2.jpg";
import banner3 from "../banners/banner3.jpg";
import banner4 from "../banners/banner4.jpg";

const slides = [
  {
    img: banner1,
    title: "Banner 1",
    subtitle: "Welcome to the Admin Panel",
    link: "/learn/banner1",
  },
  {
    img: banner2,
    title: "Banner 2",
    subtitle: "Manage Users & Reports",
    link: "/learn/banner2",
  },
  {
    img: banner3,
    title: "Banner 3",
    subtitle: "Track Install Analytics",
    link: "/learn/banner3",
  },
  {
    img: banner4,
    title: "Banner 4",
    subtitle: "Fast & Secure System",
    link: "/learn/banner4",
  },
];

const CarouselBanner: React.FC = () => {
  return (
    <div className="w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        interval={2500}
        swipeable
        emulateTouch
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index} className="px-4 md:px-0">
            {/* 3D Card */}
            <div
              className="
                relative w-full overflow-hidden rounded-2xl
                h-[180px] md:h-[320px] lg:h-[450px]
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                transform-gpu transition-all duration-500
                hover:scale-[1.02]
              "
              style={{ perspective: "1200px" }}
            >
              {/* Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="
                  w-full h-full object-cover
                  transform-gpu transition-all duration-700
                  hover:scale-[1.08]
                "
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Glass highlight */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

              {/* Left Caption */}
              <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 text-left">
                <h2 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white/80 text-sm md:text-lg mt-1 drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>

              {/* Learn More Button */}
              <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8">
                <Link
                  to={slide.link}
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2 md:px-6 md:py-3
                    rounded-xl text-sm md:text-base font-semibold
                    text-white bg-white/10 backdrop-blur-md
                    border border-white/20
                    shadow-[0_10px_25px_rgba(0,0,0,0.35)]
                    transform-gpu transition-all duration-300
                    hover:bg-white/20 hover:scale-105
                    active:scale-95
                  "
                >
                  Learn More
                  <span className="text-lg leading-none">→</span>
                </Link>
              </div>

              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
            </div>
          </div>
        ))}
      </Carousel>

      {/* CSS fix for dots + remove legend */}
      <style>
        {`
          .carousel .control-dots .dot {
            width: 10px;
            height: 10px;
            margin: 0 6px;
            background: rgba(255,255,255,0.6);
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          }
          .carousel .control-dots .dot.selected {
            background: white;
            transform: scale(1.2);
          }
          .carousel .legend {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default CarouselBanner;
