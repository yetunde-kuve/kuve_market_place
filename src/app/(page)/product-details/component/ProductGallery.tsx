'use client'

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({images, productName,}) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full xl:w-[589px] lg:w-[444.7px] max-w-md lg:max-w-none lg:flex-1 order-1 lg:order-2">
                <Image
                    src={images[selectedImage]}
                    alt={productName}
                    fill
                    className="object-cover rounded-[20px]"
                    priority
                />
            </div>
            {/* Thumbnail List */}
            <div className="flex gap-2 order-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-[120.29px] h-[126.09px] xl:w-[187px] lg:w-[141.19px] xl:h-[167px] lg:h-[126.09px] rounded-[20px] overflow-hidden border-[0.76px] transition-colors ${
                            selectedImage === index
                                ? 'border-[#FF9D98]'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`${productName} ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};