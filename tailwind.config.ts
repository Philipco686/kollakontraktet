import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Auktoritets-marinblå (förtroende)
        brand: {
          50: '#f1f4fb',
          100: '#dfe7f6',
          200: '#c3d1ee',
          300: '#97b0e0',
          400: '#6588cf',
          500: '#4264bc',
          600: '#314da0',
          700: '#1e3a8a',
          800: '#1a316f',
          900: '#172a5c',
        },
        // Förtroende-guld (accent / CTA)
        accent: {
          50: '#fdf6ec',
          100: '#f9e6c8',
          200: '#f2cd8d',
          300: '#eab153',
          400: '#e19a2c',
          500: '#cf7d12',
          600: '#b45309',
          700: '#8f400b',
          800: '#74340f',
          900: '#602c10',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
