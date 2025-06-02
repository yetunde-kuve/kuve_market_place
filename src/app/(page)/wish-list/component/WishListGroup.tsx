import { WishlistItemRow } from "./WishlistItemRow";
import {Pencil, Share2} from "lucide-react";
import {WishlistCard} from "@/app/(page)/wish-list/component/WishListCard";


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

export const WishlistGroup: React.FC<{
    group: WishlistGroup;
    onRemoveItem: (itemId: string) => void;
    onShareList: (groupId: string) => void;
}> = ({ group, onRemoveItem, onShareList }) => {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[24px] font-medium text-[#000000]">
                    {group.name}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onShareList(group.id)}
                        className="flex items-center gap-2 text-sm text-[#000222] hover:text-gray-800"
                    >
                        <Pencil className="w-[24px] h-[24px]" />
                    </button>
                    <button
                        onClick={() => onShareList(group.id)}
                        className="flex items-center gap-2 text-sm text-[#000222] hover:text-gray-800"
                    >
                        <Share2 className="w-[18px] h-[20px]" />
                        <span className="text-[20px] text-[#828294] font-medium">Share list</span>
                    </button>
                </div>

            </div>

            <div className="hidden md:block bg-white overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#000222]">
                    <tr>
                        <th className="text-left py-3 px-4 w-[332px] text-[12.63px] font-medium text-white uppercase tracking-wider">
                            Products
                        </th>
                        <th className="text-left py-3 px-4 text-[12.63px] font-medium text-white uppercase tracking-wider">
                            Price
                        </th>
                        <th className="text-left py-3 px-4 text-[12.63px] font-medium text-white uppercase tracking-wider">
                            Stock Status
                        </th>
                        <th className="text-left py-3 px-4 text-[12.63px] font-medium text-white uppercase tracking-wider">
                            Vendor
                        </th>
                        <th className="text-left py-3 px-4 text-[12.63px] font-medium text-white uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {group.items.map((item: any) => (
                        <WishlistItemRow
                            key={item.id}
                            item={item}
                            onRemove={onRemoveItem}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden block grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.items.map((item) => (
                    <WishlistCard
                        key={item.id}
                        item={item}
                        onRemove={onRemoveItem}
                    />
                ))}
            </div>
        </div>
    );
};