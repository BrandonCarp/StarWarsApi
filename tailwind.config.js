/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        starYellow: "rgb(255, 232, 31)",
        starYellowIsh: "rgb(241, 184, 24)",
        spaceBlack: "rgb(0, 0, 0)",
      },
    },
  },
  plugins: [],
};
