import React, { useEffect, useState } from "react";
import BannerCard from "../components/manage_banner/banner";
import InputBanner from "../components/manage_banner/InputBanner";
import { useLoader } from "../components/ui/LoaderContext";
import NotFound from "./NotFound";
import api from "../api/Axios";

// Define a type for your Banner data
interface Banner {
  id:  number;
  title: string;
  image: string;
}

const ManageBanner: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader();
        // Artificial delay removed for production feel, but kept if you prefer it
        const response = await api.get("/crm/banners");
        
        if (!response.data || !response.data.data) {
          throw new Error('Failed to fetch data');
        }

        const bannerData: Banner[] = response.data.data;
        setBanners(bannerData);

        // Auto-select the first banner if available
        if (bannerData.length > 0) {
          setSelectedBanner(bannerData[0]);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        hideLoader();
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const banner = banners.find(b => b.id.toString() === e.target.value);
    if (banner) setSelectedBanner(banner);
  };
// console.log(selectedBanner?.id);

  if (error) return <NotFound />;

  return (
    <div className="space-y-10 p-5">
      {/* Header */}
      <div className="text-center dark:bg-[#1E293B] rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Manage Banners
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Select a banner to preview and update its details.
        </p>
      </div>

      {/* Selection & Preview Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        {/* Dropdown Row */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Banner to Edit
          </label>
          <select 
            onChange={handleSelectChange}
            value={selectedBanner?.id || ""}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {banners.map((banner) => (
              <option key={banner.id} value={banner.id}>
                {banner.title || `Banner ${banner.id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Preview */}
        {selectedBanner && (
          <div className="flex justify-center">
            <div className="w-full max-w-2xl transition-all duration-300">
               <BannerCard imageUrl={selectedBanner.image} />
            </div>
          </div>
        )}
      </section>

      {/* Edit Form Section */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 border-b pb-2">
            Edit Details
          </h2>
          {/* Passing selectedBanner id to the input component */}
          <InputBanner bannerId={selectedBanner?.id} />
        </div>
      </section>
    </div>
  );
};

export default ManageBanner;