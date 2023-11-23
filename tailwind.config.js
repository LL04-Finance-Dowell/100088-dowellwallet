/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xl: "1.4rem", // Define your custom text size
      },
      colors:{
        primaryBlue: "#2D4EFF",
        secondaryBlue:"#E0E5FF",
        primaryBlack: "#1F1F1F",
        secondaryBlack:"#5B5B5B",
        thirdBlack:"#1e1e1e",
        primaryWhite:"#F3F5FF",
        borderColor:"#CDDBFF",
        secondaryBorderColor:"#B4C6FF",
        iconBackground:"#DFECFF",
        lineColor:"#BCBCBC",
        primaryGreen:"#2f9e44",
        secondaryGreen:"#b2f2bb",
      },
    },
  },
  plugins: [],
};
