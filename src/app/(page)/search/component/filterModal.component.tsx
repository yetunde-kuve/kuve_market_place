import React from "react";
import { Drawer, IconButton, Button, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import SearchCategoryAccordion from "./searchCategoryAccordian.component";
import SearchBrandFilterAccordion from "./searchBrandFilter.component";
import SaerchTagFilterAccordion from "./searchTagFilter.component";
import SearchProductBanner from "./fsearchFilterBanner.component";
import SearchPriceRangeAccordion from "./searchPriceRangeFilter.component";

interface FilterResponsiveDrawerprop {
  open: boolean;
  onClose: () => void;
}
export default function FilterResponsiveDrawer({ open, onClose }: FilterResponsiveDrawerprop) {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:599px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:1024px)");

  if (!isMobile && !isTablet) return null; // Hide on desktop

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : "70%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
        <span className="text-lg font-semibold">Filter</span>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <div
        className="space-y-8"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 24px",

          marginBottom: "80px", // Leave space for fixed button
        }}
      >
        <SearchCategoryAccordion />
        <SearchPriceRangeAccordion />
        <SearchBrandFilterAccordion />

        <SaerchTagFilterAccordion />

        <SearchProductBanner />
        <button
          className="w-full mt-6 py-2 rounded-lg bg-[#FF8F8F] text-[#000222] font-[500] hover:opacity-90 transition-all"
          // onClick={() => alert(`Applied tags: ${selectedTags.join(", ")}`)}
        >
          Apply Filter
        </button>
      </div>

      {/* <div
        className="fixed bottom-0 left-0 z-10 p-4 bg-white border-t"
        style={{
          width: isMobile ? "100%" : "70%",
        }}
      >
        
      </div> */}
    </Drawer>
  );
}
