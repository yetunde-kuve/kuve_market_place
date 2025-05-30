export default function SearchActiveFilter() {
  return (
    <div className="bg-white flex justify-between md:items-center md:flex-row flex-col gap-[10px] rounded-[8px] px-[10px] py-[8px] md:px-[24px] md:py-[12px] mb-[20px]">
      {/* This will appear second on mobile, first on md+ */}
      <div className="flex items-center md:gap-4 gap-[8px] flex-wrap order-2 md:order-1">
        <p className="md:text-[14px] text-[10px] text-[#5F6C72] font-[400]">Active Filters:</p>

        <button className="md:text-[14px] text-[10px] items-center font-[400] text-[#191C1F] flex gap-[6px]">
          Electronics Devices
          <i className="ri-close-fill text-[14px] text-[#929FA5]"></i>
        </button>
        <button className="md:text-[14px] text-[10px] items-center font-[400] text-[#191C1F] flex gap-[6px]">
          Nike
          <i className="ri-close-fill text-[14px] text-[#929FA5]"></i>
        </button>
        <button className="md:text-[14px] text-[10px] items-center font-[400] text-[#191C1F] flex gap-[6px]">
          Lagos
          <i className="ri-close-fill text-[14px] text-[#929FA5]"></i>
        </button>
      </div>

      {/* This will appear first on mobile, second on md+ */}
      <div className="order-1 md:order-2">
        <p className="md:text-[14px] text-[10px] text-[#5F6C72] font-[400]">
          <span className="font-[400] text-[#191C1F]">65,867</span> Results found
        </p>
      </div>
    </div>
  );
}
