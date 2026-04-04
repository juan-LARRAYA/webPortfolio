'use client';

import SectionHeading from './ui/SectionHeading';
import ProjectGridCard from './ProjectGridCard';
import { useLang } from '@/lib/i18n/LangContext';

export default function Projects() {
  const { t } = useLang();

  return (
    <section id="proyectos" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)', margin: '0 var(--section-mx)' }}>
      <div className="max-w-2xl mx-auto">

        <div style={{ marginBottom: '5rem' }}>
          <SectionHeading>{t.projects.heading}</SectionHeading>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
          className="projects-grid">
          <ProjectGridCard
            name="Binexa"
            tag="Proyecto Web"
            description={t.projects.binexa}
            href="https://binexa.juanlarraya.com.ar"
            image="/images/projects/binexa.png"
          />
          <ProjectGridCard
            name="openVision"
            tag="IA · Computer Vision"
            description={t.projects.openVision}
            href="https://vision.juanlarraya.com.ar"
            image="/images/projects/OpenVision Demo.png"
            dark
          />
          <ProjectGridCard
            name="CentralMap"
            tag="Proyecto Web"
            description={t.projects.centralMap}
            href="https://centralmap.juanlarraya.com.ar"
            image="/images/projects/central_map.png"
          />
          <ProjectGridCard
            name="TPP CubeSat"
            tag="Hardware · Embebido"
            description={t.projects.tpp}
            href="https://github.com/juan-LARRAYA/TPP"
            image="/images/projects/TPP Photo 1.png"
            dark
          />
          <ProjectGridCard
            name="Linda"
            tag="Web3 · Mobile"
            description={t.projects.linda}
            href="https://github.com/OwnerOfJK/linda"
            image="/images/projects/linda.png"
            imgPosition="center"
          />
          <ProjectGridCard
            name="Votación Barrial"
            tag="Proyecto Web"
            description={t.projects.votacion}
            href="https://votacion.juanlarraya.com.ar"
            image="/images/projects/votacion-barrial.png"
            dark
          />
          <ProjectGridCard
            name="Voice 2 Text"
            tag="IA · Web"
            description={t.projects.voice2text}
            href="https://voice.juanlarraya.com.ar"
            image="/images/projects/voice2text.png"
            dark
          />
        </div>

      </div>
    </section>
  );
}
