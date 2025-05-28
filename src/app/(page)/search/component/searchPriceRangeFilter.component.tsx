"use client";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ReactSlider from "react-slider";

const priceOptions = [
  "All Price",
  "Under ₦20,000",
  "₦25,000 to ₦100,000",
  "₦100,000 to ₦300,000",
  "₦300,000 to ₦500,000",
  "₦500,000 to ₦1,000,000",
  "Above ₦1,000,000",
];

export default function SearchPriceRangeAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const [range, setRange] = useState<[number, number]>([20000, 500000]);
  const [selected, setSelected] = useState("₦300,000 to ₦500,000");

  const formatPrice = (val: number) =>
    `₦${val.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

  return (
    <div className="w-full max-w-sm mx-auto bg-white ">
      {/* Accordion header */}
      <div
        className="flex items-center justify-between p-[10px] border border-gray-200 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-base font-[500] text-[#191C1F]">PRICE</h2>
        <BsChevronDown
          className={`transition-transform duration-300 text-[#475156] ${isOpen ? "rotate-180" : ""}`}
          size={14}
        />
      </div>

      {/* Accordion content */}
      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Range slider */}
          <ReactSlider
            className="relative w-full h-3"
            thumbClassName="h-4 w-4 bg-white border border-[#FF9D98] rounded-full cursor-pointer top-1/2 transform -translate-y-1/2 shadow-sm"
            min={0}
            max={2000000}
            step={10000}
            value={range}
            onChange={(val: number[]) => setRange([val[0], val[1]])}
            pearling
            minDistance={10000}
            withTracks={true}
            renderTrack={(props, state) => {
              const trackColor = state.index === 1 ? "bg-[#FF9D98] " : "bg-[#FFE5E5]";
              return (
                <div
                  {...props}
                  className={`h-1 top-1/2 transform -translate-y-1/2 absolute ${trackColor} rounded`}
                />
              );
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="h-4 w-4 absolute top-[-2px] bg-white border border-[#FF9D98] rounded-full cursor-pointer shadow-sm"
              />
            )}
          />

          {/* Min/Max price boxes */}
          <div className="flex gap-4">
            <div className="flex-1 px-3 py-2 text-sm text-center text-gray-600 border border-gray-300 rounded-md">
              {formatPrice(range[0])}
            </div>
            <div className="flex-1 px-3 py-2 text-sm text-center text-gray-600 border border-gray-300 rounded-md">
              {formatPrice(range[1])}
            </div>
          </div>

          {/* Radio buttons */}
          <div className="space-y-3">
            {priceOptions.map((label) => (
              <label
                key={label}
                className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
              >
                <span
                  className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
                    selected === label ? "border-primary bg-primary" : "border-[#CBD5E0]"
                  }`}
                >
                  {selected === label && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                </span>
                <input
                  type="radio"
                  name="category"
                  value={label}
                  checked={selected === label}
                  onChange={() => setSelected(label)}
                  className="hidden"
                />

                {/* <input
                  type="radio"
                  name="price"
                  checked={selected === label}
                  onChange={() => setSelected(label)}
                  className="form-radio text-[#FF6B6B] border-gray-300 focus:ring-[#FF6B6B]"
                /> */}
                <span className={`${selected === label ? "font-semibold text-black" : ""}`}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
