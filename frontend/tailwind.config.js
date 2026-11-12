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
        // Monochrome Apple Palette
        brand: {
          50: '#fafafa',
          100: '#f5f5f7',
          200: '#e5e5ea',
          300: '#d1d1d6',
          400: '#8e8e93',
          500: '#1d1d1f',
          600: '#121214',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        surface: {
          50: '#f5f5f7',
          100: '#ebebeb',
          200: '#e2e2e7',
          300: '#d1d1d6',
          400: '#8e8e93',
          500: '#636366',
          600: '#48484a',
          700: '#2c2c2e',
          800: '#1c1c1e',
          900: '#121214',
          950: '#000000',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          'Inter',
          'system-ui',
          '-apple-system-body',
          'sans-serif'
        ],
        mono: ['"SF Mono"', 'JetBrains Mono', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'floating': '0 24px 48px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        'dark-floating': '0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)'
      }
    },
  },
  plugins: [],
}
