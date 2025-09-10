/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#d1d5db',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'traffic-blink': 'traffic-blink 2s ease-in-out infinite',
        'emergency-flash': 'emergency-flash 1s ease-in-out infinite',
        'vehicle-move': 'vehicle-move 8s linear infinite',
        'marker-bounce': 'marker-bounce 2s infinite',
      }
    },
  },
  plugins: [],
}