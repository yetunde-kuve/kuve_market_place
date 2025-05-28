import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const tags = [
  "Game",
  "iPhone",
  "TV",
  "Macbook",
  "SSD",
  "Graphics Card",
  "Power Bank",
  "Smart TV",
  "Speaker",
  "Tablet",
  "Microwave",
  "Samsung",
];

export default function SaerchTagFilterAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTags, setSelectedTags] = useState(["Graphics Card"]);

  const toggleTag = (tag: any) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto rounded-lg">
      <button
        className="flex border border-[#f0f0f0] justify-between items-center w-full p-[10px] text-base font-[500] text-[#191C1F] rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2>POPULAR TAG</h2>
        <BsChevronDown
          className={`transition-transform duration-300 text-[#475156] ${isOpen ? "rotate-180" : ""}`}
          size={14}
        />
      </button>

      {isOpen && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm border rounded-md transition-all duration-200 
                ${
                  selectedTags.includes(tag)
                    ? "bg-[#FFF3EB] text-[#FF8F8F] border-[#FF8F8F]"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
