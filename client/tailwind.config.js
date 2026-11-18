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
        // Core Palette
        blush: '#E8D9E8',        // Blush Lavender
        lilac: {
          DEFAULT: '#D8B8D8',    // Soft Lilac
          soft: '#D8B8D8',
          light: '#F4EDF4',
          dark: '#BF98BF',
        },
        lavender: {
          DEFAULT: '#C8A2C8',    // Lavender
          light: '#E8D9E8',
          dark: '#B086B0',
          subtle: '#F8F2F8',
        },
        orchid: {
          DEFAULT: '#A87FA8',    // Orchid
          light: '#B993B9',
          hover: '#9B709B',
        },
        plum: {
          DEFAULT: '#8A5F8A',    // Dusty Plum
          dusty: '#8A5F8A',
          hover: '#A87FA8',
          dark: '#2A1D2D',       // Dark mode card surface
          darker: '#1C131E',     // Dark mode main background
          card: '#2A1D2D',
          border: '#48344E',
        },
        // Supporting Palette
        canvas: {
          DEFAULT: '#FAF7FA',    // Main background
          bg: '#FAF7FA',
          card: '#FFFFFF',       // Card background
          primary: '#392D3B',    // Primary text
          secondary: '#756678',  // Secondary text
          border: '#E8DCE8',     // Light borders
        },
        // Dark Mode Mappings
        darkCanvas: {
          bg: '#1C131E',
          card: '#2A1D2D',
          border: '#48344E',
          primary: '#FAF7FA',
          secondary: '#D8B8D8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(138, 95, 138, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(138, 95, 138, 0.12)',
        'dark-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
