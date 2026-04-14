/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#EDFAF2',
          100: '#D0F0DF',
          200: '#9ADDB8',
          300: '#5DC48E',
          400: '#2EA865',
          500: '#1A8048',
          600: '#0F6035',
          700: '#0B4D2B',
          800: '#073520',
          900: '#031A10',
        },
        gold: {
          50:  '#FFFAEB',
          100: '#FFF2C2',
          200: '#FFE480',
          300: '#FFD13D',
          400: '#F6A800',
          500: '#D48E00',
          600: '#A86E00',
          700: '#7C5200',
          800: '#503600',
          900: '#241800',
        },
        cream: {
          50:  '#FEFCF7',
          100: '#F9F6EF',
          200: '#F0EDE4',
          300: '#E5DFD3',
          400: '#D5CEBC',
          500: '#B8AE9A',
        },
      },
      boxShadow: {
        warm:    '0 4px 20px rgba(11,77,43,0.07)',
        'warm-md': '0 8px 32px rgba(11,77,43,0.12)',
        'warm-lg': '0 16px 48px rgba(11,77,43,0.18)',
        gold:    '0 4px 20px rgba(246,168,0,0.30)',
      },
    },
  },
  plugins: [],
  // Safelist ensures Tailwind does not purge runtime-generated class names
  safelist: [
    'shadow-warm',
    'shadow-warm-md',
    'shadow-warm-lg',
    'shadow-gold',
    'badge-verified',
    'badge-pending',
    'badge-rejected',
    'badge-flagged',
    'badge-trust',
    'anim-fade-up',
    'anim-fade-in',
    'anim-slide-l',
  ],
}
