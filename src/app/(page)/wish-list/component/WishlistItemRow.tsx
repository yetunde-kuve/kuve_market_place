'use client';

import React from 'react';
import {ShoppingCart, CircleX} from 'lucide-react';
import Image from 'next/image';

// Types
interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
    vendorLogo: string;
    stockStatus: 'IN STOCK' | 'OUT OF STOCK';
}

interface WishlistGroup {
    id: string;
    name: string;
    items: WishlistItem[];
}




// Components
export const WishlistItemRow: React.FC<{ item: WishlistItem; onRemove: (id: string) => void }> = ({ item, onRemove }) => {
    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString()}`;
    };

    return (
        <tr>
            <td className="py-4 px-4">
                <div className="flex items-center gap-3 w-[332px]">
                    <Image src={item.image} alt={item.name} width={75.79} height={75.79} className="rounded-[2.11px] object-cover" />
                    <span className="text-[14.74px] text-[#475156] font-normal">{item.name}</span>
                </div>
            </td>
            <td className="py-4 px-4 font-normal text-[14.74px] text-[#929FA5]">
                {formatPrice(item.price)}
            </td>
            <td className="py-4 px-4">
                <span className={`text-[14.74px] font-semibold px-2 py-1 rounded ${
                    item.stockStatus === 'IN STOCK'
                        ? ' text-[#2DB224]'
                        : ' text-[#C80003]'
                }`}>
                  {item.stockStatus}
                </span>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center p-1 gap-2 w-[170.61px] rounded-[20.39px] border border-[#D1D5DB]">
                    <div className="flex items-center justify-center">
                        <Image src={item.vendorLogo} alt={item.vendor} width={47.24} height={47.24} className="rounded-full" />
                    </div>
                    <span className="text-sm text-gray-600">{item.vendor}</span>
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center xl:gap-2 gap-4">
                    <div className="xl:block hidden">
                        <button
                            className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium ${
                                item.stockStatus === 'IN STOCK'
                                    ? 'border border-[#FF9D98] text-[#FF9D98] hover:bg-[#FF9D98]'
                                    : 'border border-[#D1D5DB] text-[#D1D5DB] cursor-not-allowed'
                            }`}
                            disabled={item.stockStatus === 'OUT OF STOCK'}
                        >
                            ADD TO CART <ShoppingCart className='w-[21.05px] h-[21.05px]' />
                        </button>
                    </div>
                    <div className="xl:hidden block">
                        <ShoppingCart className={`${
                            item.stockStatus === 'IN STOCK'
                                ? 'text-[#FF9D98] hover:bg-orange-600'
                                : 'text-[#D1D5DB] cursor-not-allowed'
                        }`} />
                    </div>

                    <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                    >
                        <CircleX />
                    </button>
                </div>
            </td>
        </tr>
    );
};