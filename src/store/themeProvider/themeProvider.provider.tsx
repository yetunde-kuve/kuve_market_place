"use client";

import { useThemeStore } from "../useThemeStore.store";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const bodyElement = document.body; // <body> element
    const lightModeBackgroundColor = "#F7F7F9"; // Light theme background
    const darkModeBackgroundColor = "#0f172a"; // Dark theme background
    if (theme === "dark") {
      bodyElement.style.backgroundColor = darkModeBackgroundColor;
      bodyElement.classList.add("dark");
    } else {
      bodyElement.style.backgroundColor = lightModeBackgroundColor;
      bodyElement.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
