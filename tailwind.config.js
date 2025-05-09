/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        // Semantic color tokens
        primary: {
          DEFAULT: "#FF9D98",
          light: "#B47072",
          dark: "#3B82F6",
        },
        secondary: {
          DEFAULT: "#9333EA",
          dark: "#8B5CF6",
        },
        tertiary: {
          DEFAULT: "#F59E0B",
          dark: "#FCD34D",
        },
        black: {
          primary: "#000000",
          light: "#222222",
        },

        background: {
          DEFAULT: "#ffffff",
          dark: "#0f172a",
          Secondary: {
            DEFAULT: "#F7F7F9",
            dark: "#0f172a",
          },
          Tertiary: {
            DEFAULT: "#E6E6EA",
            dark: "#0f172a",
          },
          Tag: {
            DEFAULT: "#E6E6EA",
            dark: "#0f172a",
          },
          Disabled: {
            DEFAULT: "#B4B4BF",
            dark: "#0f172a",
          },
          Disabled2: {
            DEFAULT: "#F2F2F4",
            dark: "#0f172a",
          },
        },
        complementry: {
          DEFAULT: "#B1E1E0",
          shad1: "#C8EAE9",
          shade2: "#F7FCFC",
          shade3: "#FBFDFD",
          dark: "#e2e8f0",
        },
        text: {
          DEFAULT: "#060619",
          dark: "#e2e8f0",
          secondary: {
            DEFAULT: "#44445F",
            dark: "#9CA3AF",
          },
          Tertiary: {
            DEFAULT: "#828294",
            dark: "#9CA3AF",
          },
          Disabled: {
            DEFAULT: "#B4B4BF",
            dark: "#9CA3AF",
          },
        },
        success: {
          DEFAULT: "#244B01",
          light: "#E7F8DA",
          dark: "#6EE7B7",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FFF4F6",
          dark: "#F87171",
        },
        warning: {
          DEFAULT: "#FFA722",
          light: "#FFF9F1",
          dark: "#FBBF24",
        },
        info: {
          DEFAULT: "#042852",
          light: "#E6E6EA",
          dark: "#60A5FA",
        },
      },
    },
  },
  plugins: [],
};
