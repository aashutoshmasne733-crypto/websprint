/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#E63946',
          dark: '#C52B37',
          light: '#FF4D5A'
        },
        yellow: {
          DEFAULT: '#F4B400',
          dark: '#D9A000',
          light: '#FFC824'
        },
        violet: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          light: '#8B5CF6'
        },
        ink: {
          DEFAULT: '#111111',
          light: '#262626'
        },
        green: {
          DEFAULT: '#8BC34A',
          dark: '#7CB342',
          light: '#9CCC65'
        },
        cardWhite: '#FAFAF7',
        background: '#F5F1E8',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Archivo Black"', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'hard-sm': '3px 3px 0px 0px #111111',
        'hard': '4px 4px 0px 0px #111111',
        'hard-md': '5px 5px 0px 0px #111111',
        'hard-lg': '6px 6px 0px 0px #111111',
        'hard-xl': '8px 8px 0px 0px #111111',
        'hard-violet': '5px 5px 0px 0px #7C3AED',
        'hard-red': '5px 5px 0px 0px #E63946',
        'hard-yellow': '5px 5px 0px 0px #F4B400',
      },
      borderRadius: {
        'neubrutal': '10px',
      }
    },
  },
  plugins: [],
}
