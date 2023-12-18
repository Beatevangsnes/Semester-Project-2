/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Root HTML files
    "./dist/css/*.css", // CSS files in dist/css
    "./src/**/*.{html,mjs}", // HTML and .mjs files in src and subdirectories
    "./listings/**/*.{html,mjs}", // listings directory
    "./listing/**/*.{html,mjs}", // listings directory
    "./profile/**/*.{html,mjs}", // profile directory
    // Add other directories as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
