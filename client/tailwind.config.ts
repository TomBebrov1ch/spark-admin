import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5722",
          BG_LIGHT: "#FFF3EF",
          TRANSPARENT: "rgba(255, 87, 34, 0.25)",
          ALMOST_WHITE: "#FAFAFA",
          dark: "#E65100",
        },
        functional: {
          DEFAULT: "#F93A00",
          gray: "rgba(26, 26, 26, 0.50)",
          LIGHT: "#FFF3EF",
          dark: "#008BA3",
        },
        dark: {
          super: '#16151B',
          lighter: '#2B2934',
          upper: '#3A3846',
        },
        secondary: {
          DEFAULT: "#1A1A1A", // Light theme color
          dark: "#008BA3", // Dark theme variant
        },
      },
    },
  },
  plugins: [],
};
export default config;
