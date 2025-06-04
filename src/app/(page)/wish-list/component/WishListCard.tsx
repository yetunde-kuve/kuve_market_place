import {Heart, ShoppingCart, Trash2} from "lucide-react";
import Image from "next/image";
import React from "react";
import {FaHeart, FaRegHeart} from "react-icons/fa";

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
    vendorLogo: string;
    stockStatus: 'IN STOCK' | 'OUT OF STOCK';
}

export const WishlistCard: React.FC<{ item: WishlistItem; onRemove: (id: string) => void }> = ({ item, onRemove }) => {
    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString()}`;
    };

    return (
        <div className="bg-white rounded-[20.4px] overflow-hidden p-2">
            <div className="relative rounded-[15px] h-[122.41px] md:h-[180px]">
                <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[15px]"
                    title={item.name}
                    loading="lazy"
                />

                <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                >
                    <ShoppingCart className="w-4 h-4 text-[#000000]" />
                </button>
            </div>

            <div>
                <div className="flex justify-between items-center my-2">
                    <div className="flex items-center gap-2">
                        <img src={item.vendorLogo} alt={item.vendor} className="w-6 h-6 rounded-full" />
                        <span className="text-[8.09px] font-bold text-[#060619]">{item.vendor}</span>
                    </div>
                    <Trash2 className="w-[8.43px] h-[9.48px] text-[#FF0000] cursor-pointer"
                            onClick={() => onRemove(item.id)}
                    />
                </div>

                <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10.88px] font-bold text-[#000000]">
                          {formatPrice(item.price)}
                        </span>
                        <span className={`text-[8.84px] p-1 rounded-full capitalize ${
                            item.stockStatus === 'IN STOCK'
                                ? 'bg-[#B4FFB4] text-[#212844]'
                                : 'bg-[#FBE6E6] text-[#212844]'
                        }`}>
                          {item.stockStatus}
                        </span>
                    </div>
                    <h3 className="text-[10.88px] font-normal text-[#3D3D3D] line-clamp-2">
                        {item.name}
                    </h3>
                </div>
            </div>
        </div>
    );
};