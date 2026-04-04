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
          dark: 'var(--bg-dark)',
          medium: 'var(--bg-medium)',
          border: 'var(--border-color)',
        },
        accent: {
          amber: 'var(--accent-amber)',
          cyan: 'var(--accent-cyan)',
          text: 'var(--text-primary)',
          muted: 'var(--accent-muted)',
          // legacy aliases
          gold: 'var(--accent-amber)',
          yellow: 'var(--accent-cyan)',
          light: 'var(--text-primary)',
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
