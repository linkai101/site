import type { Config } from "tailwindcss";

export default {
  darkMode: 'selector',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Geist", "sans-serif"],
        heading: ["Koulen", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
        cursive: ["Pinyon Script", "cursive"],
        sketch: ["Londrina Solid", "sans-serif"],
        sketchOutline: ["Londrina Sketch", "sans-serif"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      colors: {
        primary: "#C7956D",
        light: "#FCF5ED",
        dark: "#1F1717",
      },
    },
  },
  plugins: [],
} satisfies Config;
