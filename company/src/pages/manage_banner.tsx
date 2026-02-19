import BannerCard from "../components/manage_banner/banner";
import banner1 from "../components/banners/banner1.jpg";
import banner2 from "../components/banners/banner2.jpg";
import banner3 from "../components/banners/banner3.jpg";
import banner4 from "../components/banners/banner4.jpg";
import InputBanner from "../components/manage_banner/input_banner";
import Spinner from "../layout/Spinner";
import React,{useState,useEffect} from "react";

const MannageBanner:React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if(isLoading){
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Spinner size={60} colorClass="border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-10 p-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Manage Banners
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Customize and update your site banners easily
        </p>
      </div>

      {/* Banner Previews */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Banner Previews
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="transition-transform hover:scale-105 hover:shadow-lg">
            <BannerCard imageUrl={banner1} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg">
            <BannerCard imageUrl={banner2} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg">
            <BannerCard imageUrl={banner3} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg">
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
