'use client';

import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';
import { IconLinkedIn, IconGitHub, IconMail } from './icons';

export default function Contact() {
  return (
    <section id="contacto" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="mb-16 text-center">
          <Reveal>
            <h2 style={{ fontSize: 'clamp(4rem,13.5vw,12.5rem)', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.03em' }}>
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
