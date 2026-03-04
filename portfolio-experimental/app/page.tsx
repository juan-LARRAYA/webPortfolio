'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DeformableHeading from './components/Hero/DeformableHeading';
import Image from 'next/image';
import Link from 'next/link';

// ── Reveal helper ──────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav() {
  const links = [
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Herramientas', href: '/tools' },
    { label: 'CV', href: '/cv' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.95) 0%, transparent 100%)' }}
    >
      <Link href="/" className="text-sm font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--accent-amber)' }}>
        JCL
      </Link>
      <ul className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <motion.a
              href={l.href}
              className="text-sm tracking-wide transition-colors duration-200"
              style={{ color: 'var(--accent-muted)' }}
              whileHover={{ color: '#F2F0E9' }}
            >
              {l.label}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pcb-grid px-8 pt-24 pb-20">
      {/* Ambient blobs */}
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto" style={{ y, opacity }}>
        {/* Eyebrow */}
        <motion.p
          className="text-xs font-mono tracking-[0.4em] uppercase mb-10 text-center"
          style={{ color: 'var(--accent-cyan)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ingeniería Electrónica · FIUBA · Buenos Aires
        </motion.p>

        {/* Name */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <DeformableHeading
            text="Juan Cruz"
            className="text-[clamp(3.5rem,11vw,10rem)] font-bold leading-[0.9] tracking-tight glow-amber text-accent-amber text-center"
          />
          <DeformableHeading
            text="Larraya"
            className="text-[clamp(3.5rem,11vw,10rem)] font-bold leading-[0.9] tracking-tight text-accent-text text-center"
          />
        </motion.div>

        {/* Featured project */}
        <motion.div
          className="mt-10 w-full max-w-xs mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ProjectGridCard
            title="Binexa"
            description="Conversor entre binario, decimal, hexadecimal y octal en tiempo real."
            href="https://conversor-juan.vercel.app"
            tags={['Electrónica', 'Web']}
            status="live"
            faviconUrl="https://conversor-juan.vercel.app/favicon.ico"
          />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            href="/tools"
            className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border"
            style={{ borderColor: 'rgba(0,212,255,0.6)', color: '#F2F0E9', background: 'rgba(0,212,255,0.10)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,212,255,0.18)'; el.style.borderColor = 'rgba(0,212,255,0.9)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,212,255,0.10)'; el.style.borderColor = 'rgba(0,212,255,0.6)'; }}
          >
            Ver Herramientas
          </Link>
          <a
            href="#sobre-mi"
            className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border"
            style={{ borderColor: 'rgba(242,240,233,0.15)', color: 'rgba(242,240,233,0.6)', background: 'rgba(242,240,233,0.04)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(242,240,233,0.4)'; el.style.color = '#F2F0E9'; el.style.background = 'rgba(242,240,233,0.08)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(242,240,233,0.15)'; el.style.color = 'rgba(242,240,233,0.6)'; el.style.background = 'rgba(242,240,233,0.04)'; }}
          >
            Conocer más
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div className="w-12 h-px" style={{ background: 'var(--accent-cyan)' }}
          animate={{ scaleX: [0, 1, 0], originX: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--accent-muted)' }}>scroll</span>
      </motion.div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
  const skills = ['Python', 'TIA Portal', 'AutoCAD', 'Power Automate', 'Next.js', 'TypeScript', 'SQL'];

  return (
    <section id="sobre-mi" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Giant staggered heading */}
        <div className="mb-24">
          <Reveal>
            <h2 style={{
              fontSize: 'clamp(2.8rem,8vw,7.5rem)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
            }}>
              Estudiante de
            </h2>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 style={{
              fontSize: 'clamp(2.8rem,8vw,7.5rem)',
              color: 'var(--accent-amber)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
            }}>
              Ingeniería
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <h2 style={{
              fontSize: 'clamp(2.8rem,8vw,7.5rem)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
            }}>
              Electrónica.
            </h2>
          </Reveal>
        </div>

        {/* Editorial split: text + photo */}
        <div className="grid md:grid-cols-[1fr_240px] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p style={{ color: '#aaaaaa', lineHeight: '1.9', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '26rem' }}>
              Apasionado por la automatización industrial y las herramientas que resuelven
              problemas reales. Vivo en Recoleta, Buenos Aires. Busco la intersección entre
              electrónica, programación y diseño.
            </p>
            <p className="text-sm font-mono tracking-wide" style={{ color: 'var(--accent-muted)' }}>
              {skills.join(' · ')}
            </p>
          </motion.div>

          {/* Photo — rectangular, editorial */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '3/4', boxShadow: '0 0 80px rgba(245,166,35,0.07)' }}>
              <Image src="/images/Carnet.jpg" alt="Juan Cruz Larraya" fill className="object-cover" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ── Tools ──────────────────────────────────────────────────────────────────────
const TOOLS_LIST = [
  { id: '01', label: 'Conversor de Bases', desc: 'Binario · Decimal · Hexadecimal · Octal', href: '/tools/binary-hex', live: true },
  { id: '02', label: 'Simulador PID', desc: 'Control de lazo cerrado — Kp, Ki, Kd', href: '#', live: false },
  { id: '03', label: 'Simulador PLC Ladder', desc: 'Lógica de escalera en el navegador', href: '#', live: false },
  { id: '04', label: 'Generador de Listas IO', desc: 'Excel para TIA Portal desde tabla', href: '#', live: false },
];

function Tools() {
  return (
    <section className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-20">
          <Reveal>
            <h2 style={{
              fontSize: 'clamp(4rem,12vw,11rem)',
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}>
              Laboratorio.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg" style={{ color: 'var(--accent-muted)' }}>
              Herramientas de ingeniería que corren en el navegador.
            </p>
          </Reveal>
        </div>

        {/* List */}
        <div>
          {TOOLS_LIST.filter((t) => t.live).map((tool, i) => (
            <motion.a
              key={tool.id}
              href={tool.href}
              className="group flex items-center justify-between py-7 border-t"
              style={{ borderColor: 'var(--border-color)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover="hover"
            >
              <div className="flex items-baseline gap-8 min-w-0">
                <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--border-color)' }}>{tool.id}</span>
                <div className="min-w-0">
                  <motion.span
                    className="block font-semibold"
                    style={{
                      fontSize: 'clamp(1.2rem,2.8vw,1.9rem)',
                      color: tool.live ? 'var(--text-primary)' : 'var(--accent-muted)',
                      lineHeight: 1.2,
                    }}
                    variants={{ hover: { x: 10 } }}
                    transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {tool.label}
                  </motion.span>
                  <span className="block text-sm mt-0.5" style={{ color: 'var(--accent-muted)' }}>{tool.desc}</span>
                </div>
              </div>
              <motion.span
                className="text-xl shrink-0 ml-6"
                style={{ color: tool.live ? 'var(--accent-cyan)' : 'var(--border-color)' }}
                variants={{ hover: { x: 5, y: -5 } }}
                transition={{ duration: 0.25 }}
              >↗</motion.span>
            </motion.a>
          ))}
          <div className="border-t" style={{ borderColor: 'var(--border-color)' }} />
        </div>

        <motion.a
          href="/tools"
          className="mt-10 inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase"
          style={{ color: 'var(--accent-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '2px' }}
          whileHover={{ color: 'var(--accent-cyan)', borderColor: 'var(--accent-cyan)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Ver todas →
        </motion.a>

      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────────
function Experience() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [pdfStatus, setPdfStatus] = useState<'checking' | 'ok' | 'missing'>('checking');

  useEffect(() => {
    setPdfStatus('checking');
    fetch(`/cv/cv-${lang}.pdf`, { method: 'HEAD' })
      .then((r) => setPdfStatus(r.ok ? 'ok' : 'missing'))
      .catch(() => setPdfStatus('missing'));
  }, [lang]);

  return (
    <section id="experiencia" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <Reveal>
            <h2 style={{
              fontSize: 'clamp(4rem,12vw,11rem)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}>
              Trayectoria.
            </h2>
          </Reveal>
        </div>

        {/* Controls row: toggle + download */}
        <div className="flex items-center justify-between mb-10">
          {/* Animated pill toggle */}
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

          {/* Download */}
          <a
            href={`/cv/cv-${lang}.pdf`}
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
              src={`/cv/cv-${lang}.pdf`}
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

// ── ProjectGridCard ────────────────────────────────────────────────────────────
interface ProjectGridCardProps {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  status?: 'live' | 'soon' | 'wip';
  faviconUrl?: string;
}

function ProjectGridCard({ title, description, href, tags = [], status = 'live', faviconUrl }: ProjectGridCardProps) {
  const isExternal = href.startsWith('http');
  const isLive = status === 'live';

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex flex-col p-6 rounded-2xl border transition-colors duration-300"
      style={{ borderColor: 'var(--border-color)', background: 'var(--bg-medium)', minHeight: '220px' }}
      whileHover={{ borderColor: '#333333', y: -6 }}
      transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        {faviconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faviconUrl}
            alt={title}
            width={36}
            height={36}
            className="rounded-xl"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-9 h-9 rounded-xl" style={{ background: 'var(--border-color)' }} />
        )}
        {isLive ? (
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--accent-cyan)' }}>● Live</span>
        ) : status === 'wip' ? (
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--accent-muted)' }}>En progreso</span>
        ) : (
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--border-color)' }}>Próximamente</span>
        )}
      </div>

      {/* Title + description */}
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--accent-muted)' }}>{description}</p>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wide" style={{ color: 'var(--border-color)' }}>
              {tag}
            </span>
          ))}
        </div>
        <motion.span
          className="text-lg shrink-0"
          style={{ color: isLive ? 'var(--accent-cyan)' : 'var(--border-color)' }}
          variants={{ hover: { x: 3, y: -3 } }}
        >↗</motion.span>
      </div>
    </motion.a>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="proyectos" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="mb-20">
          <Reveal>
            <h2 style={{
              fontSize: 'clamp(4rem,12vw,11rem)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}>
              Proyectos.
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectGridCard
            title="Binexa"
            description="Conversor entre binario, decimal, hexadecimal y octal en tiempo real. Primera herramienta del laboratorio."
            href="https://conversor-juan.vercel.app"
            tags={['Electrónica', 'Web']}
            status="live"
            faviconUrl="https://conversor-juan.vercel.app/favicon.ico"
          />
          {/* More projects coming soon */}
        </div>

      </div>
    </section>
  );
}

// ── SVG Icons ──────────────────────────────────────────────────────────────────
function IconLinkedIn({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGitHub({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconMail({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contacto" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="mb-16 text-center">
          <Reveal>
            <h2 style={{
              fontSize: 'clamp(4rem,13.5vw,12.5rem)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}>
              ¿Hablamos?
            </h2>
          </Reveal>
        </div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <motion.a
            href="mailto:juanlarraya00@gmail.com"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border transition-all duration-300"
            style={{ borderColor: 'rgba(242,240,233,0.15)', color: 'rgba(242,240,233,0.7)', background: 'rgba(242,240,233,0.04)', backdropFilter: 'blur(8px)' }}
            whileHover={{ borderColor: 'rgba(242,240,233,0.4)', color: '#F2F0E9', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <IconMail /><span className="text-sm font-medium">juanlarraya00@gmail.com</span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/juan-cruz-larraya"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border transition-all duration-300"
            style={{ borderColor: 'rgba(0,119,181,0.4)', color: 'rgba(242,240,233,0.6)', background: 'rgba(0,119,181,0.06)', backdropFilter: 'blur(8px)' }}
            whileHover={{ borderColor: 'rgba(0,119,181,0.8)', color: '#F2F0E9', background: 'rgba(0,119,181,0.12)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <IconLinkedIn /><span className="text-sm font-medium">LinkedIn</span>
          </motion.a>

          <motion.a
            href="https://github.com/juan-LARRAYA"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border transition-all duration-300"
            style={{ borderColor: 'rgba(242,240,233,0.12)', color: 'rgba(242,240,233,0.6)', background: 'rgba(242,240,233,0.03)', backdropFilter: 'blur(8px)' }}
            whileHover={{ borderColor: 'rgba(242,240,233,0.35)', color: '#F2F0E9', background: 'rgba(242,240,233,0.08)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <IconGitHub /><span className="text-sm font-medium">GitHub</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono" style={{ color: 'var(--accent-muted)' }}>© 2025 Juan Cruz Larraya</p>
        <p className="text-xs font-mono" style={{ color: 'var(--border-color)' }}>Next.js · TypeScript · Tailwind · Framer Motion · GSAP</p>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <About />
      <Tools />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
