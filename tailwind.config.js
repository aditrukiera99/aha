/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        proxima: ["Proxima Nova", "sans-serif"],
      },
      colors: {
        "chroma-darkest": "#1F2432",
        "chroma-darker": "#5E6674",
        "chroma-dark": "#A1AEB7",
        "chroma-light": "#E6E9ED",
        "chroma-lighter": "#EDEFF2",
        "chroma-lightest": "#F4F5F6",
        "chroma-white": "#FFFFFF",
        "chroma-white-2": "#FAFBFC",
        "chroma-disabled": "#D9DDE1",
        "primary-survein": "#166ED8",
        "primary-surveins": "#52E2CB",
        "primary-survein-grade-1": "#B9D4F3",
        "primary-survein-grade-2": "#D0E2F7",
        "primary-survein-grade-3": "#EDF5FD",
        "primary-blue-1": "#0627CD",
        "primary-blue-2": "#215EDE",
        "vin-vinprotocol": "#07124D",
        "vin-bright-bg": "#1D21FF1A",
        "vin-bright": "#1D21FF",
        "thead-gray": "#EDEFF2",
        "outline-blue": "rgb(0, 95, 204)",
        "icon-color": "#D9DDE1",
      },
    },
  },
  plugins: [],
};
