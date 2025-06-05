import React from 'react';

export interface SizeOption {
    id: string;
    size: string;
    available: boolean;
}

interface SizeSelectorProps {
    sizes: SizeOption[];
    selectedSize: string;
    onSizeChange: (sizeId: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({sizes, selectedSize, onSizeChange,}) => {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-[12.08px] font-normal text-gray-700">Choose Size</h3>
            </div>
            <div className="flex gap-2">
                {sizes.map((size) => (
                    <button
                        key={size.id}
                        onClick={() => size.available && onSizeChange(size.id)}
                        disabled={!size.available}
                        className={`py-2 px-2 md:px-6 md:text-sm text-[12.08px] font-medium rounded-full border transition-colors ${
                            selectedSize === size.id
                                ? 'bg-[#FF9D98] text-black'
                                : 'bg-[#F0F0F0] hover:border-gray-400 text-gray-500'
                                
                        }`}
                    >
                        {size.size}
                    </button>
                ))}
            </div>
        </div>
    );
};