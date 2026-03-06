'use client';

import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';

const TOOLS_LIST = [
  { id: '01', label: 'Conversor de Bases', desc: 'Binario · Decimal · Hexadecimal · Octal', href: '/tools/binary-hex', live: true },
  { id: '02', label: 'Simulador PID', desc: 'Control de lazo cerrado — Kp, Ki, Kd', href: '#', live: false },
  { id: '03', label: 'Simulador PLC Ladder', desc: 'Lógica de escalera en el navegador', href: '#', live: false },
  { id: '04', label: 'Generador de Listas IO', desc: 'Excel para TIA Portal desde tabla', href: '#', live: false },
];

export default function Tools() {
  return (
    <section className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="mb-20">
          <Reveal>
            <h2 style={{ fontSize: 'clamp(4rem,12vw,11rem)', color: 'var(--accent-cyan)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.03em' }}>
              Laboratorio.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg" style={{ color: 'var(--accent-muted)' }}>
              Herramientas de ingeniería que corren en el navegador.
            </p>
          </Reveal>
        </div>

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
                    style={{ fontSize: 'clamp(1.2rem,2.8vw,1.9rem)', color: tool.live ? 'var(--text-primary)' : 'var(--accent-muted)', lineHeight: 1.2 }}
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
