/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        splash: 'radial-splash 1s ease-out forwards',
      },
      keyframes: {
        'radial-splash': {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(50)', opacity: 0 },
        },
      },
      fontFamily: {
        concert: ["Concert One", 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
});
