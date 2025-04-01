import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

module.exports = {
  plugins: [heroui()],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(date-picker|button|ripple|spinner|calendar|date-input|form|popover).js',
  ],
  theme: {
    extend: {
      colors: {
        text: {
          secondary: 'var(--text-secondary)',
          text: 'var(--text-text)',
          green: 'var(--text-green)',
        },
      },
    },
  },
} satisfies Config;
