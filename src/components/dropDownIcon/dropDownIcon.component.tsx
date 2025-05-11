"use client";

import React, { useState, useRef } from "react";
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
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const toggleDropdown = () => setOpen((prevOpen) => !prevOpen);
  const handleClickAway = () => setOpen(false);

  return (
    <>
      <button ref={anchorRef} onClick={toggleDropdown}>
        {icon}
      </button>

      <Popper
        sx={{
          zIndex: 104,
        }}
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        disablePortal
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper className="mt-2 min-w-[180px] shadow-md rounded-md overflow-hidden">
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
                  className="px-4 py-2 text-sm text-gray-800 cursor-pointer "
                >
                  {option}
                </div>
              ))}
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
