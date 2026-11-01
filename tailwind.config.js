/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBF6E6",
        ink: "#16130F",
        paddy: "#A8BE86",
        deepLeaf: "#3E5B34",
        clay: "#D98B6F",
        waterBlue: "#A9C8EC",
        periwinkle: "#9FA9EE",
        turmeric: "#E7B94A",
        blackFooter: "#0E0C0B",
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Space Mono", "monospace"],
        sans: ["Inter", "DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
