import React from 'react';

export interface ColorOption {
    id: string;
    name: string;
    value: string; // hex color
    image?: string;
}

interface ColorSelectorProps {
    colors: ColorOption[];
    selectedColor: string;
    onColorChange: (colorId: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({colors, selectedColor, onColorChange,}) => {
    return (
        <div className="space-y-3">
            <h3 className="text-[12.08px] font-normal text-gray-700">Select Colors</h3>
            <div className="flex gap-2">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => onColorChange(color.id)}
                        className={`w-[27.94px] h-[27.94px] xl:w-[37px] xl:h-[37px] rounded-full border-2 transition-all ${
                            selectedColor === color.id
                                ? 'border-gray-900 ring-2 ring-gray-200'
                                : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                    />
                ))}
            </div>
        </div>
    );
};