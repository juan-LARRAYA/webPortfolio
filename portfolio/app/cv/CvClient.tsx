'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/i18n/LangContext';

export default function CvClient() {
  const { lang: siteLang } = useLang();
  const [lang, setLang] = useState<'es' | 'en'>('es');

  // Sync once from site language on mount
  useEffect(() => {
    setLang(siteLang);
  }, [siteLang]);

  const pdfPath = lang === 'es'
    ? '/cv/Juan Cruz Larraya CV-ES.pdf'
    : '/cv/Juan Cruz Larraya CV.pdf';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>

      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(var(--bg-dark-rgb), 0.95)', backdropFilter: 'blur(12px)', flexShrink: 0, zIndex: 40 }}>
        <Link href="/"
          style={{ color: 'var(--accent-muted)', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-amber)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-muted)'; }}
        >
          ← Volver
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language toggle */}
          <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
            {(['es', 'en'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  padding: '6px 16px',
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'none',
                  border: 'none',
                  color: lang === l ? 'var(--bg-dark)' : 'var(--accent-muted)',
                  background: lang === l ? 'var(--accent-amber)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Download */}
          <a href={pdfPath} download
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '6px 18px', borderRadius: '999px', border: '1px solid rgba(var(--accent-cyan-rgb), 0.4)', color: 'var(--accent-cyan)', background: 'rgba(var(--accent-cyan-rgb), 0.06)', fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(var(--accent-cyan-rgb), 0.14)'; el.style.borderColor = 'rgba(var(--accent-cyan-rgb), 0.8)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(var(--accent-cyan-rgb), 0.06)'; el.style.borderColor = 'rgba(var(--accent-cyan-rgb), 0.4)'; }}
          >
            ↓ Descargar
          </a>
        </div>
      </div>

      {/* PDF viewer — fills remaining height */}
      <iframe
        src={pdfPath}
        style={{ flex: 1, width: '100%', border: 'none' }}
        title="CV Juan Cruz Larraya"
      />
    </div>
  );
}
