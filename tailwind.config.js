/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}", "./src/**/**/**/*.{html,jsx,js}", "./src/*.{html,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}