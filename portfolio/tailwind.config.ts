import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#080808',
          medium: '#111111',
          border: '#1A1A1A',
        },
        accent: {
          amber: '#F5A623',
          cyan: '#00D4FF',
          text: '#F2F0E9',
          muted: '#555555',
          // keep legacy aliases for components not yet migrated
          gold: '#F5A623',
          yellow: '#00D4FF',
          light: '#F2F0E9',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
