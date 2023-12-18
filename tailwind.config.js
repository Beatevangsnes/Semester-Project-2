/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Include HTML files in the root directory
    "./*.css", // Include CSS files in the root directory
    "./src/**/*.mjs", // Include .mjs files in the src directory and its subdirectories
    "./listings/**/*.html", // Include HTML files in the listings directory and its subdirectories
    "./listing/**/*.html", // Include HTML files in the listing directory and its subdirectories
    "./profile/**/*.html", // Include HTML files in the profile directory and its subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
