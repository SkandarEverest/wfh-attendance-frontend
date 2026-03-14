import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          lighter: '#f9fafb',
          light: '#d1d5db',
          DEFAULT: '#6b7280',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
