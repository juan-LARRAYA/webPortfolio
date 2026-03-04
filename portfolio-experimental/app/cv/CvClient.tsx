'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
};

// ── Data ──────────────────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    role: 'Pasante de Ingeniería',
    company: 'Edelflex',
    period: 'Sep 2023 — Presente',
    location: 'Don Torcuato, Buenos Aires',
    items: [
      'Desarrollo y revisión de diagramas eléctricos industriales',
      'Automatización de procesos con TIA Portal (Siemens S7)',
      'Programación en Python y Power Automate para gestión de datos',
      'Documentación técnica con AutoCAD y suite Office',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'Ingeniería Electrónica',
    school: 'FIUBA — Universidad de Buenos Aires',
    period: '2022 — Cursando',
    detail: 'Facultad de Ingeniería',
  },
];

const SKILLS = {
  'Automatización': ['TIA Portal (Siemens)', 'Power Automate', 'PLC Ladder'],
  'Programación': ['Python', 'TypeScript', 'SQL', 'Next.js'],
  'CAD / Diseño': ['AutoCAD', 'KiCad'],
  'Ofimática': ['Microsoft Office', 'Excel avanzado'],
};

const LANGS = [
  { lang: 'Español', level: 'Nativo' },
  { lang: 'Inglés', level: 'Avanzado (B2/C1)' },
];

export default function CvClient() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  // Check if PDF files exist to show download buttons
  const hasPdf = true; // set to false if PDFs not yet uploaded

  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#F2F0E9' }}>
      {/* Header nav */}
      <div className="border-b px-8 py-5 flex items-center justify-between sticky top-0 z-40"
        style={{ borderColor: '#1A1A1A', background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)' }}>
        <Link href="/"
          className="text-sm font-mono tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ color: '#555555' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5A623'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555555'; }}
        >
          ← JCL
        </Link>

        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center border rounded-full overflow-hidden" style={{ borderColor: '#1A1A1A' }}>
            {(['es', 'en'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className="px-4 py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-200"
                style={{
                  color: lang === l ? '#080808' : '#555555',
                  background: lang === l ? '#F5A623' : 'transparent',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* PDF download */}
          {hasPdf && (
            <a href={`/cv/cv-${lang}.pdf`} download
              className="flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-mono tracking-widest uppercase transition-all duration-200"
              style={{ borderColor: 'rgba(0,212,255,0.4)', color: '#00D4FF', background: 'rgba(0,212,255,0.06)' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,212,255,0.14)'; el.style.borderColor = 'rgba(0,212,255,0.8)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,212,255,0.06)'; el.style.borderColor = 'rgba(0,212,255,0.4)'; }}
            >
              ↓ Descargar PDF
            </a>
          )}
        </div>
      </div>

      {/* CV Content */}
      <div className="max-w-3xl mx-auto px-8 py-16">

        {/* Name + title */}
        <motion.div className="mb-16 pb-12 border-b" style={{ borderColor: '#1A1A1A' }}
          initial="hidden" animate="show" custom={0} variants={fadeUp}>
          <p className="text-xs font-mono tracking-[0.4em] uppercase mb-4" style={{ color: '#00D4FF' }}>
            Curriculum Vitae
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-2" style={{ color: '#F2F0E9' }}>
            Juan Cruz<br />Larraya
          </h1>
          <p className="text-lg mt-4" style={{ color: '#555555' }}>
            Estudiante de Ingeniería Electrónica · FIUBA · Buenos Aires
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm" style={{ color: '#555555' }}>
            <a href="mailto:juanlarraya00@gmail.com"
              className="transition-colors" style={{ color: '#F5A623' }}>
              juanlarraya00@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/juan-cruz-larraya" target="_blank" rel="noopener noreferrer"
              className="transition-colors hover:text-white">
              linkedin.com/in/juan-cruz-larraya
            </a>
            <a href="https://github.com/juan-LARRAYA" target="_blank" rel="noopener noreferrer"
              className="transition-colors hover:text-white">
              github.com/juan-LARRAYA
            </a>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.section className="mb-14" initial="hidden" animate="show" custom={1} variants={fadeUp}>
          <p className="text-xs font-mono tracking-[0.4em] uppercase mb-8" style={{ color: '#00D4FF' }}>
            Experiencia
          </p>
          {EXPERIENCE.map((exp) => (
            <div key={exp.company} className="pl-4 mb-8" style={{ borderLeft: '1px solid #F5A623' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: '#F2F0E9' }}>{exp.role}</h3>
                  <p className="text-sm font-mono" style={{ color: '#F5A623' }}>{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono" style={{ color: '#555555' }}>{exp.period}</p>
                  <p className="text-xs" style={{ color: '#555555' }}>{exp.location}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {exp.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#aaaaaa' }}>
                    <span style={{ color: '#00D4FF', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.section>

        {/* Education */}
        <motion.section className="mb-14" initial="hidden" animate="show" custom={2} variants={fadeUp}>
          <p className="text-xs font-mono tracking-[0.4em] uppercase mb-8" style={{ color: '#00D4FF' }}>
            Educación
          </p>
          {EDUCATION.map((edu) => (
            <div key={edu.school} className="pl-4" style={{ borderLeft: '1px solid #1A1A1A' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: '#F2F0E9' }}>{edu.degree}</h3>
                  <p className="text-sm" style={{ color: '#555555' }}>{edu.school}</p>
                </div>
                <p className="text-sm font-mono" style={{ color: '#555555' }}>{edu.period}</p>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Skills */}
        <motion.section className="mb-14" initial="hidden" animate="show" custom={3} variants={fadeUp}>
          <p className="text-xs font-mono tracking-[0.4em] uppercase mb-8" style={{ color: '#00D4FF' }}>
            Habilidades
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(SKILLS).map(([cat, skills]) => (
              <div key={cat}>
                <p className="text-xs font-mono tracking-wider uppercase mb-3" style={{ color: '#555555' }}>{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="text-xs px-3 py-1.5 rounded-full border font-mono"
                      style={{ borderColor: '#1A1A1A', color: '#aaaaaa' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Languages */}
        <motion.section initial="hidden" animate="show" custom={4} variants={fadeUp}>
          <p className="text-xs font-mono tracking-[0.4em] uppercase mb-8" style={{ color: '#00D4FF' }}>
            Idiomas
          </p>
          <div className="flex flex-wrap gap-4">
            {LANGS.map(({ lang: l, level }) => (
              <div key={l} className="flex items-center gap-3">
                <span className="text-base font-semibold" style={{ color: '#F2F0E9' }}>{l}</span>
                <span className="text-sm" style={{ color: '#555555' }}>{level}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <footer className="border-t px-8 py-8 text-center" style={{ borderColor: '#1A1A1A' }}>
        <p className="text-xs font-mono" style={{ color: '#1A1A1A' }}>juanlarraya.com.ar/cv</p>
      </footer>
    </main>
  );
}
