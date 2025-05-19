"use client";

import React, { useState, useEffect, useRef } from "react";
import { Popper, Paper, ClickAwayListener, Divider } from "@mui/material";

type IconDropdownProps = {
  icon: React.ReactNode;
  title?: React.ReactNode;
  options: React.ReactNode[];
};

export default function IconDropdown({
  icon,
  title,
  options,
}: IconDropdownProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      setOpen((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setOpen(false);
  };

  const handleClickAway = () => setOpen(false);

  return (
    <>
      <div
        ref={anchorRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {icon}
        <Popper
          sx={{ zIndex: 104 }}
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper
              className="mt-2 min-w-[180px] shadow-md rounded-md overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col">
                {title && (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold text-text">
                      {title}
                    </div>
                    <Divider className="m-0" />
                  </>
                )}
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-sm text-gray-800 cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </div>
    </>
  );
}
