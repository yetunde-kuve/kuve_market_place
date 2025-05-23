import SliderButton from "@/components/sliderButton/sliderButton.sliderButton";
import Button from "@/components/widgets/Button.widget";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {MPHttpUtilNoSecure} from "@/utils/MPHttpNosecure.utils";
import HeroSliderSkeleton from "@/components/skeleton/slider/slider.skeleton";

interface product {
  id: number;
  title: string;
  imagePath: string;
  bannerDescription: string;
}
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mpHttp = new MPHttpUtilNoSecure()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSmallerScreen = useMediaQuery({ maxWidth: 320 });
  const [productList, setProductList] = useState<product[]>([])


  useEffect(() => {
    const fetchBanner = async () => {
      setLoading(true);
      setError(null);

      mpHttp.get("TopBanner/GetAllTopBanner", {}, {}, (result: any, error: any) => {
        if (error) {
          console.error("Error fetching banners:", error);
          setError("Failed to load banners");
          setLoading(false);
        } else {
          console.log("Banner fetched successfully:", result);

          // Check if result is an array and has items
          if (Array.isArray(result) && result.length > 0) {
            setProductList(result);
          } else {
            setError("No banners available");
          }
          setLoading(false);
        }
      });
    };

    fetchBanner();
  }, []);


  // Next slide function
  const goToNext = () => {
    if (productList.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % productList.length);
    }
  };

  // Previous slide function
  const goToPrevious = () => {
    if (productList.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + productList.length) % productList.length);
    }
  };

  // Automatically slide every 5 seconds - only start when data is loaded
  useEffect(() => {
    if (productList.length === 0) return; // Don't start auto-slide if no data

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [productList.length]); // Depend on productList.length

  // Show loading state with skeleton
  if (loading) {
    return (
        <HeroSliderSkeleton/>
    );
  }

  // Show error state
  if (error) {
    return (
        <div className="relative w-full lg:h-[310px] md:h-auto h-[168px] flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
    );
  }

  // Show empty state
  if (productList.length === 0) {
    return (
        <div className="relative w-full lg:h-[310px] md:h-auto h-[168px] flex items-center justify-center">
          <div className="text-white">No banners available</div>
        </div>
    );
  }

  // Get current product safely
  const currentProduct = productList[currentIndex];

  return (
    <div className="relative w-full lg:h-[310px] md:h-auto h-[168px]">
      {/* Slider Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover shadow-xl rounded-2xl bg-text"
        style={{
          backgroundImage: `url('/svg/heroslide.svg')`,
        }}
      />

      {/* Slider Content */}
      <div className="relative flex items-center justify-between w-full h-full gap-6 lg:gap-20 md:gap-10">
        {/* Left Button */}
        <div className="absolute top-1/2 md:left-[-30px] left-[-10px]  transform -translate-y-1/2 z-10">
          <SliderButton
            icon={<i className="ri-arrow-left-s-line"></i>}
            onClick={goToPrevious}
          />
        </div>

        {/* Product Text and Button (Left Side) */}
        <div className="z-10 flex  flex-col lg:w-[60%] sm:w-[100%] md:w-[100%] items-start justify-center p-6 text-white lg:pl-28 md:pl-14">
          <p className="font-[600] text-white text-[clamp(10px, 3vw, 24px)]">
            {currentProduct?.title}
          </p>
          <h2
            style={{ fontSize: isSmallerScreen ? "10px" : "" }}
            className="font-[700] text-white  lg:text-[48px] md:text-[24px]  text-[16px]"
          >
            {currentProduct?.bannerDescription}
          </h2>
          {isSmallerScreen ? (
            <button className="text-[10px] rounded-full bg-primary  text-slate-900 px-2 py-2">
              {" "}
              Start Shopping
            </button>
          ) : (
            <button className="mt-2 text-[8px] font-[600] text-black-primary px-[24px] py-[9.5px] rounded-full bg-primary md:text-[10px] lg:text-[14px]">
              {" "}
              Start Shopping
            </button>
          )}
        </div>

        <div className="justify-end flex-shrink-0 md:pr-16 lg:pr-28 py-2">
          <Image
            src={currentProduct?.imagePath}
            alt={currentProduct?.title}
            height={270}
            width={268}
            className="lg:w-[268px] lg:h-[270px] md:w-[192px] md:h-[212px]  w-[113px] h-[112px]"
          />
        </div>

        {/* Right Button */}
        <div className="absolute top-1/2 md:right-[-30px]  right-[-10px] transform -translate-y-1/2 z-10">
          <SliderButton
            icon={<i className="ri-arrow-right-s-line"></i>}
            onClick={goToNext}
          />
        </div>
      </div>

      {/* Indicator Circles */}
      <div className="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-4">
        {productList.map((_, index) => (
          <div
            key={index}
            className={` rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
              currentIndex === index
                ? "bg-white w-[28px] h-[8px] rounded-full"
                : "bg-white w-[8px] h-[8px]"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
