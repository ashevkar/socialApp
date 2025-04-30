// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // Add paths to your content files
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bangers"', 'sans-serif'],  // Add Bangers as display font
      },
    },
  },
  plugins: [],
};
