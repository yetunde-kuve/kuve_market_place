import { Divider } from "@mui/material";
import SearchActiveFilter from "../component/activeFilter.component";
import SearchProductCard from "../component/productSearchComponent.component";
import SearchCategoryAccordion from "../component/searchCategoryAccordian.component";
import SearchPriceRangeFilter from "../component/searchPriceRangeFilter.component";
import SearchSortProduct from "../component/sortProduct.component";
import SearchBrandFilterAccordion from "../component/searchBrandFilter.component";
import SaerchTagFilterAccordion from "../component/searchTagFilter.component";
import SearchProductBanner from "../component/fsearchFilterBanner.component";
import ResponsiveDrawer from "../component/filterModal.component";
import SearchPriceRangeAccordion from "../component/searchPriceRangeFilter.component";
import { useState } from "react";
import PaginationComponent from "../component/paginationButton.component";
import RelatedProduct from "../component/relatedProduct.component";
import RecentlyViewdProduct from "../component/recentlyViewed.component";

export default function ProductSearcView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="lg:flex lg:gap-6">
      {/* Filter Sidebar: hidden on tablets and smaller */}
      <aside className="hidden lg:block lg:w-1/4">
        <div className="p-4 space-y-4 bg-white ">
          <SearchCategoryAccordion />

          <SearchPriceRangeAccordion />

          <SearchBrandFilterAccordion />

          <SaerchTagFilterAccordion />
          <button
            className="w-full mt-6 py-2 rounded-lg bg-[#FF8F8F] text-[#000222] font-[500] hover:opacity-90 transition-all"
            // onClick={() => alert(`Applied tags: ${selectedTags.join(", ")}`)}
          >
            Apply Filter
          </button>

          <SearchProductBanner />
        </div>
      </aside>

      {/* Product Grid Section */}
      <main className="w-full mt-6 lg:w-3/4 lg:mt-0">
        <SearchSortProduct />
        <SearchActiveFilter />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <SearchProductCard key={index} />
          ))}
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
        <div className="space-y-10">
          <RelatedProduct />
          <RecentlyViewdProduct />
        </div>
      </main>
    </div>
  );
}
