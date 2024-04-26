/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3F51B5",
        secondary: "#FFC107",
        secondaryWhite: "#FFFFFF",
        someWhite: "#F3F4F6",
        black: "#000000",
        someBlack: "#171A1F",
        grey: "#6F7787",
        colorOne: "#4CAF50",
        colorTwo: "#E91E63",
      },
    },
  },
  plugins: [],
}

