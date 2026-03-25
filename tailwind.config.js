/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#020B13',
        'carbon-fiber': '#262626',
        'funky-gold': '#DAAB2D',
        'bronze-coin': '#A57A03',
        'champagne-onyx': '#F5E6C8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter or default sans
      }
    },
  },
  plugins: [],
};
