"use client";

import React, { useState } from "react";
import { Slider } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";

type PriceAccordionProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

const PriceFilterAccordion: React.FC<PriceAccordionProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange([newValue[0], newValue[1]]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border rounded-lg">
      {/* Accordion Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-semibold">Price</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-6 py-4">
          <Slider
            value={value}
            onChange={handleSliderChange}
            min={min}
            max={max}
            valueLabelDisplay="off"
            sx={{
              color: "#FF8F8F",
              height: 6,
              "& .MuiSlider-thumb": {
                width: 22,
                height: 22,
                backgroundColor: "#FF8F8F",
                border: "2px solid white",
                boxShadow: 1,
              },
              "& .MuiSlider-track": {
                border: "none",
                backgroundColor: "#FF8F8F",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#eee",
              },
            }}
          />

          <div className="flex justify-between mt-2 text-sm">
            <span>${value[0]}</span>
            <span>${value[1]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilterAccordion;
