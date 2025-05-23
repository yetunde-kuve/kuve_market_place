const HeroSliderSkeleton = () => {
  return (
    <div className="relative w-full lg:h-[310px] md:h-auto h-[168px]">
      {/* Slider Background Skeleton */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-300 shadow-xl rounded-2xl animate-pulse" />

      {/* Slider Content Skeleton */}
      <div className="relative flex items-center justify-between w-full h-full gap-6 p-6 lg:gap-20 md:gap-10 lg:pl-28 md:pl-14">
        {/* Left Button Skeleton */}
        <div className="absolute top-1/2 left-[-10px] md:left-[-20px] transform -translate-y-1/2 z-10">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
        </div>

        {/* Product Text and Button Skeleton (Left Side) */}
        <div className="z-10 flex flex-col items-start justify-center w-full lg:w-[60%] md:w-[100%]">
          <div className="w-1/2 h-6 mb-2 bg-gray-300 rounded-md animate-pulse" />
          <div className="w-3/4 h-8 mb-4 bg-gray-300 rounded-md animate-pulse" />
          <div className="w-1/4 h-8 bg-gray-300 rounded-full animate-pulse" />
        </div>

        {/* Product Image Skeleton */}
        <div className="flex justify-end flex-shrink-0 py-2 md:pr-16 lg:pr-28">
          <div className="lg:w-[268px] lg:h-[270px] md:w-[192px] md:h-[212px] w-[113px] h-[112px] bg-gray-300 rounded-md animate-pulse" />
        </div>

        {/* Right Button Skeleton */}
        <div className="absolute top-1/2 right-[-10px] md:right-[-20px] transform -translate-y-1/2 z-10">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Indicator Circles Skeleton */}
      <div className="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-2 rounded-full bg-gray-300 animate-pulse`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSliderSkeleton;
