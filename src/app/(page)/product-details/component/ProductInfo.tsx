'use client'

import React, {useState} from 'react';
import StoreLogo from "../../../../../public/svg/sStoreLogo.svg";
import SearchStoreFront from "@/app/(page)/search/component/storeFront.component";
import Image from "next/image";
import {formatDistanceToNow} from "date-fns";

interface ProductInfoProps {
    name: string;
    discountPrice: number;
    originalPrice?: number;
    rating?: number;
    reviewCount?: number;
    inStock: boolean;
    description: string
    isVerified: boolean;
    brandName: string;
    location: string;
    productCode: string;
    availableQuantity: number;
    timeOfListing: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({name, discountPrice, originalPrice, location, productCode, brandName, description, availableQuantity, isVerified, timeOfListing}) => {
    const discount:number = originalPrice ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;


    const formatTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <div className="space-y-2">
            <h1 className="text-2xl xl:text-[32px] text-[24.16px] font-normal text-[#000000]">{name}</h1>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {/*<span className="xl:text-[40.73px] text-[30.75px] font-bold text-[#000000]">₦{price}</span>*/}
                    {originalPrice && (
                        <>
                            <span className="xl:text-[40.73px] text-[30.75px] font-bold text-gray-300 line-through">₦{originalPrice}</span>
                            <span className="bg-red-100 text-[#FF3333] text-sm xl:text-[16px] text-[12.08px] font-medium px-3 py-1 rounded-full">
                -{discount}%
              </span>
                        </>
                    )}
                </div>
            </div>
            <div>
                <p className="xl:text-[16px] text-[12.08px] font-normal text-gray-500">{description}</p>
            </div>
            <div>
                <div className="w-[160.98px] rounded-[17.68px] flex items-center gap-[10px] bg-white border-[0.89px] border-[#D1D5DB]">
                    <div className="relative h-[56px] w-[56px] flex justify-center items-center">
                        {isVerified && (
                            <div className="h-[14.48px] top-[5px] right-[6px] absolute z-20 bg-white w-[14.68px] rounded-full border border-primary flex justify-center items-center text-primary text-[17px]">
                                <i className="ri-verified-badge-fill"></i>
                            </div>
                        )}
                        <div className="relative h-[40.97px] w-[40.97px] rounded-full overflow-hidden">
                            <Image src={StoreLogo} fill alt="storeFront" objectFit="cover" priority={true} />
                        </div>
                    </div>

                    <div>
                        <p className="text-[12.47px] font-[700] text-[#060619]">{brandName}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-[10.57px] md:text-[14px] font-normal text-gray-500 py-1">Sku: <span className='font-semibold text-[#000000]'>{productCode}</span></p>
                    <p className="text-[10.57px] md:text-[14px] font-normal text-gray-500 py-1">Brand: <span className='font-semibold text-[#000000]'>{brandName}</span></p>
                    <p className="text-[10.57px] md:text-[14px] font-normal text-gray-500 py-1">Location: <span className='font-semibold text-[#000000]'>{location}</span></p>
                </div>
                <div>
                    <p className="text-[10.57px] md:text-[14px] font-normal text-gray-500 py-1">Availability:  <span className='font-semibold text-green-500'>{availableQuantity} left</span></p>
                    <p className="text-[10.57px] md:text-[14px] font-normal text-gray-500 py-1">Category:  <span className='font-semibold text-[#000000]'>T-shirt</span></p>
                    <p className="text-[10.57px] md:text-[14px] font-normal text-gray-500 py-1">Time of listing:  <span className='font-semibold text-[#000000]'>{formatTimeAgo(timeOfListing)}</span></p>
                </div>
            </div>
        </div>
    );
};