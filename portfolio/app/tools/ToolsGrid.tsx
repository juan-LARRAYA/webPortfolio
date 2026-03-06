'use client';

import Link from 'next/link';

const TOOLS = [
  {
    id: 'binary-hex',
    label: 'Conversor de Bases',
    description: 'Convierte números entre binario, decimal, hexadecimal y octal en tiempo real. Ideal para trabajo con microcontroladores, registros y protocolos de comunicación.',
    tags: ['Electrónica', 'Microcontroladores', 'Programación'],
    status: 'live' as const,
    href: '/tools/binary-hex',
    color: '#00D4FF',
  },
  {
    id: 'pid',
    label: 'Simulador PID',
    description: 'Ajustá Kp, Ki y Kd y visualizá la respuesta del sistema de control en tiempo real. Útil para diseño de lazos de control en automatización industrial.',
    tags: ['Control', 'Automatización', 'PLC'],
    status: 'soon' as const,
    href: '#',
    color: '#F5A623',
  },
  {
    id: 'plc',
    label: 'Simulador PLC Ladder',
    description: 'Diseñá y simulá lógica de escalera (Ladder Logic) directamente en el navegador, sin necesidad de software de PLC.',
    tags: ['PLC', 'Siemens', 'Automatización'],
    status: 'soon' as const,
    href: '#',
    color: '#F5A623',
  },
  {
    id: 'io-excel',
    label: 'Generador de Listas IO',
    description: 'Generá automáticamente planillas Excel con listas de entradas/salidas de PLC a partir de datos ingresados. Formato compatible con TIA Portal.',
    tags: ['Excel', 'TIA Portal', 'IO List'],
    status: 'soon' as const,
    href: '#',
    color: '#555555',
  },
];

function ToolCard({ tool }: { tool: typeof TOOLS[number] }) {
  return (
    <Link
      href={tool.href}
      className="block p-7 rounded-sm border group transition-all duration-300"
      style={{ borderColor: '#1A1A1A', background: '#111111' }}
      onMouseEnter={(e) => {
        if (tool.status === 'live') {
          (e.currentTarget as HTMLElement).style.borderColor = tool.color;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${tool.color}22`;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#1A1A1A';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <span
          className="text-xs font-mono tracking-[0.2em] uppercase px-2 py-1 rounded-sm border"
          style={{
            color: tool.status === 'live' ? tool.color : '#555555',
            borderColor: tool.status === 'live' ? tool.color : '#1A1A1A',
            background: tool.status === 'live' ? `${tool.color}11` : 'transparent',
          }}
        >
          {tool.status === 'live' ? '● Live' : 'Próximamente'}
        </span>
        {tool.status === 'live' && (
          <span
            className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ color: tool.color }}
          >
            ↗
          </span>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#F2F0E9' }}>
        {tool.label}
      </h2>
      <p className="text-sm leading-relaxed mb-5" style={{ color: '#555555' }}>
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-1 rounded-sm border"
            style={{ borderColor: '#1A1A1A', color: '#555555' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function ToolsGrid() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#F2F0E9' }}>
      {/* Header */}
      <div
        className="border-b px-8 py-5 flex items-center justify-between"
        style={{ borderColor: '#1A1A1A' }}
      >
        <Link
          href="/"
          className="text-sm font-mono tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ color: '#555555' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5A623'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555555'; }}
        >
          ← JCL
        </Link>
        <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: '#00D4FF' }}>
          Herramientas
        </span>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-20">
        <p className="text-xs font-mono tracking-[0.4em] uppercase mb-4" style={{ color: '#00D4FF' }}>
          Ingeniería en el navegador
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#F2F0E9' }}>
          Herramientas
        </h1>
        <p className="text-base mb-16 max-w-xl" style={{ color: '#555555' }}>
          Calculadoras, simuladores y generadores para electrónica y programación industrial. Sin instalaciones.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <footer
        className="border-t px-8 py-8 text-center"
        style={{ borderColor: '#1A1A1A' }}
      >
        <p className="text-xs font-mono" style={{ color: '#1A1A1A' }}>
          juanlarraya.com.ar/tools
        </p>
      </footer>
    </main>
  );
}
