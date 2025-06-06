import {ColorOption} from "@/app/(page)/product-details/component/ColorSelector";
import {SizeOption} from "@/app/(page)/product-details/component/SizeSelector";
import {ShippingInfo} from "@/app/(page)/product-details/component/ProductDetails";
import {Vendor} from "@/app/(page)/product-details/features/productDetailsClient.client";

export interface Product {
    id: string;
    name: string;
    discountPrice: number;
    originalPrice?: number;
    availableQuantity: number;
    timeOfListing: string;
    images: string[];
    colors: ColorOption[];
    sizes: SizeOption[];
    description: string;
    productDescription: string;
    features: string[];
    brandName: string;
    shippingInfo: ShippingInfo;
    vendor: Vendor;
    inStock: boolean;
    location: string;
    productCode: string;
    rating?: number;
    reviewCount?: number;
    isVerified: boolean;
}