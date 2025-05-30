import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type CategoryAccordionProps = {
  categories: string[];
  selectedCategories?: string[];
  onChange: (selected: string[]) => void;
};

const CategoryFilterAccordion: React.FC<CategoryAccordionProps> = ({
  categories,
  selectedCategories = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    onChange(updated);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border rounded-lg">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-semibold">Category</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="flex flex-col gap-4 px-4 py-4">
          {categories.map((category, index) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <label
                key={`${category}-${index}`}
                className="flex items-center gap-3"
              >
                <span
                  className={`w-5 h-5 rounded-sm flex items-center justify-center cursor-pointer transition-all
                    ${isSelected ? "bg-[#FF8F8F] border border-[#FF8F8F]" : "bg-[#EDEDED] border border-[#C9CFD2]"}`}
                  onClick={() => toggleCategory(category)}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-black">{category}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryFilterAccordion;
