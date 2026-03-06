'use client';

import Reveal from './ui/Reveal';
import ProjectGridCard from './ProjectGridCard';

export default function Projects() {
  return (
    <section id="proyectos" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="mb-20">
          <Reveal>
            <h2 style={{ fontSize: 'clamp(4rem,12vw,11rem)', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.03em' }}>
              Proyectos.
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectGridCard
            name="Binexa"
            description="Conversor entre binario, decimal, hexadecimal y octal en tiempo real."
            href="https://conversor-juan.vercel.app"
            image="/images/projects/binexa.png"
          />
        </div>

      </div>
    </section>
  );
}
