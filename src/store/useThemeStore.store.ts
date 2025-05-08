import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);
