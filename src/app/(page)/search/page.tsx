"use client";
import LandingPageWrapper from "@/layouts/landingPageWrapper/landingPageWrapper.wrapper";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchStoreFront from "./component/storeFront.component";
import SearchStoreFontFeature from "./feature/storeFrontFeature.component";
import ProductSearcView from "./feature/SerachProductView.component";

function SearchResult() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  return (
    <LandingPageWrapper>
      <div className="flex flex-col gap-[42px] md:gap-[20px]">
        <p className="text-[20px] text-[#828294] font-[400]">
          Results from{" "}
          <span className="text-[20px] text-[#060619] font-[700]">{`"${query}"`}</span>{" "}
        </p>
        <div className="flex flex-col gap-[32px] md:gap-[20px]">
          <div className="flex items-center justify-between ">
            <p className="text-[16px]  font-[700] text-[#060619]">Related Stores</p>
            <button className="text-[#212844] text-[14px] font-[600] flex items-center gap-[8px] ">
              View All Stores <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
          <SearchStoreFontFeature />
        </div>
        <div className="mt-[42px] md:mt-[61px]">
          <ProductSearcView />
        </div>
      </div>
    </LandingPageWrapper>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <SearchResult />
    </Suspense>
  );
}
