'use client'

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {ArrowLeft, ArrowRight, Eye, X} from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({images, productName,}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    const scrollThumbnails = (direction: 'left' | 'right') => {
        if (thumbnailContainerRef.current) {
            const scrollAmount = 200; // Adjust scroll distance as needed
            const currentScroll = thumbnailContainerRef.current.scrollLeft;
            const newScroll = direction === 'left'
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount;

            thumbnailContainerRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        }
    };

    const openModal = (index: number = selectedImage) => {
        setModalImageIndex(index);
        setShowModal(true);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'unset';
    };

    const navigateModal = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setModalImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
        } else {
            setModalImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
        }
    };

    // Close modal on escape key
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft' && showModal) {
                navigateModal('prev');
            } else if (event.key === 'ArrowRight' && showModal) {
                navigateModal('next');
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showModal]);

    return (
        <>
            <div className="flex flex-col gap-4">
                {/* Main Image */}
                <div className="relative aspect-square w-full h-[400.16px] xl:w-[589px] xl:h-[631px] lg:h-[496.38px] lg:w-[444.7px]">
                    <Image
                        src={images[selectedImage]}
                        alt={productName}
                        fill
                        className="object-cover rounded-[20px]"
                        priority
                    />
                    {/* Eye Icon for Modal */}
                    <button
                        onClick={() => openModal()}
                        className="absolute top-4 right-4 p-2 transition-all duration-200"
                        aria-label="View all images"
                    >
                        <Eye className="w-5 h-5 text-black-light" />
                    </button>
                </div>

                {/* Thumbnail List with Scroll */}
                <div className="relative">
                    {/* Left Arrow */}
                    {images.length > 3 && (
                        <button
                            onClick={() => scrollThumbnails('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 border border-white bg-[#FF9D98] hover:bg-[#FF8A84] p-2 rounded-full shadow-md transition-all duration-200"
                            aria-label="Scroll thumbnails left"
                        >
                            <ArrowLeft className="w-[18.12px] h-[18.12px] text-white" />
                        </button>
                    )}

                    {/* Thumbnail Container */}
                    <div
                        ref={thumbnailContainerRef}
                        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth w-full xl:w-[589px] lg:w-[444.7px]"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            // WebkitScrollbar: { display: 'none' }
                        }}
                    >
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative flex-shrink-0 w-[120.29px] h-[126.09px] xl:w-[187px] lg:w-[141.19px] xl:h-[167px] lg:h-[126.09px] rounded-[20px] overflow-hidden border-[0.76px] transition-colors ${
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

                    {/* Right Arrow */}
                    {images.length > 3 && (
                        <button
                            onClick={() => scrollThumbnails('right')}
                            className="absolute xl:right-20 right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 border border-white bg-[#FF9D98] hover:bg-[#FF8A84] p-2 rounded-full shadow-md transition-all duration-200"
                            aria-label="Scroll thumbnails right"
                        >
                            <ArrowRight className="w-[18.12px] h-[18.12px] text-white" />
                        </button>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div>
                    <div
                        className="fixed inset-0 bg-black-light backdrop-blur-sm z-[9998]"
                        onClick={closeModal}
                    />
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-6 p-2 rounded-full transition-colors z-10"
                            aria-label="Close modal"
                        >
                            <X className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] text-white" />
                        </button>

                        {/* Previous Button */}
                        {images.length > 1 && (
                            <button
                                onClick={() => navigateModal('prev')}
                                className="absolute left-2 xl:left-44 md:left-16 top-1/2 -translate-y-1/2 border border-white bg-[#FF9D98] hover:bg-[#FF8A84] md:p-3 p-1 rounded-full transition-colors z-10 shadow-lg"
                                aria-label="Previous image"
                            >
                                <ArrowLeft className="w-[18.12px] h-[18.12px] md:w-[25.49px] md:h-[25.49px]  text-white" />
                            </button>
                        )}

                        {/* Modal Image Container */}
                        <div className="flex items-center justify-center mt-20 mb-20 w-full p-16">
                            <div className="relative w-[300px] h-[332px] md:w-[737px] md:h-[700px] aspect-square">
                                <Image
                                    src={images[modalImageIndex]}
                                    alt={`${productName} ${modalImageIndex + 1}`}
                                    fill
                                    className="rounded-[20px]"
                                />
                            </div>
                        </div>

                        {/* Next Button */}
                        {images.length > 1 && (
                            <button
                                onClick={() => navigateModal('next')}
                                className="absolute right-2 xl:right-44 md:right-16 top-1/2 -translate-y-1/2 border border-white bg-[#FF9D98] hover:bg-[#FF8A84] md:p-3 p-1 rounded-full transition-colors z-10 shadow-lg"
                                aria-label="Next image"
                            >
                                <ArrowRight className="w-[18.12px] h-[18.12px] md:w-[25.49px] md:h-[25.49px] text-white" />
                            </button>
                        )}
                    </div>
                </div>

            )}
        </>
    );
};