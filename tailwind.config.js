/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'sans-serif'],
      },
      colors: {
        background: 'var(--background-color)',
        foreground: 'var(--foreground-color)',
      },
    },
  },
  plugins: [],
};
