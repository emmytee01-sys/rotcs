/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'reg-bg': '#020617',
        'reg-surface': '#0F172A',
        'reg-blue': '#3B82F6',
        'reg-green': '#10B981',
        'obsidian': '#020617',
        'steel': '#0F172A',
        'vivid-amber': '#F59E0B',
        primary: {
          DEFAULT: '#10B981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.15)',
        'neon': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '24px',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to avoid conflicts with Ant Design
  },
}
