// import dynamic from "next/dynamic";
import { MPHttpUtilNoSecure } from "@/utils/MPHttpNosecure.utils";

// Dynamically import the client component with no SSR
import dynamic from "next/dynamic";
const SliderClient = dynamic(() => import("./sliderCLient.client"), {
  ssr: false,
});

async function fetchBanners() {
  const mpHttp = new MPHttpUtilNoSecure();

  return new Promise<{ banners: any[]; error: string | null }>((resolve) => {
    mpHttp.get("TopBanner/GetAllTopBanner", {}, {}, (result: any, err: any) => {
      if (err) {
        console.error("Error fetching banners:", err);
        resolve({ banners: [], error: "Failed to load banners" });
      } else if (Array.isArray(result) && result.length > 0) {
        resolve({ banners: result, error: null });
      } else {
        resolve({ banners: [], error: "No banners available" });
      }
    });
  });
}

export default async function Slider() {
  const { banners, error } = await fetchBanners();

  // Optionally handle error or empty banners here if you want

  return <SliderClient products={banners} />;
}
