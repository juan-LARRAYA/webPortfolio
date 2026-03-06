'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Nav() {
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
