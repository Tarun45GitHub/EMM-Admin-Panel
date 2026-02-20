import TransferCoin from "../components/transfer/TransferCoin";
import { useLoader } from "../components/ui/LoaderContext";
import { useEffect } from "react";

const Transfer:React.FC=()=>{
    const { showLoader, hideLoader } = useLoader();
         useEffect(() => {
          showLoader();
          const timer = setTimeout(() => {
            hideLoader();
          }, 1000);
      
          return () => clearTimeout(timer)
         }, []);
    return(
        <div>
            <TransferCoin/>
        </div>
    );
}
export default Transfer;