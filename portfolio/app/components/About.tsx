'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Reveal from './ui/Reveal';

export default function About() {
  const skills = ['Python', 'TIA Portal', 'AutoCAD', 'Power Automate', 'Next.js', 'TypeScript', 'SQL'];

  return (
    <section id="sobre-mi" className="px-8 border-t" style={{ borderColor: 'var(--border-color)', paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="max-w-2xl mx-auto">

        {/* Giant staggered heading */}
        <div style={{ marginBottom: '4rem', marginTop: '3rem' }}>

          <Reveal delay={0.14}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4.5vw,6.5rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
              Apasionado por{' '}
              <span style={{ color: 'var(--accent-amber)' }}>herramientas</span>{' '}
              que{' '}
              <span style={{ color: 'var(--accent-amber)' }}>resuelven</span>{' '}
              problemas{' '}
              <span style={{ color: 'var(--accent-amber)' }}>reales</span>.
            </h2>
          </Reveal>
        </div>

        {/* Photo + bio */}
        <div className="flex items-start" style={{ gap: '3rem', paddingLeft: '2rem' }}>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{ flexShrink: 0, width: '180px', padding: '1rem' }}
          >
            <div className="relative overflow-hidden"
              style={{ aspectRatio: '3/4', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)' }}>
              <Image src="/images/carnet_black.png" alt="Juan Cruz Larraya" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18 }}
            style={{ fontSize: '1.6rem', fontWeight: 500, color: '#f1eded' }}
          >
            <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
              Desde muy joven me formé sin saberlo en ingeniería, con un fuerte interés en la mecánica
              automotriz, lo que despertó mi pasión por la física y la tecnología. Trabajé en proyectos de desarrollo
              de software, diseño de circuitos electrónicos, sistemas de control y reconocimiento de imagenes.
            </p>
            <p style={{ lineHeight: '1.8', marginBottom: '1.1rem' }}>
              Actualmente soy ingeniero electrónico graduado en la FIUBA y me dedico al desarrollo de software para
              automatización industrial y sistemas IIoT.
            </p>
            <p className="font-mono tracking-wide" style={{ color: 'var(--text-primary)' }}>
              {skills.join(' · ')}
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
