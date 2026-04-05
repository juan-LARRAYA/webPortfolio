'use client';

import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const override = localStorage.getItem('theme-override') as 'dark' | 'light' | null;
      const t = override ?? (mq.matches ? 'dark' : 'light');
      setTheme(t);
      document.documentElement.setAttribute('data-theme', t);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme-override', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      style={{
        background: 'none',
        border: '1px solid var(--border-color)',
        borderRadius: '999px',
        cursor: 'pointer',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-muted)',
        transition: 'color 0.2s, border-color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent-amber)'; el.style.borderColor = 'var(--accent-amber)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent-muted)'; el.style.borderColor = 'var(--border-color)'; }}
    >
      {theme === 'dark' ? (
        /* Sun */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="pt-20 pb-12 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' , marginBottom: '0.1rem'  }}>
          <p className="text-xs font-mono" style={{ color: 'var(--accent-muted)' }}>© 2025 Juan Cruz Larraya</p>
          <ThemeToggle />
        </div>

        <p className="text-xs font-mono" style={{ color: 'var(--accent-muted)', marginBottom: '0.5rem' }}>Next.js · TypeScript · Tailwind · Framer Motion · GSAP</p>
      </div>
    </footer>
  );
}
