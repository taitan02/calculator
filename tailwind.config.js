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
        rotate:{
          '0%':{
            transform: 'rotate(0deg)'
          },
          '25%':{
            transform: 'rotate(2deg)'
          },
          '50%':{
            transform: 'rotate(0)'
          },
          '75%':{
            transform: 'rotate(-2deg)'
          },
          '100%':{
            transform: 'rotate(0)'
          }
        }
      },
      animation:{
        'down':'down 0.3s ease-in-out',
        'rotate':'rotate 5s infinite ease-in-out'
      }
    },
  },
  plugins: [],
}
