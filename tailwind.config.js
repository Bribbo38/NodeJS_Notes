/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,ejs,js}',
    './views/**/*.{html,ejs,js}',
  ],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    theme: ["light", "dark"],
  },
};