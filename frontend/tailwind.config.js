/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0D0D0D',
          secondary: '#101010',
          card: '#141414',
          hover: '#1a1a1a',
        },
        gold: {
          100: '#FDF7E7',
          200: '#FAEEC3',
          300: '#F5D76E', // Light gold
          400: '#E4C14D',
          500: '#D4AF37', // Primary gold
          600: '#B89428',
          700: '#94741B',
          800: '#6E5513',
          900: '#42330A',
        },
        border: {
          DEFAULT: '#292929',
          light: '#383838',
          gold: 'rgba(212, 175, 55, 0.35)',
        },
        muted: '#A3A3A3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5D76E 0%, #D4AF37 50%, #AA8C2C 100%)',
        'gold-subtle': 'linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(20, 20, 20, 0.95) 0%, rgba(13, 13, 13, 0.98) 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, rgba(5, 5, 5, 0) 70%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px -2px rgba(212, 175, 55, 0.25)',
        'gold-md': '0 4px 20px -2px rgba(212, 175, 55, 0.3)',
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.25)',
        'card': '0 4px 24px -2px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
