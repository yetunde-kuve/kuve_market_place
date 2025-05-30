import React from "react";
import { Search } from "lucide-react"; // or use your own search icon

export default function ProductRequestBanner() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 px-6 py-4 bg-white shadow-sm rounded-xl md:rounded-full sm:flex-row sm:py-5 sm:gap-6">
      {/* Left section */}
      <div className="flex items-start flex-1 gap-3 sm:items-center sm:gap-4">
        <div className="flex-shrink-0 p-2 bg-white border border-gray-200 rounded-full">
          <Search className="text-[#191C1F] w-5 h-5" />
        </div>
        <div>
          <p className="text-sm sm:text-base text-[#191C1F] font-semibold">Request a product!</p>
          <p className="text-xs sm:text-sm text-[#5F6C72] font-normal">
            Let sellers know exactly what you’re searching for! Post a request, and sellers who have
            the product can reach out with offers.
          </p>
        </div>
      </div>

      {/* Right section */}
      <button className="text-[#B42318] border border-[#F04438] rounded-full px-4 py-2 text-sm font-semibold bg-[#ffecec] transition-colors duration-200">
        Post Request
      </button>
    </div>
  );
}
