"use client";

import { useState, useRef, useEffect } from "react";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";

import Camera from "../../../../public/svg/camerW.svg"; // Replace with your actual image path

import EmptyCartWidget from "@/features/cart/component/emptyCart.component";
import ApplyFilterButton from "./applyflterButton.component";
import LocationFilterAccordion from "./locationFilter.component";
import CategoryFilterAccordion from "./categoryFilter.component";
import PriceFilterAccordion from "./priceFilter.component";

export default function SerachFilterDropdown() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [selectedLocations, setSelectedLocation] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);
  const categories = [
    "Electronics",
    "Groceries",
    "Fashion",
    "Building",
    "Electronics",
    "Electronics",
    "Fashion",
    "Fashion",
    "Fashion",
    "Fashion",
  ];
  const availableLocations = [
    "Lagos",
    "Abuja",
    "Ogun",
    "Anambra",
    "Ekiti",
    "Borno",
    "Ibadan",
    "Port Harcourt",
  ];
  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        ref={anchorRef}
        // onMouseOver={() => setOpen(true)}
        // onMouseLeave={() => setOpen(false)}
        onClick={handleToggle}
        className="relative p-2 text-xl h-[40px] w-[40px]"
      >
        <i className="ri-list-unordered text-primary text-[18px] absolute right-[12px] top-1/2 -translate-y-1/2"></i>
      </button>

      {/* Popper Dropdown */}
      <Popper
        open={open}
        // onMouseEnter={() => setOpen(true)}
        // onMouseLeave={() => setOpen(false)}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        className="z-[9999] "
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className=" md:mx-0 m-auto w-screen sm:w-[320px] md:w-[376px] lg:w-[464px] max-h-[90vh] rounded-xl shadow-lg overflow-hidden">
              <ClickAwayListener onClickAway={handleClose}>
                <div className="flex flex-col h-[80vh] sm:h-[464px] md:h-[464px] ">
                  {/* Sticky Header */}

                  <div className="sticky top-0 z-10 px-[24px] py-3 bg-white border-b text-center">
                    <p className="text-[16px] font-[500] text-[#191C1F]">
                      Filter Search
                      {/* <span className="text-[#5F6C72]">{`(${items.length})`}</span> */}
                    </p>
                  </div>

                  {/* Scrollable Content */}

                  <div className="flex-1 px-[24px] py-[20px] space-y-3 overflow-y-auto">
                    <LocationFilterAccordion
                      locations={availableLocations}
                      selectedLocations={selectedLocations}
                      onChange={setSelectedLocation}
                    />
                    <PriceFilterAccordion
                      min={0}
                      max={500}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                    <CategoryFilterAccordion
                      categories={categories}
                      selectedCategories={selectedCategory}
                      onChange={setSelectedCategory}
                    />
                  </div>

                  {/* Footer */}

                  <div className="px-[24px] py-[20px] border-t">
                    <ApplyFilterButton />
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
