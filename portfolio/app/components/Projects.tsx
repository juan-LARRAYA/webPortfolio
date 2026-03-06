'use client';

import SectionHeading from './ui/SectionHeading';
import ProjectGridCard from './ProjectGridCard';

export default function Projects() {
  return (
    <section id="proyectos" className="pt-40 pb-36 px-8 border-t" style={{ borderColor: 'var(--border-color)', margin: '0 var(--section-mx)' }}>
      <div className="max-w-2xl mx-auto">

        <div style={{ marginBottom: '5rem' }}>
          <SectionHeading>Proyectos.</SectionHeading>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
          className="projects-grid">
          <ProjectGridCard
            name="Binexa"
            tag="Proyecto Web"
            description="Conversor entre binario, decimal, hexadecimal y octal en tiempo real."
            href="https://conversor-juan.vercel.app"
            image="/images/projects/binexa.png"
          />
          <ProjectGridCard
            name="openVision"
            tag="IA · Computer Vision"
            description="Herramienta minimalista para testear modelos de visión computacional en el browser."
            href="https://github.com/juan-LARRAYA/openVision"
            image="/images/projects/OpenVision Demo.png"
            dark
          />
          <ProjectGridCard
            name="CentralMap"
            tag="Proyecto Web"
            description="Calcula el centro geográfico entre múltiples direcciones y lo visualiza en un mapa interactivo."
            href="https://github.com/juan-LARRAYA/CentralMap"
            image="/images/projects/central_map.png"
          />
          <ProjectGridCard
            name="TPP CubeSat"
            tag="Hardware · Embebido"
            description="Sistema de potencia eléctrica para satélites CubeSat con gestión de baterías en C/STM32."
            href="https://github.com/juan-LARRAYA/TPP"
            image="/images/projects/TPP Photo 1.png"
            dark
          />
          <ProjectGridCard
            name="Linda"
            tag="Web3 · Mobile"
            description="App de localización en tiempo real con privacidad garantizada mediante TEE y blockchain."
            href="https://github.com/OwnerOfJK/linda"
            image="/images/projects/linda.png"
            imgPosition="center"
          />
          <ProjectGridCard
            name="Votación Barrial"
            tag="Proyecto Web"
            description="Sistema de votación para asambleas barriales con resultados en tiempo real."
            href="https://github.com/juan-LARRAYA/votacion-barrial"
            image="/images/projects/votacion-barrial.png"
            dark
          />
        </div>

      </div>
    </section>
  );
}
