// This is a Server Component (default in the app/ directory)
import dynamic from "next/dynamic";
import LandingPageWrapper from "@/layouts/landingPageWrapper/landingPageWrapper.wrapper";
import PopularProductSection from "@/features/landingPage/poppularProductSection/popularproduct.section";
import FutureProduct from "@/features/landingPage/futureProductsection/futureproduction.section";
import TrendingProduct from "@/features/landingPage/trendingProductSection/trendingProduct";
import UnusedItemSection from "@/features/landingPage/unusedItemSection/unusedItem.section";
import GrowBusinessSection from "@/features/landingPage/growBusinessSection/growBusiness.section";
import { MPHttpUtilNoSecure } from "@/utils/MPHttpNosecure.utils";

// Dynamically import client-only slider
const SliderClient = dynamic(
  () => import("@/features/landingPage/slider/slider/sliderCLient.client"),
  { ssr: false }
);

async function fetchBanners(): Promise<{ banners: any; error: string | null }> {
  const mpHttp = new MPHttpUtilNoSecure();

  return new Promise((resolve) => {
    mpHttp.get("TopBanner/GetAllTopBanner", {}, {}, (result: any, err: any) => {
      if (err) {
        console.error("Banner fetch error:", err);
        resolve({ banners: [], error: "Failed to load banners" });
      } else if (Array.isArray(result) && result.length > 0) {
        resolve({ banners: result, error: null });
      } else {
        resolve({ banners: [], error: "No banners available" });
      }
    });
  });
}

export default async function HomePage() {
  const { banners, error } = await fetchBanners();

  return (
    <LandingPageWrapper>
      <div className="flex flex-col lg:gap-[52px] md:gap-[39px] gap-[26px]">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <SliderClient products={banners} />
        )}
        <PopularProductSection />
        <FutureProduct />
        <TrendingProduct />
        <UnusedItemSection />
        <GrowBusinessSection />
      </div>
    </LandingPageWrapper>
  );
}
