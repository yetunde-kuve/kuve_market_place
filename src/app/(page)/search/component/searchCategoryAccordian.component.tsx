"use client";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

const categories = [
  "Electronics Devices",
  "Computer & Laptop",
  "Computer Accessories",
  "SmartPhone",
  "Headphone",
  "Mobile Accessories",
  "Gaming Console",
  "Camera & Photo",
  "TV & Homes Appliances",
  "Watches & Accessories",
];

export default function SearchCategoryAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState("Electronics Devices");

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex border border-[#f0f0f0] justify-between items-center w-full p-[10px] text-base font-[500] text-[#191C1F] rounded-lg"
      >
        CATEGORY
        <BsChevronDown
          className={`transition-transform duration-300 text-[#475156] ${isOpen ? "rotate-180" : ""}`}
          size={14}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-4 pt-2 pb-4 space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer">
              <span
                className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
                  selected === category ? "border-[#FF6B6B] bg-[#FF6B6B]" : "border-[#CBD5E0]"
                }`}
              >
                {selected === category && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </span>
              <span
                className={`text-sm ${
                  selected === category ? "font-semibold text-[#191C1F]" : "text-[#475156]"
                }`}
              >
                {category}
              </span>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selected === category}
                onChange={() => setSelected(category)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
