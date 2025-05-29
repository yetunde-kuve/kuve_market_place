"use client";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import FilterResponsiveDrawer from "./filterModal.component";

export default function SearchSortProduct() {
  const [open, setOpen] = useState(false);
  const [openMobileFilter, setOpenMobileFilter] = useState(false);

  const handleClick = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const options = ["Most Popular", "Newest First", "Lowest Price", "Highest Price"];
  const [selected, setSelected] = useState("Most Popular");

  return (
    <div className="flex  lg:justify-end justify-between pb-[20px] items-center relative z-10 ">
      {openMobileFilter && (
        <FilterResponsiveDrawer
          open={openMobileFilter}
          onClose={() => setOpenMobileFilter(false)}
        />
      )}

      <button
        onClick={() => setOpenMobileFilter(true)}
        className="h-[32px] w-[32px] lg:hidden rounded-full bg-primary text-[13px] text-white flex justify-center items-center"
      >
        <i className="ri-filter-3-fill"></i>
      </button>
      <div className="flex items-center gap-[10px]">
        <button className="flex items-center gap-[10px]">
          <i className="ri-bookmark-fill text-[#D1D5DB]"></i>
          <p className="md:text-[16px] text-[10px] text-[#6B7280] font-[400]">Save this search</p>
        </button>

        <div className="flex items-center gap-[22px] relative">
          <p className="md:text-[14px] text-[10px] font-[400] text-[#191C1F]">Sort by:</p>

          <ClickAwayListener onClickAway={handleClose}>
            <div className="relative">
              <button
                onClick={handleClick}
                className="md:h-[44px]  h-[32px] border border-[#E4E7E9] md:px-[16px] px-[11px] flex justify-between items-center rounded-md bg-white min-w-[100px]"
              >
                <p className="md:text-[14px] text-[10px] font-[400] text-[#475156]">{selected}</p>
                <i className="ri-arrow-down-s-line text-[14px] text-[#ADB7BC]"></i>
              </button>

              {open && (
                <div className="absolute mt-2 w-full bg-white border border-[#E4E7E9] rounded-md shadow z-20">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 md:text-[14px] text-[10px] text-[#475156] hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  );
}
