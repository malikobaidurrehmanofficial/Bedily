/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3B4FE4',
          secondary: '#1ED4C6',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3B4FE4 0%, #1ED4C6 100%)',
      },
    },
  },
  plugins: [],
}
