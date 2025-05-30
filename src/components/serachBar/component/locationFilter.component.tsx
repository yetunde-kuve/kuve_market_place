import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type LocationFilterAccordionProps = {
  locations: string[];
  selectedLocations?: string[];
  onChange: (selected: string[]) => void;
};

const LocationFilterAccordion: React.FC<LocationFilterAccordionProps> = ({
  locations,
  selectedLocations = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleLocation = (location: string) => {
    let updated;
    if (selectedLocations.includes(location)) {
      updated = selectedLocations.filter((item) => item !== location);
    } else {
      updated = [...selectedLocations, location];
    }
    onChange(updated);
  };

  return (
    <div className="w-full overflow-hidden border rounded-md">
      <div
        className="flex items-center justify-between px-4 py-3 border-b cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-semibold">Location</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 px-4 py-4">
          {locations.map((location) => {
            const isSelected = selectedLocations.includes(location);
            return (
              <label
                key={location}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <span
                  className={`h-5 w-5 rounded-sm flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#FF8F8F] border border-[#FF8F8F]"
                      : "border border-[#C9CFD2] bg-[#EDEDED]"
                  }`}
                  onClick={() => toggleLocation(location)}
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
                <span className="text-sm text-black">{location}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationFilterAccordion;
