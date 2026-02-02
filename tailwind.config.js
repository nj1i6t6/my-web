/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          950: '#0b0f19',
          900: '#121826',
          800: '#1b2536',
          700: '#273449',
        },
        'neon-green': '#39ff88',
      },
      boxShadow: {
        'neon-green': '0 0 28px rgba(57, 255, 136, 0.45)',
      },
      backgroundImage: {
        'gradient-steel':
          'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(18,24,38,0.95) 50%, rgba(13,17,28,0.98) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
