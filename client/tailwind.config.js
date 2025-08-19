/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
        },
        ink: '#0f172a'
      },
      fontFamily: {
        sans: ["var(--font-noto)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Helvetica Neue", "Arial", "\"Apple Color Emoji\"", "\"Segoe UI Emoji\""],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '1.25rem',
          lg: '1.5rem'
        }
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};


