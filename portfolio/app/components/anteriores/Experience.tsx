'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Reveal from '../ui/Reveal';

export default function Experience() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [pdfStatus, setPdfStatus] = useState<'checking' | 'ok' | 'missing'>('checking');

  const pdfPath = (l: 'es' | 'en') =>
    l === 'es' ? '/cv/Juan Cruz Larraya CV-ES.pdf' : '/cv/Juan Cruz Larraya CV.pdf';

  useEffect(() => {
    setPdfStatus('checking');
    fetch(pdfPath(lang), { method: 'HEAD' })
      .then((r) => setPdfStatus(r.ok ? 'ok' : 'missing'))
      .catch(() => setPdfStatus('missing'));
  }, [lang]);

  return (
    <section id="experiencia" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <Reveal>
            <h2 style={{ fontSize: 'clamp(4rem,12vw,11rem)', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.03em' }}>
              Trayectoria.
            </h2>
          </Reveal>
        </div>

        {/* Controls row: toggle + download */}
        <div className="flex items-center justify-between mb-10">
          <div className="inline-flex items-center gap-1 p-1 rounded-full"
            style={{ background: 'var(--bg-medium)', border: '1px solid var(--border-color)' }}>
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="relative px-5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-colors duration-200"
                style={{ color: lang === l ? '#080808' : 'var(--accent-muted)' }}
              >
                {lang === l && (
                  <motion.div
                    layoutId="cv-lang-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--accent-amber)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>

          <a
            href={pdfPath(lang)}
            download
            className="text-xs font-mono tracking-widest uppercase pb-px transition-colors duration-200"
            style={{ color: 'var(--accent-muted)', borderBottom: '1px solid var(--border-color)' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent-amber)'; el.style.borderColor = 'var(--accent-amber)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent-muted)'; el.style.borderColor = 'var(--border-color)'; }}
          >
            ↓ Descargar
          </a>
        </div>

        {/* PDF viewer / fallback */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden"
          style={{ height: '82vh', border: '1px solid var(--border-color)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {pdfStatus === 'ok' ? (
            <iframe
              key={lang}
              src={pdfPath(lang)}
              className="w-full h-full"
              title={`Curriculum Vitae — ${lang.toUpperCase()}`}
            />
          ) : pdfStatus === 'missing' ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <p className="text-sm font-mono" style={{ color: 'var(--accent-muted)' }}>
                CV · {lang.toUpperCase()} — próximamente
              </p>
              <Link
                href="/cv"
                className="text-xs font-mono tracking-widest uppercase pb-px"
                style={{ color: 'var(--accent-amber)', borderBottom: '1px solid var(--accent-amber)' }}
              >
                Ver CV online →
              </Link>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 animate-spin"
                style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--accent-amber)' }} />
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
