import {Heart} from "lucide-react";
import Image from "next/image";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import React, {useState} from "react";
import {useWishlistStore} from "@/features/wishList/store/wishlistStore";
import Sneakers from "../../../../../public/svg/sneaker.svg";

export interface CuratedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    condition: 'Brand New' | 'Used';
    isVerified: boolean;
}

export const CuratedProducts: React.FC<{ products: CuratedProduct[] }> = ({ products }) => {
    const addToWishlist = useWishlistStore((state) => state.addToWishlist);
    const [loved, setLoved] = useState<Boolean>(false);

    const handleAddToWishlist = () => {
        setLoved(!loved);
        const item = {
            id: "1234",
            name: "Sneakers",
            image: Sneakers,
            price: 1500,
        };
        addToWishlist(item);
    };
    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString()}`;
    };

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] font-semibold text-center md:text-left text-[#060619]">
                    Curated products, just for you!
                </h3>
                <button className="hidden md:block text-sm text-orange-500 hover:text-orange-600 font-medium">
                    View All
                </button>
            </div>

            <div className="
                grid grid-cols-2 gap-4
                md:flex md:gap-4 md:overflow-x-auto md:scrollbar-none md:whitespace-nowrap md:pb-4
                lg:grid lg:grid-cols-4 lg:pb-0 scrollbar-hide
            ">
                {products.map((product) => (
                    <div key={product.id} className="
                        w-full bg-white rounded-[30px] p-2
                        md:flex-shrink-0 md:w-64 md:p-4
                        lg:w-full lg:p-4
                    ">
                        <div className="
                            relative w-full rounded-[15px]
                            h-40 md:h-48 lg:h-52
                        ">
                            <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-[15px]"
                                title={product.name}
                                loading="lazy"
                                quality={100}
                            />

                            {/* Verified Badge */}
                            {product.isVerified && <div className="
                                absolute top-2 left-2 bg-white flex items-center gap-1 px-2 py-1 rounded-full font-medium text-[#F85E9F] shadow
                                text-[8px] md:text-[12px] lg:text-[14px]
                            ">
                                <i className="ri-verified-badge-fill text-primary"></i>
                                <p className="text-[#111928] font-[500]">Verified</p>
                            </div>}

                            {/* Like Icon */}
                            <button
                                onClick={handleAddToWishlist}
                                className="
                                    absolute top-2 right-2 bg-white rounded-full shadow flex justify-center items-center p-1
                                    h-[21px] w-[21px] text-[8px]
                                    md:h-[30px] md:w-[30px] md:text-[14px]
                                    lg:h-[34px] lg:w-[34px] lg:text-[16px]
                                "
                            >
                                {loved ? (
                                    <FaHeart className="text-[#FF9D98]" />
                                ) : (
                                    <FaRegHeart className="w-3 h-3 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px]" />
                                )}
                            </button>
                        </div>

                        {/* Details Section */}
                        <div className="mt-3 md:mt-4 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="
                                    font-bold text-black
                                    text-[10px] md:text-[14px] lg:text-[16px]
                                ">{formatPrice(product.price)}</p>
                                <span className="
                                    inline-block bg-[#E6F6FB] text-[#212844] font-[300] rounded-full
                                    text-[8px] px-[6px] py-[4px]
                                    md:text-[12px] md:px-[8px] md:py-[5px]
                                    lg:text-[13px] lg:px-[10px] lg:py-[6px]
                                ">{product.condition}</span>
                            </div>
                            <p className="
                                text-gray-600
                                text-[10px] md:text-[12px] lg:text-[14px]
                            ">{product.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="block md:hidden text-black font-medium px-8"
                >
                    View All
                </button>
            </div>
        </div>
    );
};