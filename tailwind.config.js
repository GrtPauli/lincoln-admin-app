/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        mblack: ["Black", "sans-serif"],
        mulish: ["Mulish_400Regular", "sans-serif"],
      },
      colors: {
        primary: "#ef4444",
        secondary: "#111111",
        divider: "#ddd",
        "light-gray": "#ededed",
        "alt-dark": "#373633",
        light: "#fff",
        dark: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
