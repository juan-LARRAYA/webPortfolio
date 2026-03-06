'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  name: string;
  description: string;
  href: string;
  image: string;
}

export default function ProjectGridCard({ name, description, href, image }: ProjectCardProps) {
  const isExternal = href.startsWith('http');

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex flex-col rounded-2xl border overflow-hidden transition-colors duration-300"
      style={{ borderColor: 'var(--border-color)', background: 'var(--bg-medium)' }}
      whileHover={{ borderColor: '#333333', y: -6 }}
      transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <div className="relative w-full aspect-video">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{name}</h3>
          <motion.span
            className="text-lg shrink-0 ml-3"
            style={{ color: 'var(--accent-cyan)' }}
            variants={{ hover: { x: 3, y: -3 } }}
          >↗</motion.span>
        </div>
        <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--accent-muted)' }}>{description}</p>
      </div>
    </motion.a>
  );
}
