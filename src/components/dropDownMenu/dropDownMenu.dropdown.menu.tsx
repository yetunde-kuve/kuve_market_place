"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn.utils";

type DropdownListProps = {
  label: string;
  icon?: ReactNode;
  items: any;
  mobileRedirectPath: string;
};

const DropdownList: React.FC<DropdownListProps> = ({
  label,
  icon = null,
  items = [],
  mobileRedirectPath,
}) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
    // if(isMobile){}
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !popperRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block w-full"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={cn(
          "flex text-text w-full h-[36px] focus:shadow-none justify-between px-[12px] py-[9px] gap-[9px] items-center rounded-full ",
          "bg-background-Secondary dark:bg-background-Tertiary-dark",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
          "active:bg-primary active:text-white",
          "hover:bg-primary hover:text-white",
          open && "bg-primary text-white"
        )}
      >
        <span className="flex items-center gap-1 text-[14px] dark:text-text-dark font-[500]">
          {icon} {label}
        </span>
        {open ? (
          <i className="ri-arrow-up-s-line"></i>
        ) : (
          <i className="ri-arrow-down-s-line"></i>
        )}
      </button>

      {open && (
        <Popper
          disablePortal={false}
          open={open}
          anchorEl={buttonRef.current}
          placement="bottom-start"
          modifiers={[
            {
              name: "preventOverflow",
              options: {
                altAxis: false,
              },
            },
          ]}
          sx={{
            zIndex: 2000,
            width: "100vw",
            left: 0,
            ...(isMobile || isTablet
              ? {}
              : {
                  paddingTop: 2,
                  paddingX: "88px",
                }),
          }}
        >
          <div ref={popperRef}>
            <Paper
              className="w-full overflow-hidden bg-white rounded-lg shadow-xl"
              elevation={3}
              onTouchStart={(e) => e.stopPropagation()} // prevent click-away on scroll
              onMouseDown={(e) => e.stopPropagation()} // prevent click-away on desktop drag
            >
              <div
                className={cn(
                  "overflow-hidden",
                  isMobile
                    ? "h-[620px] px-[20px] py-[30px]"
                    : isTablet
                      ? "h-[543px] px-[50px] py-[60px] mx-[50px]"
                      : "px-[100px] py-[63px] mx-10"
                )}
              >
                {/* Inner scrollable content */}
                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div
                    className={cn(
                      "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[40.7px] min-w-max"
                    )}
                  >
                    {items.map((group: any, index: number) => (
                      <div
                        key={group.title}
                        className={cn(
                          "pr-4",
                          isTablet &&
                            index !== 2 &&
                            "border-r border-r-slate-200",
                          isMobile && "border-none"
                        )}
                      >
                        <h4 className="mb-2 text-sm font-semibold">
                          {group.title}
                        </h4>
                        <ul className="space-y-1">
                          {group.categories.map((cat: any) => (
                            <li
                              key={cat.id}
                              className="text-sm text-gray-700 cursor-pointer hover:text-primary"
                            >
                              {cat.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </Popper>
      )}
    </div>
  );
};

export default DropdownList;
