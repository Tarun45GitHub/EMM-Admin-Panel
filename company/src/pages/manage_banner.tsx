import BannerCard from "../components/manage_banner/banner";
import banner1 from "../components/banners/banner1.jpg";
import banner2 from "../components/banners/banner2.jpg";
import banner3 from "../components/banners/banner3.jpg";
import banner4 from "../components/banners/banner4.jpg";
import InputBanner from "../components/manage_banner/input_banner";
import React,{useEffect} from "react";
import { useLoader } from "../components/ui/LoaderContext";


const MannageBanner:React.FC = () => {
  const { showLoader, hideLoader } = useLoader();
     useEffect(() => {
      showLoader();
      const timer = setTimeout(() => {
        hideLoader();
      }, 1000);
  
      return () => clearTimeout(timer)
     }, []);

  return (
    <div className="space-y-10 p-5">
      {/* Header */}
      <div className="text-center dark:bg-[#1E293B] rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 pt-3">
          Manage Banners
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 pb-3">
          Customize and update your site banners easily
        </p>
      </div>

      {/* Banner Previews */}
      <section className="">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Banner Previews
        </h2>
        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 dark:bg-[#1E293B] rounded-lg">
          <div className="transition-transform hover:scale-105 hover:shadow-lg p-3">
            <BannerCard imageUrl={banner1} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg p-3">
            <BannerCard imageUrl={banner2} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg p-3">
            <BannerCard imageUrl={banner3} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg p-3">
            <BannerCard imageUrl={banner4} />
          </div>
        </div>
      </section>

      {/* Banner Inputs */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Edit Banners
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <InputBanner value={1} />
          <InputBanner value={2} />
          <InputBanner value={3} />
          <InputBanner value={4} />
        </div>
      </section>
    </div>
  );
  
};

export default MannageBanner;
