import ViewAll from "@/components/widgets/ViewAll.widget";
import PopularProductCard from "@/features/product/popularProduct/popularPorductCard/popularProductCard.productcard";

export default function PopularProductSection() {
  return (
    <div className="flex flex-col w-full md:gap-[30px] gap-[18px]">
      <div className="flex items-center justify-between">
        <p className="text-text  md:text-[20px] font-[600] text-[12.5px] ">
          Popular Stores
        </p>
        <ViewAll />
      </div>
      <div className="flex w-full items-center gap-[9.8px] md:gap-[10px]  lg:gap-[22px] overflow-x-auto scrollbar-none whitespace-nowrap">
        <PopularProductCard image="https://mchris.ng/wp-content/uploads/2023/06/1-17.jpg" />
        <PopularProductCard />
        <PopularProductCard />
        <PopularProductCard />
      </div>
    </div>
  );
}
