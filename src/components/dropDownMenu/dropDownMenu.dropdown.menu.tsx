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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
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
      }, 200); // slight delay to allow hover transfer
    }
  };

  const handleClick = () => {
    if (isMobile) {
      router.push(mobileRedirectPath);
    }
  };

  return (
    <div
      className={cn("relative inline-block w-full")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex text-text h-[36px] focus:shadow-none justify-between px-[12px] py-[9px] gap-[9px] items-center rounded-full w-full",
          "bg-background-Secondary dark:bg-background-Tertiary-dark",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
          "active:bg-primary active:text-white",
          "hover:bg-primary hover:text-white",
          open && "bg-primary text-white"
        )}
        ref={buttonRef}
        onClick={handleClick}
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

      {!isMobile && open && (
        <Popper
          disablePortal={false}
          open={open}
          anchorEl={buttonRef.current}
          placement="bottom-start"
          sx={{
            zIndex: 2000,
            width: "99vw",
            // Full width
            left: 0,
            paddingTop: 2,
            paddingX: "88px",
          }}
        >
          <div ref={popperRef}>
            <Paper
              className={cn(
                "w-full bg-white shadow-xl h-[400px]", // fixed height
                "rounded-lg overflow-hidden"
              )}
              elevation={3}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* scroll wrapper */}
              <div className="max-h-[330px] overflow-auto px-[100px] py-[63px] mx-10">
                <div className="grid grid-cols-4 gap-[40.7px] min-w-max">
                  {items.map((group: any, index: number) => (
                    <div
                      key={group.title}
                      className={cn(
                        index !== 3 &&
                          index !== 7 &&
                          "border-r border-r-slate-200"
                      )}
                    >
                      <h4 className="mb-2 text-sm font-semibold">
                        {group.title}
                      </h4>
                      <ul className="space-y-1">
                        {group.categories.map((cat: any) => (
                          <li
                            key={cat.id}
                            className="text-sm text-gray-700 cursor-pointer hover:text-primary text"
                          >
                            {cat.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
