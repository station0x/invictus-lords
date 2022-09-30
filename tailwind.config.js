/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      'Inter': ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        invictus: {
          red: '#F21111',
          'gray': {
            50: '#E6E6E6',
            100: '#B5B5B6',
            200: '#9D9D9F',
            300: '#74767A',
            400: '#5C5E63',
            500: '#2E3037',
            600: '#23262C',
            700: '#171A21',
            800: '#0e1318',
            900: '#090B0E'
          },
          'red': {
            50: '#DCC5C5',
            100: '#DEB1B1',
            200: '#E19D9D',
            300: '#E38989',
            400: '#E57575',
            500: '#ED3939',
            600: '#F54D4D',
            700: '#F54141',
            800: '#F32828',
            900: '#F21111'
          }
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}