/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e2e8f0", 
        input: "#e2e8f0",
        background: "#ffffff",
        foreground: "#020617", 
        primary: {
          DEFAULT: "#0f172a", 
          foreground: "#f8fafc", 
        },
      },
    },
  },
  plugins: [],
};