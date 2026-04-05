import React, { memo, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import api from "../../api/Axios";

interface BannerData {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
  redirect_url?: string;
}

interface Slide {
  img: string;
  title: string;
  subtitle: string;
  redirect_url: string;
}

// Default fallback slides in case API fails
const defaultSlides: Slide[] = [
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop",
    title: "Welcome to Admin Panel",
    subtitle: "Streamline your business operations with our powerful management tools.",
    redirect_url: "/learn/banner1",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop",
    title: "Manage Users & Reports",
    subtitle: "Get detailed insights and manage your team efficiently in one place.",
    redirect_url: "/learn/banner2",
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop",
    title: "Track Install Analytics",
    subtitle: "Real-time tracking and deep analytics for all your installations.",
    redirect_url: "/learn/banner3",
  },
  {
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=400&fit=crop",
    title: "Fast & Secure System",
    subtitle: "Experience industry-leading security and lightning-fast performance.",
    redirect_url: "/learn/banner4",
  },
];

const CarouselStyles = () => (
  <style>
    {`
      .carousel .control-dots {
        bottom: 20px !important;
        margin: 0 !important;
        width: auto !important;
        left: 24px !important;
        display: flex;
        gap: 8px;
      }
      .carousel .control-dots .dot {
        width: 8px;
        height: 8px;
        margin: 0;
        background: rgba(255,255,255,0.4);
        box-shadow: none;
        border-radius: 4px;
        transition: all 0.3s ease;
      }
      .carousel .control-dots .dot.selected {
        background: #fff;
        width: 24px;
        opacity: 1;
      }
      .carousel .legend {
        display: none !important;
      }
      @media (max-width: 768px) {
        .carousel .control-dots {
          left: 50% !important;
          transform: translateX(-50%);
        }
      }
    `}
  </style>
);

const buttonClasses = `
  inline-flex items-center gap-2
  px-5 py-2.5 md:px-8 md:py-3.5
  rounded-full text-sm md:text-base font-bold
  text-white bg-orange-600 hover:bg-orange-500
  transform transition-all duration-300
  hover:translate-x-1 shadow-lg shadow-orange-900/20
  active:scale-95
`;

const GetStartedButton = ({ url }: { url: string }) => {
  // console.log(url);
  const isExternal = url;
  const content = (
    <>
      Learn More
      <ArrowRight size={18} />
    </>
  );

  if (!isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={url} className={buttonClasses}>
      {content}
    </Link>
  );
};

const CarouselBanner: React.FC = memo(() => {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get("/crm/banners");
        const data = response.data?.data;
        
        if (Array.isArray(data) && data.length > 0) {
          const bannerSlides: Slide[] = data.map((banner: BannerData, index: number) => ({
            img: banner.image,
            title: banner.title || `Banner ${index + 1}`,
            subtitle: banner.subtitle || "Explore our latest updates and features.",
            redirect_url: banner.redirect_url || `/learn/banner${index + 1}`,
          }));
          setSlides(bannerSlides);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-55 sm:h-75 md:h-95 lg:h-105 bg-gray-800 rounded-2xl md:rounded-[32px] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CarouselStyles />
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        interval={4000}
        swipeable
        emulateTouch
        stopOnHover
        renderArrowPrev={(_onClickHandler, _hasPrev) => null}
        renderArrowNext={(_onClickHandler, _hasNext) => null}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full group">
            {/* Main Container */}
            <div className="relative w-full h-55 sm:h-75 md:h-95 lg:h-105 overflow-hidden rounded-2xl md:rounded-[32px] bg-gray-900">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transform transition-transform duration-[5000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden" />
              </div>

              {/* Content Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 text-left">
                <div className="max-w-2xl space-y-2 md:space-y-4">
                  <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight animate-in slide-in-from-left-4 duration-700">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-lg line-clamp-2 md:line-clamp-none animate-in slide-in-from-left-6 duration-700 delay-100">
                    {slide.subtitle}
                  </p>
                  
                  <div className="pt-2 md:pt-4 animate-in slide-in-from-left-8 duration-700 delay-200">
                    <GetStartedButton url={slide.redirect_url} />
                  </div>
                </div>
              </div>

              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-2xl md:rounded-[32px] ring-1 ring-white/10" />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
});

export default CarouselBanner;