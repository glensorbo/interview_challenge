/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#11133c',
        'primary-tinted': '#11133ce8',
        secondary: '#f9a86f',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
