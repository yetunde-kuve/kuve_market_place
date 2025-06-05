'use client'

import React, { useState, useEffect } from 'react';
import LandingPageWrapper from "@/layouts/landingPageWrapper/landingPageWrapper.wrapper";
import {Product, Review} from "@/app/(page)/product-details/features/productDetailsClient.client";
import {RelatedProduct} from "@/app/(page)/product-details/component/RelatedProducts";
import dynamic from "next/dynamic";
import {MPHttpUtilNoSecure} from "@/utils/MPHttpNosecure.utils";

// Dynamically import the client component with no SSR
const ProductDetailsClient = dynamic(() => import("./features/productDetailsClient.client"), {
    ssr: false,
});

// Define the API response type
interface ApiResponse {
    status: boolean;
    message: string;
    statusCode: string;
    data: {
        id: string;
        isAvailable: boolean;
        productCategoryId: string;
        productConditionId: string;
        minimumPrice: number;
        maximumPrice: number;
        actualPrice: number;
        productName: string;
        productCode: string;
        productDescription: string;
        brandName: string;
        productLocation: string | null;
        sellerId: string;
        productCurrencyId: string;
        defaultImageUrl: string;
        productBrandId: string;
        popularTagId: string;
        oldPrice: number;
        discount: number;
        availableColours: Array<{
            id: string;
            name: string;
            value: string;
        }>;
        availableSizes: Array<{
            id: string;
            name: string;
            available: boolean;
        }>;
        paymentOption: Array<{
            optionName: string;
            optionId: string;
        }>;
    };
}

interface RelatedProductsApiResponse {
    status: boolean;
    message: string;
    statusCode: string;
    data: {
        items: Array<{
            id: string;
            isAvailable: boolean;
            productCategoryId: string;
            productConditionId: string;
            minimumPrice: number;
            maximumPrice: number;
            actualPrice: number;
            productName: string;
            productCode: string;
            productDescription: string;
            brandName: string;
            productLocation: string | null;
            sellerId: string;
            productCurrencyId: string;
            defaultImageUrl: string;
            productBrandId: string;
            popularTagId: string;
            oldPrice: number;
            discount: number;
            availableColours: Array<any>;
            availableSizes: Array<any>;
            paymentOption: Array<{
                optionName: string;
                optionId: string;
            }>;
        }>;
        totalCount: number;
        pageNumber: number;
        pageSize: number;
    };
}

interface FetchProductResult {
    product: Product | null;
    error: string | null;
}

const fetchProduct = (productId: string): Promise<FetchProductResult> => {
    const mpHttp = new MPHttpUtilNoSecure();
    return new Promise<FetchProductResult>((resolve) => {
        mpHttp.get(
            `v1/Product/GetProductById/${productId}`,
            {},
            {},
            (result: any, err: any) => {
                if (err) {
                    console.error("Error fetching product:", err);
                    resolve({ product: null, error: "Failed to load product" });
                    return;
                }
                if (!result) {
                    console.error("No result returned from API");
                    resolve({ product: null, error: "No response from server" });
                    return;
                }
                // Check if the result is the direct product data (has id field)
                if (!result.id && !result.data) {
                    console.error("Invalid API response structure");
                    resolve({ product: null, error: "Invalid response format" });
                    return;
                }

                try {
                    // Handle both wrapped and direct response formats
                    const productData = result.data || result; // Use result.data if it exists, otherwise use result directly

                    console.log('Using product data:', productData);

                    // Transform API data to Product interface
                    console.log('Transforming product data...');
                    const transformedProduct: Product = {
                        id: productData.id,
                        name: productData.productName || 'Unknown Product',
                        discountPrice: productData.discount || 0,
                        originalPrice: productData.actualPrice,
                        isVerified: productData.isVerified,
                        brandName: productData.brandName,
                        location: productData.location,
                        productCode: productData.productCode,
                        availableQuantity: productData.avilableQuantity,
                        timeOfListing: productData.timeOfListing,
                        images: productData.defaultImageUrl ? [productData.defaultImageUrl] : ['/img/placeholder.png'],
                        colors: productData.availableColours && productData.availableColours.length > 0
                            ? productData.availableColours
                            : [
                                { id: '1', colorName: 'Default', coloCode: '#6B7280' }
                            ],
                        sizes: productData.availableSizes && productData.availableSizes.length > 0
                            ? productData.availableSizes
                            : [
                                { id: 's', size: 'Small', available: true },
                                { id: 'm', size: 'Medium', available: true },
                                { id: 'l', size: 'Large', available: true },
                                { id: 'xl', size: 'X-Large', available: true },
                            ],
                        description: productData.productDescription || 'No description available',
                        productDescription: productData.productDescription || 'No description available',
                        features: [
                            'Premium quality',
                            productData.brandName ? `Brand: ${productData.brandName}` : 'Brand: Unknown',
                            productData.productCode ? `Product Code: ${productData.productCode}` : 'Product Code: N/A',
                        ],
                        shippingInfo: {
                            courier: '2 - 4 days, free shipping',
                            localShipping: 'up to one week, ₦19.00',
                            upsGroundShipping: '4 - 6 days, ₦29.00',
                            unishopGlobalExport: '3 - 4 days, ₦39.00'
                        },
                        vendor: {
                            id: productData.sellerId || 'unknown',
                            name: productData.brandName || 'Unknown Vendor',
                        },
                        inStock: productData.isAvailable,
                        rating: 4.5,
                        reviewCount: 0,
                    };

                    console.log('Product transformed successfully:', transformedProduct);
                    resolve({ product: transformedProduct, error: null });
                } catch (transformError) {
                    console.error('Error transforming product data:', transformError);
                    resolve({ product: null, error: "Error processing product data" });
                }
            });
    });
};

    const fetchReviews = (): Promise<Review[]> => {
        return Promise.resolve([
            {
                id: '1',
                author: 'Sarah M.',
                rating: 5,
                comment: 'Great quality product! Exactly as described.',
                date: 'August 14, 2023',
                verified: true,
            },
            {
                id: '2',
                author: 'Mike D.',
                rating: 4,
                comment: 'Good value for money. Fast delivery.',
                date: 'August 10, 2023',
                verified: true,
            },
        ]);
    };


const fetchRelatedProducts = (sellerId: string, currentProductId?: string): Promise<RelatedProduct[]> => {
    if (!sellerId) {
        // Return empty array if no sellerId is provided
        console.log('No sellerId provided for related products');
        return Promise.resolve([]);
    }

    const mpHttp = new MPHttpUtilNoSecure();

    console.log('Fetching related products for sellerId:', sellerId);

    return new Promise<RelatedProduct[]>((resolve) => {
        mpHttp.get(
            `v1/Product/GetProductBySellerId/${sellerId}`,
            {},
            {},
            (result: any, err: any) => {
                console.log('=== RELATED PRODUCTS API DEBUG ===');
                console.log('Error parameter:', err);
                console.log('Result parameter:', result);
                console.log('Result type:', typeof result);
                console.log('Result status:', result?.status);
                console.log('Result data exists:', !!result?.data);
                console.log('Items count:', result?.data?.items?.length);
                console.log('=== END DEBUG ===');

                if (err) {
                    console.error("Error fetching related products:", err);
                    resolve([]);
                    return;
                }

                if (!result) {
                    console.error("No result returned from related products API");
                    resolve([]);
                    return;
                }

                // Handle both wrapped and direct response formats
                const responseData = result.data || result; // Use result.data if it exists, otherwise use result directly

                if (!responseData || !responseData.items) {
                    console.error("No items in related products API response");
                    resolve([]);
                    return;
                }

                try {
                    // Transform API data to RelatedProduct interface and filter out current product
                    const relatedProducts: RelatedProduct[] = responseData.items
                        .filter((item: any) => item.id !== currentProductId) // Filter out current product
                        .map((item: any) => ({
                            id: item.id,
                            name: item.productName || 'Unknown Product',
                            price: item.actualPrice || 0,
                            image: item.defaultImageUrl || '/img/placeholder.png',
                            vendor: item.brandName || 'Unknown Vendor',
                        }));

                    console.log('Related products transformed successfully:', relatedProducts);
                    console.log(`Filtered out current product ID: ${currentProductId}`);
                    resolve(relatedProducts);
                } catch (transformError) {
                    console.error('Error transforming related products data:', transformError);
                    resolve([]);
                }
            }
        );
    });
};

    interface PageProps {
        params?: {
            productId?: string;
        };
    }

    const Page: React.FC<PageProps> = ({ params }) => {
        const [product, setProduct] = useState<Product | null>(null);
        const [reviews, setReviews] = useState<Review[]>([]);
        const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        const productId = params?.productId || "d22d5f9d-8002-44bf-9f65-a81ff667012c";

        console.log('Page component - productId:', productId);

        useEffect(() => {
            const loadData = async () => {
                try {
                    setLoading(true);
                    setError(null);

                    // First fetch the product data
                    const productResult = await fetchProduct(productId);

                    if (productResult.error) {
                        setError(productResult.error);
                        setLoading(false);
                        return;
                    }

                    // Set the product data
                    setProduct(productResult.product);

                    // Now fetch reviews and related products using the sellerId from the product
                    const sellerId = productResult.product?.vendor?.id || '';

                    const [reviewsResult, relatedProductsResult] = await Promise.all([
                        fetchReviews(),
                        fetchRelatedProducts(sellerId, productId) // Pass current productId to filter it out
                    ]);

                    setReviews(reviewsResult);
                    setRelatedProducts(relatedProductsResult);

                } catch (err) {
                    console.error('Error loading data:', err);
                    setError('An unexpected error occurred while loading the product.');
                } finally {
                    setLoading(false);
                }
            };

            loadData();
        }, [productId]);

        const handleAddToCart = async (productId: string, options: any) => {
            console.log('Adding to cart:', productId, options);
            try {
                // Implement actual add to cart API call here
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Product added to cart!');
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Failed to add product to cart. Please try again.');
            }
        };

        const handleProductClick = (productId: string) => {
            console.log('Navigate to:', productId);
            // Implement navigation to product page
        };

        if (loading) {
            return (
                <LandingPageWrapper>
                    <div className="mx-auto px-4 py-8">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading product...</p>
                        </div>
                    </div>
                </LandingPageWrapper>
            );
        }

        if (error || !product) {
            return (
                <LandingPageWrapper>
                    <div className="mx-auto px-4 py-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">
                                Product Not Found
                            </h1>
                            <p className="text-gray-600">
                                {error || "The requested product could not be loaded."}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </LandingPageWrapper>
            );
        }

        return (
            <LandingPageWrapper>
                <ProductDetailsClient
                    product={product}
                    reviews={reviews}
                    relatedProducts={relatedProducts}
                    onAddToCart={handleAddToCart}
                    onProductClick={handleProductClick}
                />
            </LandingPageWrapper>
        );
    };

    export default Page;