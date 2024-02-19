/** @type {import('tailwindcss').Config} */
import color from 'tailwindcss/colors'
// const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...color,
      'black':'#2A2A2A',
      'white': '#FFFFFF',
      'lightblack': '#333333',
      'yellow': '#F5E6BE',
      'gray': '#DBDBDB',
      'darkgray': '#8C8C8C',
      'blue': '#0A77C5',
      'transparent': 'transparent',
    }
  },
  plugins: [],
}

