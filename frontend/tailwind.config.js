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
        background: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F1F5F9',
          card: '#FFFFFF',
          hover: '#F8FAFC',
        },
        gold: {
          100: '#E0F2FE', // Ice cyan/blue
          200: '#BAE6FD', // Light sky
          300: '#38BDF8', // Bright cyan accent (from card arrow & highlight)
          400: '#00A6FB', // Vibrant electric blue
          500: '#0267D6', // Primary royal blue (from card logo & contact icons)
          600: '#0153B8', // Deep royal blue
          700: '#014A96', // JHRST brand blue (from card logo text)
          800: '#051349', // Card name deep midnight blue
          900: '#081B36', // Right banner dark navy
        },
        brand: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#38BDF8',
          400: '#00A6FB',
          500: '#0267D6',
          600: '#0153B8',
          700: '#014A96',
          800: '#051349',
          900: '#081B36',
          950: '#030A17',
        },
        border: {
          DEFAULT: '#E2E8F0',
          light: '#F1F5F9',
          gold: 'rgba(2, 103, 214, 0.25)',
        },
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #00A6FB 0%, #0267D6 50%, #014A96 100%)',
        'gold-subtle': 'linear-gradient(180deg, rgba(2, 103, 214, 0.08) 0%, rgba(2, 103, 214, 0) 100%)',
        'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, rgba(2, 103, 214, 0.1) 0%, rgba(248, 250, 252, 0) 70%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px -2px rgba(2, 103, 214, 0.2)',
        'gold-md': '0 8px 24px -4px rgba(2, 103, 214, 0.25)',
        'gold-glow': '0 0 30px -5px rgba(2, 103, 214, 0.22)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
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
