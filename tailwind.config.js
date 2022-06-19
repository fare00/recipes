/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito'] 
      },
      boxShadow: {
        'solid': '5px 5px 0 rgb(0 0 0 / 1)'
      }
    },
  },
  plugins: [],
}
