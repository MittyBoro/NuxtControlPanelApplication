/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

const supernova = {
  50: '#fffee7',
  100: '#fffec1',
  200: '#fff886',
  300: '#ffec41',
  400: '#ffdb0d',
  500: '#ffcc00',
  600: '#d19500',
  700: '#a66a02',
  800: '#89530a',
  900: '#74430f',
  950: '#442304',
}

export default {
  content: [
    './assets/**/*.scss',
    './components/**/*.{js,vue,ts}',
    './config/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './app.config.ts',
    './error.vue',
  ],
  darkMode: 'class',
  theme: {
    backgroundSize: {
      '200%': '200%',
    },
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      colors: {
        gray: colors.zinc,
        yellow: colors.amber,

        transparent: 'transparent',
        current: 'currentColor',

        supernova: supernova,
        primary: supernova,
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
}
