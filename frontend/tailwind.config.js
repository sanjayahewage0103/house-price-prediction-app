/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-gray': '#5D697A',
        'dark-gray': '#383838',
        'orange': '#F66B34',
        'yellow': '#F2D639',
        'dark-charcoal': '#363333',
        'very-dark-gray': '#272121',
        'orange-red': '#E16428',
        'light-grayish-pink': '#F6E9E9',
      },
    },
  },
  plugins: [],
}

