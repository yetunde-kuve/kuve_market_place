const PopularProductCardSkeleton = () => {
  return (
    <div className="w-[186.28px] flex flex-col md:gap-[10px] gap-[6px] rounded-[14px] px-[14px] py-[10px] md:rounded-[24px] md:w-[298px] xl:w-full lg:w-full bg-white animate-pulse">
      <div className="relative">
        {/* Verified Badge Skeleton */}
        <div className="md:w-[24px] absolute lg:top-[16px] lg:right-[7px] top-[7.85px] right-[5.85px] md:h-[24px] h-[18px] w-[18px] rounded-full bg-gray-300" />
        {/* Image Container Skeleton */}
        <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-gray-300" />
      </div>
      <div className="flex gap-[12px] items-center">
        {/* Avatar Skeleton */}
        <div className="h-[30px] w-[30px] md:h-[48px] md:w-[48px] rounded-full bg-gray-300 flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden bg-gray-400 rounded-full" />
        </div>

        {/* Text Skeletons */}
        <div>
          <div className="w-3/4 h-5 mb-1 bg-gray-300 rounded-md md:h-7" />
          <div className="w-1/2 h-3 bg-gray-300 rounded-md md:h-4" />
        </div>
      </div>
    </div>
  );
};

export default PopularProductCardSkeleton;
