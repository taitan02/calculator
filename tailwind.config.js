/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        down: {
          '0%': {
            transform: 'translateY(-25px) scale(0.7) translateX(60px)',
            opacity: 0
          },
          '100%':{
            transform: 'translateY(0) scale(1) translateX(0)',
            opacity: 1
          }
        },
      },
      animation:{
        'down':'up 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}
