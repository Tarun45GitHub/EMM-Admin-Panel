import BannerCard from "../components/manage_banner/banner";
import banner1 from "../components/banners/banner1.jpg"
import banner2 from "../components/banners/banner2.jpg"
import banner3 from "../components/banners/banner3.jpg"
import banner4 from "../components/banners/banner4.jpg"
import InputBanner from "../components/manage_banner/input_banner";


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
                <InputBanner value={1}/>
                <InputBanner value={2}/>
                <InputBanner value={3}/>
                <InputBanner value={4}/>
            </div>
        </div>
    );
}
export default MannageBanner;