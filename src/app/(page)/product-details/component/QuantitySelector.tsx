import React from 'react';
import {MinusIcon, Plus} from "lucide-react";

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    maxQuantity?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({quantity, onQuantityChange, maxQuantity = 10,}) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center py-3 px-3 bg-[#F0F0F0] rounded-full w-fit">
                <button
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    className="px-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                >
                    <MinusIcon />
                </button>
                <span className="px-4 min-w-[3rem] text-center">{quantity}</span>
                <button
                    onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
                    className="px-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= maxQuantity}
                >
                    <Plus />
                </button>
            </div>
        </div>
    );
};