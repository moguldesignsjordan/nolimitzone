/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nlzPurple: '#6d28d9',
        nlzRed: '#ef4444',
        nlzDark: '#1a1a2e',
      }
    },
  },
  plugins: [],
}