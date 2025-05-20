import React, { useRef } from "react";
import TrendingProductCard from "@/features/product/trendingProduct/trendingProductCard/trendingProductCard.productCard";
import ViewAll from "@/components/widgets/ViewAll.widget";
import T1 from "../../../../public/svg/t1.svg";
import T2 from "../../../../public/svg/t2.svg";
import T3 from "../../../../public/svg/t3.svg";
import T4 from "../../../../public/svg/t4.svg";
const TrendingProduct = () => {
  const products = [
    {
      id: 1,
      image: T1,
      productName: "Breed Dry Dog Food",
      price: "₦ 1’500,000.00"
    },
    {
      id: 2,
      image: T2,
      productName: "Breed Dry Dog Food",
      price: "₦ 1’500,000.00"
    },
    {
      id: 3,
      image: T3,
      productName: "Breed Dry Dog Food",
      price: "₦ 1’500,000.00"
    },
    {
      id: 4,
      image: T4,
      productName: "Breed Dry Dog Food",
      price: "₦ 1’500,000.00"
    },
  ];
  return (
    <section className="flex flex-col w-full md:gap-[30px] gap-[18px]">
      <div className="flex items-center justify-between">
        <p className="text-text md:text-[20px] font-[600] text-[12.5px]">
          Trending Products
        </p>
        <ViewAll />
      </div>
      <div className="flex w-full items-center gap-[9.8px] md:gap-[10px] lg:gap-[22px] overflow-x-auto scrollbar-none whitespace-nowrap">
        <div className="flex gap-[9.8px] md:gap-[10px] lg:gap-[22px] w-max">
          {products.map((product) => (
            <TrendingProductCard
              key={product.id}
              image={product.image}
              productName={product.productName}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProduct;
