'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from './ui/SectionHeading';
import { useLang } from '@/lib/i18n/LangContext';

export default function About() {
  const { t } = useLang();
  const p = t.about.headingParts;

  return (
    <section id="sobre-mi" className="px-8 border-t" style={{ borderColor: 'var(--border-color)', paddingTop: '2rem', paddingBottom: '5rem', margin: '0 var(--section-mx)', borderRadius: '1rem' }}>
      <div className="max-w-2xl mx-auto">

        {/* Giant staggered heading */}
        <div style={{ marginBottom: '4rem', marginTop: '3rem' }}>
          <SectionHeading delay={0.14}>
            {p.prefix}{' '}
            <span style={{ color: 'var(--accent-amber)' }}>{p.word1}</span>{' '}
            {p.mid}{' '}
            <span style={{ color: 'var(--accent-amber)' }}>{p.word2}</span>{' '}
            {p.mid2}{' '}
            <span style={{ color: 'var(--accent-amber)' }}>{p.word3}</span>.
          </SectionHeading>
        </div>

        {/* Photo + bio */}
        <div className="about-bio-layout" style={{ display: 'flex', alignItems: 'flex-start', gap: '3rem', paddingLeft: '2rem' }}>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="about-photo"
            style={{ flexShrink: 0, width: '330px', padding: '1rem' }}
          >
            <div className="relative overflow-hidden"
              style={{ aspectRatio: '3/4', maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)' }}>
              <Image src="/images/carnet_black.png" alt="Juan Cruz Larraya" fill sizes="(max-width: 768px) 200px, 330px" className="object-cover" />
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
              {t.about.bio1}
            </p>
            <p style={{ lineHeight: '1.8', marginBottom: '1.1rem' }}>
              {t.about.bio2}
            </p>
            <p className="font-mono tracking-wide" style={{ color: 'var(--text-primary)' }}>
              {t.about.skills.join(' · ')}
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
