import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Source Serif Pro", "Georgia", "serif"],
        body: ["Synonym", "system-ui", "sans-serif"],
      },
      colors: {
        "primary-50": "#fefce8",
        "primary-100": "#fef9c3",
        "primary-200": "#fef08a",
        "primary-300": "#fde047",
        "primary-400": "#facc15",
        "primary-500": "#eab308",
        "primary-600": "#ca8a04",
        "primary-700": "#a16207",
        "primary-800": "#854d0e",
        "primary-900": "#713f12",
        "primary-950": "#422006",

        // secondary
        secondary: "#fafafa",
        "secondary-medium": "#31373F",
      },
    },
  },
};

export default config;
