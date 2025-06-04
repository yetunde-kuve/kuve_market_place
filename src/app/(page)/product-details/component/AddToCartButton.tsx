import React from 'react';

interface AddToCartButtonProps {
    onAddToCart: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({onAddToCart, isLoading = false, disabled = false, className = '',}) => {
    return (
        <button
            onClick={onAddToCart}
            disabled={disabled || isLoading}
            className={`w-full border-[0.76px] border-[#000222] hover:bg-[#FF9D98]  text-[#000222] md:text-[12.19px] text-[12px] font-medium py-3 px-3 rounded-full transition-colors ${className}`}
        >
            {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
    );
};