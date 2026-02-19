/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        juni: {
          navy: '#1B1F3B',
          purple: '#6B46C1',
          light: '#F5F5F5',
        },
      },
      backgroundImage: {
        'gradient-juni': 'linear-gradient(135deg, #1B1F3B 0%, #6B46C1 100%)',
      },
    },
  },
  plugins: [],
}
