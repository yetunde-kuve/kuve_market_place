import React, { useState } from "react";
import { ColorOption, ColorSelector } from "../component/ColorSelector";
import { SizeOption, SizeSelector } from "../component/SizeSelector";
import { RelatedProduct, RelatedProducts } from "../component/RelatedProducts";
import { ProductGallery } from "@/app/(page)/product-details/component/ProductGallery";
import { ProductInfo } from "../component/ProductInfo";
import { AddToCartButton } from "@/app/(page)/product-details/component/AddToCartButton";
import { ProductDetails, ShippingInfo } from "../component/ProductDetails";
import { ReviewsList } from "@/app/(page)/product-details/component/ReviewList";
import { QuantitySelector } from "@/app/(page)/product-details/component/QuantitySelector";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Copy } from "lucide-react";
import { MessageIcon } from "@/app/(page)/product-details/component/MessageIcon";
import ReportProductModal from "@/app/(page)/product-details/component/ReportProductModal";

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  rating?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: ColorOption[];
  sizes: SizeOption[];
  description: string;
  productDescription: string;
  features: string[];
  shippingInfo: ShippingInfo;
  vendor: Vendor;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
}

interface ProductDetailPageProps {
  product: Product;
  reviews: Review[];
  relatedProducts: RelatedProduct[];
  onAddToCart: (
    productId: string,
    options: {
      colorId: string;
      sizeId: string;
      quantity: number;
    }
  ) => Promise<void>;
  onProductClick: (productId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  reviews,
  relatedProducts,
  onAddToCart,
  onProductClick,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    try {
      setIsAddingToCart(true);
      await onAddToCart(product.id, {
        colorId: selectedColor,
        sizeId: selectedSize,
        quantity,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const canAddToCart = product.inStock && selectedSize && selectedColor;

  return (
    <div className="px-2 pb-8 sm:px-3 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-gray-500">
        <button onClick={() => onProductClick("home")} className="hover:text-gray-700">
          Home
        </button>
        <span className="mx-2">›</span>
        <button onClick={() => onProductClick("shop")} className="hover:text-gray-700">
          Shop
        </button>
        <span className="mx-2">›</span>
        <button onClick={() => onProductClick("mens")} className="hover:text-gray-700">
          {" Men's"}
        </button>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 md:grid-cols-2 md:gap-12 lg:gap-12 xl:gap-12">
        {/* Product Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Information */}
        <div className="space-y-4 xl:space-y-6 md:space-y-2">
          <ProductInfo
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
            reviewCount={product.reviewCount}
            inStock={product.inStock}
            description={product.description}
            isVerified={product.isVerified}
          />

          <div className="w-full h-[1px] bg-gray-300"></div>

          {/* Product Options */}
          <div className="space-y-3 xl:space-y-6 md:space-y-2">
            {product.colors.length > 0 && (
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            )}

            <div className="w-full h-[1px] bg-gray-300"></div>

            {product.sizes.length > 0 && (
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            )}

            <div className="w-full h-[1px] bg-gray-300"></div>

            <div className="flex gap-3">
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
              <AddToCartButton
                onAddToCart={handleAddToCart}
                isLoading={isAddingToCart}
                disabled={!canAddToCart}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 xl:space-y-3 md:space-y-2">
            <div className="flex gap-3">
              <button className="flex-1 border-[0.76px] border-[#000222] hover:border-gray-400 text-[#000222] md:text-[12.19px] text-[12px] font-medium py-3 px-3 rounded-full transition-colors">
                Make an offer
              </button>
              <button className="flex-1 bg-[#FF9D98] hover:bg-[#FF9D98] text-black md:text-[12.19px] text-[12px] py-3 px-6 rounded-full font-medium transition-colors">
                Buy Item
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaRegHeart />
              <p className="md:text-[14px] text-[11.69px] text-[#475156] font-normal">
                Add to Wishlist
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <p className="md:text-[14px] text-[11.69px] text-[#475156] font-normal">
                Share product:
              </p>
              <div className="flex items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 15.75H20.25V3.75H8.25V8.25"
                    stroke="#5F6C72"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.75 8.25H3.75V20.25H15.75V8.25Z"
                    stroke="#5F6C72"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_38538_21639)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 0C12.4183 0 16 3.58173 16 8C16 12.4183 12.4183 16 8 16C3.58173 16 0 12.4183 0 8C0 3.58173 3.58173 0 8 0Z"
                      fill="#FF9D98"
                    />
                    <path
                      d="M9.04217 15.933V9.75237H10.7856L11.0167 7.5771H9.04217L9.0451 6.48827C9.0451 5.92091 9.09903 5.61705 9.91445 5.61705H11.0045V3.44141H9.26065C7.16597 3.44141 6.42881 4.4966 6.42881 6.27136V7.57726H5.12305V9.75274H6.42881V15.8453C6.9375 15.9466 7.4634 16.0001 8.00187 16.0001C8.34972 16.0001 8.69721 15.9777 9.04217 15.933Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_38538_21639">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.03184 14.5024C11.0699 14.5024 14.3718 9.49713 14.3718 5.15673C14.3718 5.01458 14.3689 4.87308 14.3625 4.73217C15.005 4.26699 15.5595 3.69103 16 3.03128C15.4118 3.29294 14.7789 3.46904 14.1149 3.54844C14.7926 3.14181 15.3129 2.49851 15.5584 1.73169C14.914 2.11419 14.2091 2.38382 13.4739 2.52898C12.8749 1.89052 12.0221 1.49121 11.0778 1.49121C9.26494 1.49121 7.79489 2.96219 7.79489 4.7754C7.79489 5.03319 7.82374 5.28385 7.88006 5.52436C5.15177 5.38699 2.73252 4.07995 1.11343 2.09252C0.821818 2.59379 0.668434 3.16349 0.668943 3.74345C0.668943 4.88304 1.24846 5.88903 2.12976 6.47759C1.60846 6.46166 1.0986 6.32077 0.643057 6.06676C0.642569 6.08055 0.642569 6.09399 0.642569 6.10872C0.642569 7.69944 1.77408 9.02759 3.27613 9.32854C2.99402 9.40542 2.70292 9.44428 2.41054 9.44411C2.19938 9.44411 1.99359 9.42333 1.79359 9.38491C2.21151 10.69 3.42335 11.6397 4.86013 11.6663C3.73659 12.5474 2.32127 13.0723 0.783024 13.0723C0.521349 13.0725 0.259888 13.0573 0 13.0267C1.45281 13.9585 3.17789 14.5022 5.032 14.5022"
                    fill="#5F6C72"
                  />
                </svg>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_38538_21644)">
                    <path
                      d="M7.02503 0.0530204C4.36618 0.349837 1.71669 2.50098 1.60734 5.57382C1.5386 7.45001 2.07131 8.85755 3.8569 9.25278C4.63175 7.88586 3.60695 7.58436 3.44761 6.59549C2.79304 2.54316 8.1217 -0.220364 10.9102 2.60877C12.8395 4.56776 11.5695 10.5947 8.45757 9.96827C5.4769 9.36995 9.91666 4.57245 7.53743 3.63045C5.60344 2.86497 4.57551 5.97218 5.49252 7.51563C4.95512 10.1698 3.79754 12.6709 4.2662 15.9999C5.78621 14.897 6.29861 12.7849 6.71884 10.5822C7.48276 11.0462 7.89049 11.5289 8.8653 11.6039C12.4599 11.882 14.4673 8.01553 13.9768 4.44904C13.541 1.28715 10.3853 -0.321906 7.02503 0.0530204Z"
                      fill="#5F6C72"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_38538_21644">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 cursor-pointer" onClick={openModal}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 21V4H14L14.4 6H20V16H13L12.6 14H7V21H5Z" fill="#FF0000" />
            </svg>
            <p className="md:text-[14px] text-[11.69px] text-[#475156] font-normal">
              Report product
            </p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <ProductDetails
          description={product.productDescription}
          features={product.features}
          shippingInfo={product.shippingInfo}
        />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProducts products={relatedProducts} onProductClick={onProductClick} />
      </div>

      <div>
        <MessageIcon />
      </div>

      <ReportProductModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
