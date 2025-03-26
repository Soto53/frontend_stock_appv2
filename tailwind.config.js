/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#1f1f1f',
      },
    },
  },
  plugins: [    
    require('tailwindcss'),
    require('autoprefixer'),],
}

