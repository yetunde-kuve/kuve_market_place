"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextProps {
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
  anchorEl: HTMLElement | null;
  openNotification: boolean;
  setAnchorEl: (el: HTMLElement | null) => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openNotification = Boolean(anchorEl);


  return (
    <UIContext.Provider value={{ openDropdown, setOpenDropdown,anchorEl, openNotification, setAnchorEl }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
