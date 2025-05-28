import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

const brands = [
  "Apple",
  "Microsoft",
  "Dell",
  "Symphony",
  "Sony",
  "LG",
  "One Plus",
  "Google",
  "Samsung",
  "HP",
  "Xiaomi",
  "Panasonic",
  "Intel",
];

const checkedBrands = ["Apple", "Microsoft", "Google", "HP", "Panasonic", "LG"];

export default function SearchBrandFilterAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState(checkedBrands);

  const toggleBrand = (brand: any) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex border border-[#f0f0f0] justify-between items-center w-full p-[10px] text-base font-[500] text-[#191C1F] rounded-lg"
      >
        <h2>POPULAR BRANDS</h2>
        <BsChevronDown
          className={`transition-transform duration-300 text-[#475156] ${isOpen ? "rotate-180" : ""}`}
          size={14}
        />
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {brands.map((brand) => {
            const isChecked = selectedBrands.includes(brand);

            return (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer select-none">
                <div
                  onClick={() => toggleBrand(brand)}
                  className={`w-5 h-5 flex items-center justify-center rounded border transition-colors duration-150 ${
                    isChecked ? "bg-[#FF8F8F] border-[#FF8F8F]" : "bg-white border-[#C9CFD2]"
                  }`}
                >
                  {isChecked && <FaCheck className="text-xs text-white" />}
                </div>
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
