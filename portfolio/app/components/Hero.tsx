'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DeformableHeading from './ui/DeformableHeading';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

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
          className="text-xl font-mono tracking-[0.4em]  mb-12 text-center"
          style={{ color: 'var(--accent-cyan)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
        Exploring Tech, Music & Economics      
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

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: '2rem', marginTop: '2rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >

          <motion.a
            href="#proyectos"
            style={{ background: '#F5A623', color: '#080808', borderRadius: '20px', padding: '14px 32px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', display: 'inline-block' }}
            whileHover={{ scale: 1.04, background: '#e8971f' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Ver Herramientas
          </motion.a>
          <motion.a
            href="#sobre-mi"
            style={{ borderColor: 'rgba(242,240,233,0.25)', color: 'rgba(242,240,233,0.7)', background: 'transparent', borderRadius: '20px', padding: '14px 32px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', display: 'inline-block', border: '1px solid rgba(242,240,233,0.25)' }}
            whileHover={{ borderColor: 'rgba(242,240,233,0.7)', color: '#F2F0E9', background: 'rgba(242,240,233,0.06)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Conocer más
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
