import React from 'react';
import Image from 'next/image';

export interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
}

interface RelatedProductsProps {
    products: RelatedProduct[];
    onProductClick: (productId: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({products, onProductClick,}) => {
    return (
        <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">More Products From Vendor</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <button
                        key={product.id}
                        onClick={() => onProductClick(product.id)}
                        className="group text-left"
                    >
                        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                            {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-1">{product.vendor}</p>
                        <p className="font-semibold text-gray-900">${product.price}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};