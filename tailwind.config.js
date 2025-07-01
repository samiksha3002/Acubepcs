/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: '0 0 8px #00ff84, 0 0 12px #00ff84',
      },
      colors: {
        neonGreen: '#00ff84',
      },
    },
  },
  plugins: [],
};
