import React, {useRef} from 'react';
import TrendingProductCard
    from "@/features/product/trendingProduct/trendingProductCard/trendingProductCard.productCard";
import ViewAll from "@/components/widgets/ViewAll.widget";

const TrendingProduct = () => {
    const products = [
        { id: 1, image: "/img/productDefaultimg.png", productName: "Breed Dry Dog Food" },
        { id: 2, image: "/img/productDefaultimg.png", productName: "Breed Dry Dog Food" },
        { id: 3, image: "/img/productDefaultimg.png", productName: "Breed Dry Dog Food" },
        { id: 4, image: "/img/productDefaultimg.png", productName: "Breed Dry Dog Food" },
        // { id: 5, image: "img/productDefaultimg.png", productName: "Breed Dry Dog Food" },
        // { id: 6, image: "img/productDefaultimg.png", productName: "Breed Dry Dog Food" },
        // { id: 7, image: "img/productDefaultimg.png", productName: "Breed Dry Dog Food" },
    ];
    return (
        <section className="flex flex-col w-full md:gap-[30px] gap-[18px]">
            <div className="flex items-center justify-between">
                <p className="text-text md:text-[20px] font-[600] text-[12.5px]">
                    Trending Products
                </p>
                <ViewAll />
            </div>
            <div className="w-full overflow-x-auto scrollbar-none">
                <div className="flex gap-[9.8px] md:gap-[10px] lg:gap-[22px] w-max">
                    {products.map((product) => (
                        <TrendingProductCard
                            key={product.id}
                            image={product.image}
                            productName={product.productName}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProduct;