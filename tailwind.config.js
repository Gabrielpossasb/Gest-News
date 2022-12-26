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
        }
      },
      boxShadow: {
        'insetFade': 'inset 0 0 20px 10px #0c0c0c',
        'boxSmInset': 'inset 1px 2px 3px 1px #831111',
        'boxSm': '2px 3px 8px 1px #adadad',
        'box': '8px 5px 16px 8px #c0c0c0e7',
        'boxCard': '5px 5px 14px 6px #bbb8b8ff',
        'boxRed': '3px 3px 6px 4px #c20d0d5b',
        'redShade': '0 0 6px 3px #d11d1dde',
        'redShadeRight': '100px 0px 120px 60px #570a0ad5',
        'bottomShade': '0 2px 6px #b91313de',
      }
    },
  },
  plugins: [],
}
