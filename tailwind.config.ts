import type { Config } from 'tailwindcss'

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
        neonBlue: '#0ff', // azul neon
        neonPink: '#ff0fff', // rosa neon
        neonGreen: '#0f0', // verde neon
        neonYellow: '#ff0', // amarelo neon
        neonPurple: '#a020f0',
      },
    },
  },
  plugins: [],
}

export default config
