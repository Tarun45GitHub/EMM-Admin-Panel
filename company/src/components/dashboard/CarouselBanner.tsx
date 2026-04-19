import React, { memo, useCallback, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
} from "lucide-react";

import api from "../../api/Axios";

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  redirect_url: string;
  display_order: number;
  is_active: boolean;
}

interface Slide {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  redirect_url: string;
}

const defaultSlides: Slide[] = [
  {
    id: 0,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    title: "Welcome",
    subtitle: "Your default fallback banner",
    redirect_url: "/",
  },
];

const CarouselBanner: React.FC = memo(() => {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/crm/banners");

      if (response.data?.success && Array.isArray(response.data.data)) {
        const formattedSlides: Slide[] = response.data.data
          .filter((item: BannerData) => item.is_active)
          .sort(
            (a: BannerData, b: BannerData) =>
              a.display_order - b.display_order
          )
          .map((banner: BannerData) => ({
            id: banner.id,
            img: banner.image,
            title: banner.title,
            subtitle: banner.subtitle,
            redirect_url: banner.redirect_url,
          }));

        if (formattedSlides.length > 0) {
          setSlides(formattedSlides);
        }
      }
    } catch (error) {
      console.error("Banner fetch failed:", error);
      setSlides(defaultSlides);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const isExternalUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://");

  if (loading) {
    return (
      <div className="w-full h-56 md:h-96 bg-gray-200 rounded-2xl animate-pulse" />
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators
        infiniteLoop
        autoPlay={isPlaying}
        interval={5000}
        transitionTime={600}
        selectedItem={activeSlide}
        onChange={(index) => setActiveSlide(index)}
        renderArrowPrev={(clickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={clickHandler}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
            >
              <ChevronLeft size={22} />
            </button>
          )
        }
        renderArrowNext={(clickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={clickHandler}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
            >
              <ChevronRight size={22} />
            </button>
          )
        }
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-2xl"
            />

            <div className="absolute inset-0 bg-black/40 rounded-2xl" />

            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-14 text-left text-white">
              <h2 className="text-2xl md:text-5xl font-bold mb-3">
                {slide.title}
              </h2>

              <p className="text-sm md:text-lg max-w-xl mb-6">
                {slide.subtitle}
              </p>

              {isExternalUrl(slide.redirect_url) ? (
                <a
                  href={slide.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-full font-semibold w-fit"
                >
                  Learn More
                  <ArrowRight size={18} />
                  <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  to={slide.redirect_url}
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-full font-semibold w-fit"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </Carousel>

      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 z-20 bg-black/40 text-white p-2 rounded-full"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
});

CarouselBanner.displayName = "CarouselBanner";

export default CarouselBanner;