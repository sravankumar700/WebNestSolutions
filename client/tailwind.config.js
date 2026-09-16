/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft warm cream background tones (easy on eyes, NO pure harsh white background)
        cream: {
          50: '#FCFAF7',
          100: '#F7F4EE', // Primary warm off-white background
          200: '#EFEBE2',
          300: '#E2DBD0',
          400: '#C9C0B3',
        },
        charcoal: {
          950: '#111215',
          900: '#16171B', // Footer & dark contrast elements
          850: '#1D1E24',
          800: '#272932',
          700: '#3A3D4A',
          600: '#54586A',
        },
        brandRed: {
          500: '#CE422B', // Warm rust red accent from exact design format
          600: '#B83823',
          700: '#9E2C1A',
        },
        warmNeutral: {
          100: '#F7F5F0',
          200: '#EAE6DD',
          300: '#BCB6AA',
          500: '#6B665E', // Muted body text
          600: '#57514C',
          700: '#3D3A35',
          900: '#1C1B19',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'card-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
