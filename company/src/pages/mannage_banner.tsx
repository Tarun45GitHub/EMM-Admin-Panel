import BannerCard from "../components/mannage_banner/banner";
import banner1 from "../components/banners/banner1.jpg"
import banner2 from "../components/banners/banner1.jpg"
import banner3 from "../components/banners/banner1.jpg"
import banner4 from "../components/banners/banner1.jpg"
import InputBanner from "../components/mannage_banner/input_banner";


const MannageBanner:React.FC=()=>{
    return (
        <div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 p-5 m-5">
                <BannerCard imageUrl={banner1}/>
                <BannerCard imageUrl={banner2}/>
                <BannerCard imageUrl={banner3}/>
                <BannerCard imageUrl={banner4}/>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 p-5 m-5">
                <InputBanner/>
                <InputBanner/>
                <InputBanner/>
                <InputBanner/>
            </div>
        </div>
    );
}
export default MannageBanner;