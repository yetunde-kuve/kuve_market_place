"use client";

import React, { ReactNode, useRef, useState } from "react";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";

type DropdownItem = {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
};

type DropdownListProps = {
  label: string;
  icon?: ReactNode;
  items: DropdownItem[];
};

const DropdownList: React.FC<DropdownListProps> = ({
  label,
  icon = null,
  items = [],
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        className="flex h-[36px] justify-between px-[14px] py-[9px] gap-[9px] items-center rounded-full w-fit bg-background-Secondry dark:bg-background-Tertiary-dark"
        onClick={handleToggle}
        ref={buttonRef}
      >
        <span className="flex items-center gap-1 text-[14px] text-text  dark:text-text-dark font-[500]">
          {icon} {label}
        </span>{" "}
        {open ? (
          <i className="ri-arrow-up-s-line text-primary"></i>
        ) : (
          <i className="ri-arrow-down-s-line text-primary"></i>
        )}
      </button>

      {open && (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            className="bg-background dark:bg-text-secondary-dark"
            elevation={3}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 10,
              minWidth: buttonRef.current?.offsetWidth,
              marginTop: 4,
            }}
          >
            {items.map((item, index) => {
              const { label, icon, href, onClick } = item;

              const content = (
                <ListItemButton
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (onClick) onClick();
                    handleClose();
                  }}
                >
                  {icon && (
                    <span className="text-text dark:text-text-dark">
                      {icon}
                    </span>
                  )}
                  <ListItemText
                    className="text-text dark:text-text-dark"
                    primary={label}
                  />
                </ListItemButton>
              );

              return href ? (
                <Link key={index} href={href} passHref legacyBehavior>
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={handleClose}
                  >
                    {content}
                  </a>
                </Link>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default DropdownList;
