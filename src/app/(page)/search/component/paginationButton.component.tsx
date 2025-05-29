import React from "react";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronDown } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
  itemsPerPageOptions?: number[];
  maxVisiblePages?: number;
}

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): (number | string)[] => {
  const pages: (number | string)[] = [];

  const alwaysVisible = [1, totalPages];
  const range = Math.floor(maxVisiblePages / 2);

  let start = Math.max(2, currentPage - range);
  let end = Math.min(totalPages - 1, currentPage + range);

  if (start > 2) pages.push(1, "...");
  else start = 2;

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push("...", totalPages);
  else if (!pages.includes(totalPages)) pages.push(totalPages);

  return Array.from(new Set(pages));
};

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  ariaLabel?: string;
  title?: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  onClick,
  isActive,
  isDisabled,
  className = "",
  ariaLabel,
  title,
}) => {
  const baseStyle =
    "flex items-center justify-center h-10 min-w-[2.5rem] px-3 mx-0.5 border rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-300";
  const activeStyle = "bg-red-400 text-white border-red-400";
  const inactiveStyle = "bg-white text-slate-700 hover:bg-slate-100 border-slate-300";
  const disabledStyle = "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200";

  let currentStyle = inactiveStyle;
  if (isActive) currentStyle = activeStyle;
  if (isDisabled) currentStyle = disabledStyle;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      title={title}
      className={`${baseStyle} ${currentStyle} ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </button>
  );
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [12, 24, 36, 48],
  maxVisiblePages = 7,
}) => {
  if (totalPages <= 0) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(e.target.value));
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisiblePages);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-6 p-4 mx-auto my-4 font-sans ">
      <div className="flex items-center mb-4 sm:mb-0">
        <PaginationButton
          onClick={() => handlePageChange(1)}
          isDisabled={currentPage === 1}
          ariaLabel="Go to first page"
          title="First Page"
        >
          <ChevronsLeft size={18} />
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          ariaLabel="Go to previous page"
          title="Previous Page"
        >
          <ChevronLeft size={18} />
        </PaginationButton>

        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <PaginationButton
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              isActive={page === currentPage}
              title={`Page ${page}`}
            >
              {page}
            </PaginationButton>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center h-10 w-10 px-3 mx-0.5 text-slate-500"
            >
              ...
            </span>
          )
        )}

        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          ariaLabel="Go to next page"
          title="Next Page"
        >
          <ChevronRight size={18} />
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          isDisabled={currentPage === totalPages}
          ariaLabel="Go to last page"
          title="Last Page"
        >
          <ChevronsRight size={18} />
        </PaginationButton>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="h-10 pl-3 pr-8 text-sm bg-white border rounded-md appearance-none cursor-pointer border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
            aria-label="Select number of items per page"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} Items per page
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-700">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
