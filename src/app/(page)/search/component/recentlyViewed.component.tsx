import SearchProductCard from "./productSearchComponent.component";
import RecentlyViewProductCard from "./recentlyViewProductCard.component";

export default function RecentlyViewdProduct() {
  return (
    <div className="flex flex-col gap-[20px] w-full">
      <div className="flex items-center justify-between ">
        <p className="text-[16px]  font-[700] text-[#060619]">Related Products</p>
        <button className="text-[#212844] text-[14px] font-[600] flex items-center gap-[8px] ">
          View All <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <RecentlyViewProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
