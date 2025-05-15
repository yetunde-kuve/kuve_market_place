"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";

const mockSuggestions = [
  "Bread",
  "Milk",
  "Sugar",
  "Rice",
  "Toothpaste",
  "Vegetable oil",
  "Eggs",
  "Butter",
  "Tomatoes",
  "Coffee",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    router.push(`/search?query=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const filteredSuggestions = mockSuggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const noMatch = query.trim() !== "" && filteredSuggestions.length === 0;

  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      <form onSubmit={handleSubmit}>
        <i className="ri-search-line text-primary text-[18px] absolute left-[12px] top-1/2 -translate-y-1/2"></i>
        {/* Error Icon (if no match) */}
        {noMatch ? (
          <i className="ri-error-warning-line text-red-500 text-[18px] absolute right-[12px] top-1/2 -translate-y-1/2" />
        ) : (
          <i className="ri-list-unordered text-primary text-[18px] absolute right-[12px] top-1/2 -translate-y-1/2"></i>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          placeholder="Search essentials, groceries and more..."
          className={`focus:outline-none bg-background-Secondary md:w-[396.29px] md:rounded-full lg:w-[479.14px] text-[14px] text-text px-[34px] w-full h-[48px] rounded-full border ${
            noMatch ? "border-red-500" : "border-gray-300"
          } focus:border focus:border-primary`}
        />
      </form>

      {/* Suggestions List */}
      {showSuggestions && (
        <div className="absolute top-[calc(100%+10px)] w-full rounded-lg shadow-lg bg-white dark:bg-background-Tertiary-dark border border-gray-200 dark:border-gray-700 z-50">
          {filteredSuggestions.length > 0 ? (
            <>
              <div className="flex flex-col gap-[15px] mt-[15px] px-4">
                <p className="font-[700] text-[#000222]">Search Suggestions</p>
                <Divider />
              </div>
              {filteredSuggestions.map((suggestion, index) => {
                const matchIndex = suggestion
                  .toLowerCase()
                  .indexOf(query.toLowerCase());
                const beforeMatch = suggestion.slice(0, matchIndex);
                const matchText = suggestion.slice(
                  matchIndex,
                  matchIndex + query.length
                );
                const afterMatch = suggestion.slice(matchIndex + query.length);

                return (
                  <div
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="px-4 py-2 text-sm text-[16px] font-[400] cursor-pointer hover:bg-gray-100 dark:hover:bg-background-Secondary-dark text-text dark:text-text-dark"
                  >
                    {matchIndex !== -1 ? (
                      <>
                        {beforeMatch}
                        <span className="font-medium text-[#FF9D98]">
                          {matchText}
                        </span>
                        {afterMatch}
                      </>
                    ) : (
                      suggestion
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex justify-center items-center flex-col p-[30px] gap-6">
              <svg
                width="88"
                height="88"
                viewBox="0 0 88 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M45.9998 78.0834C50.2131 78.0834 54.3851 77.2536 58.2776 75.6412C62.1701 74.0289 65.707 71.6656 68.6862 68.6864C71.6654 65.7072 74.0286 62.1704 75.641 58.2778C77.2533 54.3853 78.0832 50.2133 78.0832 46.0001C78.0832 41.7868 77.2533 37.6148 75.641 33.7223C74.0286 29.8298 71.6654 26.293 68.6862 23.3137C65.707 20.3345 62.1701 17.9713 58.2776 16.3589C54.3851 14.7466 50.2131 13.9167 45.9998 13.9167C37.4908 13.9167 29.3303 17.2969 23.3135 23.3137C17.2967 29.3305 13.9165 37.4911 13.9165 46.0001C13.9165 54.5091 17.2967 62.6696 23.3135 68.6864C29.3303 74.7032 37.4908 78.0834 45.9998 78.0834ZM37.2319 24.8251C40.0119 23.6746 42.9912 23.0828 45.9998 23.0834C46.6076 23.0834 47.1905 22.842 47.6203 22.4122C48.0501 21.9824 48.2915 21.3995 48.2915 20.7917C48.2915 20.184 48.0501 19.6011 47.6203 19.1713C47.1905 18.7415 46.6076 18.5001 45.9998 18.5001C38.7064 18.5001 31.7117 21.3974 26.5544 26.5546C21.3972 31.7119 18.4998 38.7066 18.4998 46.0001C18.4998 46.6079 18.7413 47.1908 19.1711 47.6205C19.6008 48.0503 20.1837 48.2917 20.7915 48.2917C21.3993 48.2917 21.9822 48.0503 22.412 47.6205C22.8417 47.1908 23.0832 46.6079 23.0832 46.0001C23.0828 41.4669 24.4268 37.0354 26.9454 33.2663C29.4639 29.4971 33.0437 26.5595 37.2319 24.8251Z"
                  fill="black"
                  fill-opacity="0.25"
                />
                <path
                  d="M84.9582 84.9584L68.9165 68.9167"
                  stroke="#EAE2E2"
                  stroke-width="4.58333"
                  stroke-linecap="round"
                />
                <path
                  d="M41.4166 80.375C62.9327 80.375 80.3749 62.9328 80.3749 41.4167C80.3749 19.9006 62.9327 2.45837 41.4166 2.45837C19.9005 2.45837 2.45825 19.9006 2.45825 41.4167C2.45825 62.9328 19.9005 80.375 41.4166 80.375Z"
                  stroke="#EAE2E2"
                  stroke-width="4.58333"
                />
              </svg>
              <p className="md-[20px] md:w-[60%] w-full text-[14px] font-[400] text-center text-black-light">
                {`We couldn't find anything matching 
your search. Try again with 
a different term.`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
