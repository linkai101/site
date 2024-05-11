/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // bool or 'media' (system setting) or 'class' (toggle manually)
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
        sans: ["Inter", "sans-serif"],
        heading: ["Koulen", "sans-serif"],
        mono: ["Reddit Mono", "monospace"],
        cursive: ["Pinyon Script", "cursive"],
        sketch: ["Londrina Solid", "sans-serif"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      colors: {
        primary: "#C7956D",
        onPrimary: "#FCF5ED",
        light: "#FCF5ED",
        dark: "#1F1717",
      },
    },
  },
  plugins: [],
}
