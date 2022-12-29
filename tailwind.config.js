/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          '50': '#f8f8f8',
          '100': '#e7e7e7',
          '400': '#7c7c7c',
          '800': '#141414',
        },
        red: {
          '300': '#f18989',
          '400': '#BA4242',
          '500': '#C73232',
          '800': '#802e2e',
        }
      },
      boxShadow: {
        'smInsetFadeRed': 'inset -1px -4px 6px #da8484',
        'insetFade': 'inset 0 0 20px 10px #0c0c0c',
        'boxSmInset': 'inset 1px 2px 3px 1px #831111',
        'boxSm': '2px 3px 8px 1px #adadad',
        'box': '8px 5px 16px 8px #c0c0c0e7',
        'boxCard': '5px 5px 14px 6px #bbb8b8ff',
        'boxRed': '3px 3px 14px 2px #d1333388',
        'redShade': '0 0 6px 3px #db5454',
        'redShadeRight': '100px 0px 120px 60px #882929bd',
        'bottomShade': '0 2px 6px #b91313de',
      }
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
      
      'cel': {'max': '639px'},
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
