import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";

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

const CarouselBanner: React.FC = memo(() => {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Map<number, boolean>>(new Map());
  const carouselRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<number | null>(null);

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
          setImagesLoaded(new Map());
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Failed to load banners. Showing default content.");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => {
      const newMap = new Map(prev);
      newMap.set(index, true);
      return newMap;
    });
  }, []);

  const isExternalUrl = useCallback((url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
    }
  }, []);

  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleRetry = useCallback(async () => {
    setLoading(true);
    setError(null);
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
        setImagesLoaded(new Map());
      } else {
        setError("No banners available. Please try again later.");
      }
    } catch (err) {
      console.error("Retry failed:", err);
      setError("Failed to load banners. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current || document.activeElement !== carouselRef.current) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveSlide(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveSlide(prev => Math.min(slides.length - 1, prev + 1));
      }
    };

    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [slides.length]);

  if (loading) {
    return (
      <div 
        className="w-full relative overflow-hidden rounded-2xl md:rounded-[32px] bg-gray-900"
        role="region"
        aria-label="Banner carousel loading"
        aria-busy="true"
      >
        {/* Skeleton Loader */}
        <div className="relative w-full h-55 sm:h-75 md:h-95 lg:h-105 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16">
            <div className="max-w-2xl space-y-4">
              <div className="h-10 sm:h-12 md:h-14 bg-gray-700 rounded-lg w-3/4" />
              <div className="h-5 sm:h-6 bg-gray-700 rounded-lg w-full" />
              <div className="h-5 sm:h-6 bg-gray-700 rounded-lg w-5/6" />
              <div className="h-12 bg-gray-700 rounded-full w-40 mt-4" />
            </div>
          </div>
        </div>
        {/* Loading Dots Animation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  if (error && slides.length === 0) {
    return (
      <div 
        className="w-full h-55 sm:h-75 md:h-95 lg:h-105 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl md:rounded-[32px] flex flex-col items-center justify-center px-4 text-center"
        role="alert"
      >
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Unable to load banners</h3>
            <p className="text-sm text-gray-300 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={carouselRef}
      className="w-full relative group"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Featured banners carousel"
      aria-roledescription="carousel"
    >
      <style>{`
        .carousel-banner .control-dots {
          bottom: 20px !important;
          margin: 0 !important;
          width: auto !important;
          left: 24px !important;
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .carousel-banner .control-dots .dot {
          width: 8px;
          height: 8px;
          margin: 0;
          background: rgba(255,255,255,0.3);
          box-shadow: none;
          border-radius: 4px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .carousel-banner .control-dots .dot:hover {
          background: rgba(255,255,255,0.6);
        }
        .carousel-banner .control-dots .dot.selected {
          background: #fff;
          width: 28px;
          opacity: 1;
        }
        .carousel-banner .legend {
          display: none !important;
        }
        .carousel-banner .control-arrow {
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }
        .carousel-banner:hover .control-arrow {
          opacity: 0.8;
        }
        .carousel-banner .control-arrow:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        .carousel-banner .control-prev {
          left: 16px;
        }
        .carousel-banner .control-next {
          right: 16px;
        }
        @media (max-width: 768px) {
          .carousel-banner .control-dots {
            left: 50% !important;
            transform: translateX(-50%);
            bottom: 60px !important;
          }
          .carousel-banner .control-arrow {
            opacity: 0.5;
          }
        }
      `}</style>

      <Carousel
        className="carousel-banner"
        showThumbs={false}
        autoPlay={isPlaying}
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        interval={5000}
        transitionTime={600}
        swipeable
        emulateTouch
        stopOnHover={false}
        selectedItem={activeSlide}
        onChange={handleSlideChange}
        renderArrowPrev={(onClickHandler, hasPrev) => (
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
          )
        )}
        renderArrowNext={(onClickHandler, hasNext) => (
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next slide"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          )
        )}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full group/slide">
            <div className="relative w-full h-55 sm:h-75 md:h-95 lg:h-105 overflow-hidden rounded-2xl md:rounded-[32px] bg-gray-900">
              {/* Background Image */}
              <div className="absolute inset-0">
                {!imagesLoaded.get(index) && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                )}
                <img
                  src={slide.img}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(index)}
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                    activeSlide === index ? 'scale-105' : 'scale-100'
                  } group-hover/slide:scale-110`}
                />
                {/* Enhanced Overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 text-left z-10">
                <div className="max-w-2xl space-y-3 md:space-y-4">
                  <h2 
                    className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight transition-all duration-700 ${
                      activeSlide === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ 
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      transitionDelay: activeSlide === index ? '100ms' : '0ms'
                    }}
                  >
                    {slide.title}
                  </h2>
                  <p 
                    className={`text-gray-100 text-sm sm:text-base md:text-lg max-w-lg line-clamp-2 md:line-clamp-none leading-relaxed transition-all duration-700 ${
                      activeSlide === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ 
                      textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                      transitionDelay: activeSlide === index ? '200ms' : '0ms'
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  
                  <div 
                    className={`pt-2 md:pt-4 transition-all duration-700 ${
                      activeSlide === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: activeSlide === index ? '300ms' : '0ms' }}
                  >
                    <GetStartedButton url={slide.redirect_url} isExternal={isExternalUrl(slide.redirect_url)} />
                  </div>
                </div>
              </div>

              {/* Subtle Border */}
              <div className="absolute inset-0 rounded-2xl md:rounded-[32px] ring-1 ring-white/5 pointer-events-none" />
            </div>
          </div>
        ))}
      </Carousel>

      {/* Play/Pause Control */}
      <button
        type="button"
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            key={activeSlide}
            className="h-full bg-orange-500 rounded-full animate-progress"
            style={{ 
              animation: 'progress 5s linear',
              animationFillMode: 'forwards'
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
});

interface GetStartedButtonProps {
  url: string;
  isExternal: boolean;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ url, isExternal }) => {
  const navigate = useNavigate();
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isExternal) {
      e.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [isExternal, url]);

  const content = (
    <>
      <span>Learn More</span>
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  const baseClasses = `
    inline-flex items-center gap-2 group/btn
    px-5 py-2.5 md:px-7 md:py-3
    rounded-full text-sm md:text-base font-semibold
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black
    active:scale-95
  `;

  const primaryClasses = `
    ${baseClasses}
    text-white bg-orange-600 hover:bg-orange-500
    shadow-lg shadow-orange-600/30 hover:shadow-orange-500/40
    hover:-translate-y-0.5
  `;

  if (!url) {
    return (
      <button 
        onClick={() => navigate('/learn')}
        className={primaryClasses}
        aria-label="Learn more about this feature"
      >
        {content}
      </button>
    );
  }

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={primaryClasses}
        onClick={handleClick}
        aria-label={`Learn more (opens in new tab)`}
      >
        {content}
        <ExternalLink size={14} className="opacity-70" />
      </a>
    );
  }

  return (
    <Link to={url} className={primaryClasses}>
      {content}
    </Link>
  );
};

CarouselBanner.displayName = 'CarouselBanner';

export default CarouselBanner;