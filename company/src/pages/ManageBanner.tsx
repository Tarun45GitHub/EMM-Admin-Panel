import BannerCard from "../components/manage_banner/banner";
import InputBanner from "../components/manage_banner/InputBanner";
import React,{useEffect,useState} from "react";
import { useLoader } from "../components/ui/LoaderContext";
import NotFound from "./NotFound";
import api from "../api/Axios";


const MannageBanner:React.FC = () => {
  const [data, setData] = useState< null>(null);
  const [error, setError] = useState<string | null>(null);
  const { showLoader, hideLoader } = useLoader();
  useEffect(() => {
    const fetchData=async()=>{
      try {
        showLoader();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await api.get("/crm/banners")
        if (!response) throw new Error('Failed to fetch data');
        setData(response.data.data[0].image)
        console.log(response.data.data[0].image);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally{
        hideLoader()
      }
    }
    fetchData();
  }, [])

  if(error){
    return(
      <NotFound/>
    );
  }
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
            <BannerCard imageUrl={data} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg p-3">
            <BannerCard imageUrl={data} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg p-3">
            <BannerCard imageUrl={data} />
          </div>
          <div className="transition-transform hover:scale-105 hover:shadow-lg p-3">
            <BannerCard imageUrl={data} />
          </div>
        </div>
      </section>

      {/* Banner Inputs */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Edit Banners
        </h2>
        <div className="">
          <InputBanner value={1} />
        </div>
      </section>
    </div>
  );
  
};

export default MannageBanner;
