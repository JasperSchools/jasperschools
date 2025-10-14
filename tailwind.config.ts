import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'school-green': '#2E8B57',
        'school-red': '#E74C3C',
        'school-blue': '#000080',
        'school-yellow': '#F4D03F',
      },
    },
  },
  plugins: [],
}
export default config
