'use client'

import {EmptyWishlist} from "@/app/(page)/wish-list/component/EmptyWishlist";
import {CuratedProduct, CuratedProducts} from "@/app/(page)/wish-list/component/CuratedProducts";
import { WishlistGroup } from "../component/WishListGroup";
import {useState} from "react";

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
// Sample data
const sampleWishlistGroups: WishlistGroup[] = [
    {
        id: '1',
        name: 'My Wishlist',
        items: [
            {
                id: '1',
                name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth in Ear',
                price: 19999,
                image: '/img/shoe.png',
                vendor: 'Ikeja',
                vendorLogo: '/img/vendor.png',
                stockStatus: 'IN STOCK'
            },
            {
                id: '2',
                name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth in Ear',
                price: 19999,
                image: '/img/wishlistImg.png',
                vendor: 'Lamborghini',
                vendorLogo: '/img/vendor.png',
                stockStatus: 'OUT OF STOCK'
            }
        ]
    },
    {
        id: '2',
        name: 'Christmas Wish',
        items: [
            {
                id: '3',
                name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth in Ear',
                price: 19999,
                image: '/img/wishlistImg.png',
                vendor: 'Ikeja',
                vendorLogo: '/img/vendor.png',
                stockStatus: 'IN STOCK'
            },
            {
                id: '4',
                name: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth in Ear',
                price: 19999,
                image: '/img/wishlistImg.png',
                vendor: 'Lamborghiniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
                vendorLogo: '/img/vendor.png',
                stockStatus: 'OUT OF STOCK'
            }
        ]
    }
];

const curatedProducts: CuratedProduct[] = [
    {
        id: '1',
        name: 'Multi-color Sneakers',
        price: 150000.00,
        image: '/img/shoe.png',
        condition: 'Brand New',
        isVerified: true
    },
    {
        id: '2',
        name: 'Red & White Sneakers',
        price: 150000.00,
        image: '/img/shoe.png',
        condition: 'Used',
        isVerified: true
    },
    {
        id: '3',
        name: 'Orange and White Sneakers',
        price: 150000.00,
        image: '/img/shoe.png',
        condition: 'Brand New',
        isVerified: true
    },
    {
        id: '4',
        name: 'Orange and White Sneakers',
        price: 150000.00,
        image: '/img/shoe.png',
        condition: 'Brand New',
        isVerified: true
    }
];


const WishlistPage: React.FC = () => {
    const [wishlistGroups, setWishlistGroups] = useState<WishlistGroup[]>(sampleWishlistGroups);

    // Toggle between empty and populated state for demo
    const [showEmpty, setShowEmpty] = useState(false);

    const handleRemoveItem = (itemId: string) => {
        setWishlistGroups(groups =>
            groups.map(group => ({
                ...group,
                items: group.items.filter(item => item.id !== itemId)
            })).filter(group => group.items.length > 0)
        );
    };

    const handleShareList = (groupId: string) => {
        console.log('Sharing list:', groupId);
        // Implement share functionality
    };

    const handleGoBack = () => {
        console.log('Going back');
    };

    const handleGoHome = () => {
        console.log('Going home');
    };

    const totalItems = wishlistGroups.reduce((total: any, group: { items: string | any[]; }) => total + group.items.length, 0);
    const isEmpty = totalItems === 0 || showEmpty;

    return (
        <div className="min-h-screen">
            <div className="w-full md:max-w-8xl md:mx-auto">
                {isEmpty ? (
                    <>
                        <EmptyWishlist onGoBack={handleGoBack} onGoHome={handleGoHome} />
                        {/* Only show curated products when wishlist is empty */}
                        <CuratedProducts products={curatedProducts} />
                    </>
                ) : (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-[24px] md:text-[32px] font-medium text-[#000000]">
                                Wishlist
                            </h1>
                            {!isEmpty && (
                                <span className="text-[16px] md:text-[20px] font-medium text-[#505050]">
                             {totalItems} items
                        </span>
                            )}
                        </div>

                        {wishlistGroups.map((group) => (
                            <WishlistGroup
                                key={group.id}
                                group={group}
                                onRemoveItem={handleRemoveItem}
                                onShareList={handleShareList}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;