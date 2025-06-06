import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {Product} from "@/app/(page)/product-details/types/product";

interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
}

interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
}

interface CachedProductData {
    product: Product;
    reviews: Review[];
    relatedProducts: RelatedProduct[];
    timestamp: number;
}

interface ProductDetailState {
    cachedProducts: Record<string, CachedProductData>;
    loadingProducts: Set<string>; // Track which products are currently loading

    // Actions
    setProductDetails: (productId: string, data: Omit<CachedProductData, 'timestamp'>) => void;
    getProductDetails: (productId: string) => CachedProductData | null;
    clearCache: () => void;
    clearProductCache: (productId: string) => void;
    isCacheValid: (productId: string, maxAgeMs?: number) => boolean;
    setProductLoading: (productId: string, loading: boolean) => void;
    isProductLoading: (productId: string) => boolean;
}

export const useProductDetailStore = create<ProductDetailState>()(
    persist(
        (set, get) => ({
            cachedProducts: {},
            loadingProducts: new Set(),

            setProductDetails: (productId, data) => {
                const state = get();
                const newLoadingProducts = new Set(state.loadingProducts);
                newLoadingProducts.delete(productId); // Remove from loading set

                set({
                    cachedProducts: {
                        ...state.cachedProducts,
                        [productId]: {
                            ...data,
                            timestamp: Date.now(),
                        },
                    },
                    loadingProducts: newLoadingProducts,
                });
            },

            getProductDetails: (productId) => {
                const state = get();
                return state.cachedProducts[productId] || null;
            },

            isCacheValid: (productId, maxAgeMs = 30 * 60 * 1000) => {
                const cached = get().getProductDetails(productId);
                if (!cached) return false;
                return Date.now() - cached.timestamp < maxAgeMs;
            },

            setProductLoading: (productId, loading) => {
                const state = get();
                const newLoadingProducts = new Set(state.loadingProducts);

                if (loading) {
                    newLoadingProducts.add(productId);
                } else {
                    newLoadingProducts.delete(productId);
                }

                set({ loadingProducts: newLoadingProducts });
            },

            isProductLoading: (productId) => {
                return get().loadingProducts.has(productId);
            },

            clearCache: () => {
                set({ cachedProducts: {}, loadingProducts: new Set() });
            },

            clearProductCache: (productId) => {
                const state = get();
                const newCache = { ...state.cachedProducts };
                const newLoadingProducts = new Set(state.loadingProducts);

                delete newCache[productId];
                newLoadingProducts.delete(productId);

                set({
                    cachedProducts: newCache,
                    loadingProducts: newLoadingProducts
                });
            },
        }),
        {
            name: 'product-details-storage',
            partialize: (state) => ({
                cachedProducts: state.cachedProducts,
                // Don't persist loading state
            }),
        }
    )
);