import ViewAll from "@/components/widgets/ViewAll.widget";
import PopularProductCard from "@/features/product/popularProduct/popularPorductCard/popularProductCard.productcard";
import P1 from "../../../../public/svg/p1.svg";
import P2 from "../../../../public/svg/p2.svg";
import P3 from "../../../../public/svg/p3.svg";
import P4 from "../../../../public/svg/p4.svg";

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
        <PopularProductCard
          title="SkyshowNG "
          location="Ikeja, Lagos"
          image={P1}
        />
        <PopularProductCard
          image={P2}
          title="Nugget Wears"
          location="Ikeja, Lagos"
        />
        <PopularProductCard
          image={P3}
          title=" Yomi Casual"
          location="Lekki phase 1, Lagos"
        />
        <PopularProductCard
          image={P4}
          title="Wills Enterprise"
          location="Ikeja, Lagos"
        />
      </div>
    </div>
  );
}
