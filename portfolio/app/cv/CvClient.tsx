'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CvClient() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const pdfPath = lang === 'es'
    ? '/cv/Juan Cruz Larraya CV-ES.pdf'
    : '/cv/Juan Cruz Larraya CV.pdf';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#080808', color: '#F2F0E9' }}>

      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem', borderBottom: '1px solid #1A1A1A', background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', flexShrink: 0, zIndex: 40 }}>
        <Link href="/"
          style={{ color: '#555555', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5A623'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555555'; }}
        >
          ← Volver
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language toggle */}
          <div style={{ display: 'flex', border: '1px solid #1A1A1A', borderRadius: '999px', overflow: 'hidden' }}>
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
                  color: lang === l ? '#080808' : '#555555',
                  background: lang === l ? '#F5A623' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Download */}
          <a href={pdfPath} download
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '6px 18px', borderRadius: '999px', border: '1px solid rgba(0,212,255,0.4)', color: '#00D4FF', background: 'rgba(0,212,255,0.06)', fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,212,255,0.14)'; el.style.borderColor = 'rgba(0,212,255,0.8)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,212,255,0.06)'; el.style.borderColor = 'rgba(0,212,255,0.4)'; }}
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
