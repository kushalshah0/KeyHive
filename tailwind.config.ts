import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#b7ddfd',
          300: '#84c6fb',
          400: '#4ea7f7',
          500: '#1b88f2',
          600: '#0f69ce',
          700: '#0f55a4',
          800: '#113f79',
          900: '#112f5d',
        },
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(circle, rgba(17,17,17,0.08) 1px, transparent 1px)',
        'grid-dark': 'radial-gradient(circle, rgba(250,250,250,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 101, 213, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;

