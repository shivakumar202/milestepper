/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#0B1F3A',
          900: '#050d1a',
        },
        orange: {
          500: '#FF7A00',
          600: '#e66d00',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          'blinkmacsystemfont',
          '"segoe ui"',
          'roboto',
          'oxygen',
          'ubuntu',
          'cantarell',
          '"fira sans"',
          '"droid sans"',
          '"helvetica neue"',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px rgba(11, 31, 58, 0.3)',
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(to right, #FF7A00, #e66d00)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};
