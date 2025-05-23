const TrendingProductCardSkeleton = () => {
  return (
    <div className="w-[178.85px] h-[198.37px] flex flex-col md:gap-x-[16px] gap-[9.52px] rounded-[14px] pt-[15px] px-[15px] md:rounded-[24px] lg:w-[335px] lg:h-[274px] md:w-[286.64px] md:h-[271.91px] bg-white animate-pulse">
      <div className="relative">
        {/* Heart Button Skeleton */}
        <div className="lg:w-[34px] lg:h-[34px] md:w-[32.35px] md:h-[32.45px] bg-gray-300 absolute lg:top-[7px] lg:right-[7px] top-[3.85px] right-[3.85px] h-[20.23px] w-[20.23px] rounded-full flex justify-center items-center" />
        {/* Image Skeleton */}
        <div className="md:w-[266px] rounded-[7px] md:rounded-[12px] md:h-[160px] lg:w-[305px] lg:h-[180px] w-[161px] h-[126px] bg-gray-300" />
      </div>

      <div>
        {/* Product Name Skeleton */}
        <div className="w-3/4 h-4 mt-2 bg-gray-300 rounded-md md:h-6" />
      </div>
      <div>
        {/* Price Skeleton */}
        <div className="w-1/2 h-3 bg-gray-300 rounded-md md:h-4" />
      </div>
    </div>
  );
};

export default TrendingProductCardSkeleton;
