import {Heart} from "lucide-react";
import Image from "next/image";
import React from "react";

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
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[15px]"
                    title={item.name}
                    loading="lazy"
                    quality={100}
                />
                <button
                    onClick={() => onRemove(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                </button>
            </div>

            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <img src={item.vendorLogo} alt={item.vendor} className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-gray-600">{item.vendor}</span>
                </div>

                <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(item.price)}
            </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                            item.stockStatus === 'IN STOCK'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                        }`}>
              {item.stockStatus}
            </span>
                    </div>
                    <h3 className="text-sm text-gray-700 line-clamp-2">
                        {item.name}
                    </h3>
                </div>
            </div>
        </div>
    );
};