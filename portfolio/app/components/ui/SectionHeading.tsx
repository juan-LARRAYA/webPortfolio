'use client';

import Reveal from './Reveal';

export default function SectionHeading({
  children,
  align = 'left',
  delay = 0,
}: {
  children: React.ReactNode;
  align?: 'left' | 'center';
  delay?: number;
}) {
  return (
    <div style={{ textAlign: align }}>
      <Reveal delay={delay}>
        <h2 style={{ fontSize: 'clamp(1.8rem,4.5vw,6.5rem)', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.03em' }}>
          {children}
        </h2>
      </Reveal>
    </div>
  );
}
