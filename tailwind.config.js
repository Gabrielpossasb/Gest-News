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
          '100': '#dadada',
          '400': '#7c7c7c',
          '800': '#141414',
        }
      },
      boxShadow: {
        'insetFade': 'inset 0 0 20px 10px #0c0c0c',
        'boxSm': '2px 3px 8px 1px #a1a1a1',
        'box': '6px 6px 10px 4px #afafaf',
        'redShade': '0 0 6px 3px #d11d1dde',
        'redShadeRight': '100px 0px 120px 60px #570a0ad5',
        'bottomShade': '0 2px 6px #b91313de',
      }
    },
  },
  plugins: [],
}
