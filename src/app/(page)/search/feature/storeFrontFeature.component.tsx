import SearchStoreFront from "../component/storeFront.component";
import StoreLogo from "../../../../../public/svg/sStoreLogo.svg";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

export default function SearchStoreFontFeature() {
  const [products, setProducts] = useState(["", "", "", ""]);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  // Show only 3 products on tablet, all others otherwise
  const visibleProducts = isTablet ? products.slice(0, 3) : products;

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-[10px] md:gap-[20px] lg:gap-[36px]">
      {visibleProducts.map((_, index) => (
        <SearchStoreFront
          key={index}
          address="45 Awolowo Road, Ikoyi"
          name="ShopPoint"
          img={StoreLogo}
          isVerified={true}
        />
      ))}
    </div>
  );
}
