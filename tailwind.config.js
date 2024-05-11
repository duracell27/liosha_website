/** @type {import('tailwindcss').Config} */
import color from 'tailwindcss/colors'
// const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
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
      // darktheme colors 
      'dark-bg': '#444B59',
      'dark-input-bg': '#505869',
      'dark-button-bg': '#DDDBDB',
      'dark-text': '#DDDBDB',
      'dark-border': '#70798C',
    }
  },
  plugins: [],
}

