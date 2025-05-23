const UnusedItemSkeleton = () => {
  return (
    <section className="bg-white md:py-[48px] md:px-[32px] py-[39px] px-[20px] lg:py-[73px] lg:px-[88px] lg:mx-[-88px] md:mx-[-32px] mx-[-16px] animate-pulse">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-4 lg:w-[513px] md:w-[364.8px] order-2 md:order-1">
          {/* Title Skeleton */}
          <div className="w-5/6 h-8 bg-gray-300 rounded-md md:h-10 lg:h-12" />
          {/* Description Skeleton */}
          <div className="w-3/4 h-6 bg-gray-300 rounded-md md:h-8" />
          {/* Button Skeleton */}
          <div className="w-[159px]">
            <div className="h-10 rounded-md bg-primary" />
          </div>
        </div>

        <div className="flex justify-center order-1 md:order-2">
          {/* Image Skeleton */}
          <div className="lg:h-[410px] lg:w-[620px] md:w-[440.89px] md:h-[291.56px] w-[376.73px] h-[240.13px] bg-gray-300 rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default UnusedItemSkeleton;
