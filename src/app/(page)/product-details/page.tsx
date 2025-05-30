'use client'

import React from 'react';
import LandingPageWrapper from "@/layouts/landingPageWrapper/landingPageWrapper.wrapper";
import {Product, ProductDetailPage, Review} from "@/app/(page)/product-details/features/ProductDetailsPage";
import {RelatedProduct} from "@/app/(page)/product-details/component/RelatedProducts";

const Page = () => {
    const sampleProduct: Product = {
        id: '1',
        name: 'One Life Graphic T-shirt',
        price: 260,
        originalPrice: 300,
        isVerified: true,
        images: [
            '/img/t-shirt.png',
            '/img/t-shirt-back.png',
            '/img/t-shirt-front.png',
        ],
        colors: [
            { id: '1', name: 'Olive Green', value: '#6B7280' },
            { id: '2', name: 'Navy Blue', value: '#1F2937' },
            { id: '3', name: 'Black', value: '#000000' },
        ],
        sizes: [
            { id: 's', name: 'Small', available: true },
            { id: 'm', name: 'Medium', available: true },
            { id: 'l', name: 'Large', available: false },
            { id: 'xl', name: 'X-Large', available: true },
        ],
        description: 'This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
        productDescription: 'The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.',
        features: [
            'Premium cotton blend fabric',
            'Machine washable',
            'Comfortable fit',
            'Durable construction',
            'Fade-resistant print',
        ],
        shippingInfo: {
            courier: '2 - 4 days, free shipping',
            localShipping: 'up to one week, $19.00',
            upsGroundShipping: '4 - 6 days, $29.00',
            unishopGlobalExport: '3 - 4 days, $39.00'
        },
        vendor: {
            id: '1',
            name: 'Fashion Co.',
        },
        inStock: true,
        rating: 4.5,
        reviewCount: 128,
    };

    const sampleReviews: Review[] = [
        {
            id: '1',
            author: 'Sarah M.',
            rating: 5,
            comment: 'Great quality t-shirt! The fabric is soft and the fit is perfect.',
            date: 'August 14, 2023',
            verified: true,
        },
        {
            id: '2',
            author: 'Mike D.',
            rating: 4,
            comment: 'Good value for money. The color is exactly as shown in the picture.',
            date: 'August 10, 2023',
            verified: true,
        },
    ];

    const sampleRelatedProducts: RelatedProduct[] = [
        {
            id: '1',
            name: 'Classic Cotton Tee',
            price: 180,
            image: '/img/shoe.png',
            vendor: 'Fashion Co.',
        },
        {
            id: '2',
            name: 'Vintage Logo Shirt',
            price: 220,
            image: '/img/shoe.png',
            vendor: 'Fashion Co.',
        },
        {
            id: '3',
            name: 'Premium Polo',
            price: 350,
            image: '/img/shoe.png',
            vendor: 'Fashion Co.',
        },
        {
            id: '4',
            name: 'Premium Polo',
            price: 350,
            image: '/img/shoe.png',
            vendor: 'Fashion Co.',
        },
    ];

    const handleAddToCart = async (productId: string, options: any) => {
        console.log('Adding to cart:', productId, options);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Product added to cart!');
    };

    const handleProductClick = (productId: string) => {
        console.log('Navigate to:', productId);
        // Handle navigation
    };
    return (
        <LandingPageWrapper>
            <ProductDetailPage
                product={sampleProduct}
                reviews={sampleReviews}
                relatedProducts={sampleRelatedProducts}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
            />
        </LandingPageWrapper>
    );
};

export default Page;