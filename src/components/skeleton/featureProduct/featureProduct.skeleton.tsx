const FeaturedProductSkeleton = () => {
  return (
    <div className="relative bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#000222_0%,#292B47_100%)] md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px] animate-pulse">
      {/* Featured Post Label Skeleton */}
      <div className="absolute w-24 h-4 bg-gray-400 rounded-md top-4 right-4" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
        <div className="flex flex-col gap-4">
          {/* Title Skeleton */}
          <div className="w-1/4 h-3 rounded-md bg-primary" />
          {/* Price Skeleton */}
          <div className="w-1/3 h-4 bg-gray-400 rounded-md" />
          {/* Description Skeleton */}
          <div className="w-5/6 h-8 bg-gray-400 rounded-md md:h-12 lg:h-16" />
          {/* Countdown Timer Skeleton (4 circles) */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gray-400 rounded-full" />
            <div className="w-10 h-10 bg-gray-400 rounded-full" />
            <div className="w-10 h-10 bg-gray-400 rounded-full" />
            <div className="w-10 h-10 bg-gray-400 rounded-full" />
          </div>
          {/* Button Skeleton */}
          <div className="w-[127px]">
            <div className="h-10 rounded-md bg-primary" />
          </div>
        </div>
        {/* Image Skeleton */}
        <div className="drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] flex justify-center items-center">
          <div className="lg:h-[330px] lg:w-[568px] md:w-[330px] md:h-[195px] w-full h-[150px] bg-gray-400 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductSkeleton;
