import Image from "next/image";
import { useEffect, useState } from "react";
import CountdownTimer from "./component/countDown.component";
import Button from "@/components/widgets/Button.widget";
import {MPHttpUtilNoSecure} from "@/utils/MPHttpNosecure.utils";

interface FeatureProductList {
  id: number;
  title: string;
  imagePath: string;
  bannerDescription: string;
  startDate: string;
  endDate: string;
  productPrice: string;
}
export default function FutureProduct() {
  const [bannerData, setBannerData] = useState<FeatureProductList[]>([]);
  const mpHttp = new MPHttpUtilNoSecure()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      setLoading(true);
      setError(null);

      mpHttp.get("FeatureBanner/GetAllFeatureBanner", {}, {}, (result: any, error: any) => {
        if (error) {
          console.error("Error fetching banners:", error);
          setError("Failed to load banners");
          setLoading(false);
        } else {
          console.log("Banner fetched successfully:", result);

          // Check if result is an array and has items
          if (Array.isArray(result) && result.length > 0) {
            setBannerData(result);
          } else {
            setError("No banners available");
          }
          setLoading(false);
        }
      });
    };

    fetchBanner();
  }, []);

  // Loading state
  if (loading) {
    return (
        <div className="relative bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#000222_0%,#292B47_100%)] md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-2/4 mb-4"></div>
          </div>
        </div>
    );
  }

  // Error state
  if (error) {
    return (
        <div className="relative bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#000222_0%,#292B47_100%)] md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
          <div className="text-white text-center">
            <p>Error loading banner: {error}</p>
          </div>
        </div>
    );
  }

  // No data state
  if (!bannerData) {
    return (
        <div className="relative bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#000222_0%,#292B47_100%)] md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
          <div className="text-white text-center">
            <p>No banner data available</p>
          </div>
        </div>
    );
  }

  return (
      <div className="relative bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#000222_0%,#292B47_100%)] md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px]">
        <p className="text-white font-[600] text-[11px] absolute top-4 right-4">
          Featured Post
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
          <div className="flex flex-col gap-4">
            <p className="text-[11px] text-primary font-[400]">
              {bannerData[0]?.title}
            </p>
            <p className="text-[16px] font-[600] text-white">
              ${bannerData[0]?.productPrice}
            </p>
            <h2 className="text-[20px] md:text-[34px] text-white lg:text-[48px] font-[700]">
              {bannerData[0]?.bannerDescription}
            </h2>
            <div>
              <CountdownTimer
                  startDate={bannerData[0]?.startDate}
                  endDate={bannerData[0]?.endDate}
              />
            </div>
            <div className="w-[127px]">
              <Button size="medium" color="pink">
                Buy Now
              </Button>
            </div>
          </div>
          <div className="drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]">
            <Image
                src={bannerData[0]?.imagePath || "/img/jbl.png"}
                className="lg:h-[330px] lg:w-[568px] md:w-[330px] md:h-[195px] w-full h-auto"
                alt={bannerData[0]?.title || "product"}
                width={568}
                height={330}
            />
          </div>
        </div>
      </div>
  );
}