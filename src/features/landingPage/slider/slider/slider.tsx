import SliderButton from "@/components/sliderButton/sliderButton.sliderButton";
import Button from "@/components/widgets/Button.widget";
import Image from "next/image";
import { useState, useEffect } from "react";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const productList = [
    {
      id: 1,
      title: "Kuve",
      description: "Your AI-powered Secure Marketplace",
      image: "/img/watch.svg",
    },
    {
      id: 2,
      title: "Kuve",
      description: "Set Up Your Storefront",
      image: "/img/watch.svg",
    },
    {
      id: 3,
      title: "Kuve",
      description: "List un-use Items On Kuve Today",
      image: "/img/watch.svg",
    },
  ];

  // Next slide function
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % productList.length);
  };

  // Previous slide function
  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + productList.length) % productList.length
    );
  };

  // Automatically slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 5000); // Change slide every 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  lg:h-[316px] md:h-[296px] h-[186px]">
      {/* Slider Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover shadow-xl rounded-2xl bg-text"
        style={{
          backgroundImage: `url('/path/to/your/slider-background.jpg')`, // Use your background image path here
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
        <div className="z-10 flex flex-col items-start justify-center p-6 text-white md:pl-20">
          <p className="lg:text-[24px] font-[600] text-white text-[10px] md:text-[17px]">
            {" "}
            {productList[currentIndex].title}
          </p>
          <h2 className="text-[20px]  md:text-[34px] text-white lg:text-[48px] font-[700]">
            {productList[currentIndex].description}
          </h2>

          <Button size="medium" color="pink">
            Start Shopping
          </Button>
        </div>

        <div className="justify-end flex-shrink-0 md:pr-14">
          <Image
            src={productList[currentIndex].image}
            alt={productList[currentIndex].title}
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
      <div className="absolute left-0 right-0 z-10 flex justify-center gap-3 bottom-4">
        {productList.map((_, index) => (
          <div
            key={index}
            className={`w-[8px] h-[8px] rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
              currentIndex === index
                ? "bg-white w-[28px] h-[8px] rounded-full"
                : "bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
