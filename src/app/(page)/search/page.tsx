"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return <div>Search results for: {query}</div>;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <SearchResult />
    </Suspense>
  );
}
