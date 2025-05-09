"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <i className="ri-search-line text-primary text-[18px] absolute left-[12px] md:top-2 top-3"></i>
      <i className="ri-list-unordered text-primary text-[18px] absolute right-[12px] lg:right-[12px] md:top-2 top-3 "></i>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search essentials, groceries and more..."
        className="focus:outline-none bg-background-Secondary text-[14px] text-text px-[34px] w-full lg:h-[42px] md:h-[42px] md:w-[396.29px] md:rounded-full lg:w-[479.14px] lg:rounded-full bg-background-Secondry h-[48px] rounded-md  focus:border focus:border-primary"
      />
    </form>
  );
}
