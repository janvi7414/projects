/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"   // scan all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {},                     // you can add custom colors, fonts, etc.
  },
  plugins: [],                      // you can add Tailwind plugins if needed
}
