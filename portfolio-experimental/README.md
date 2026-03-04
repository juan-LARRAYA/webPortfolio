# Portfolio Experimental - Juan Cruz Larraya

Portfolio interactivo experimental construido con las tecnologías web más modernas.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS 4
- **Animaciones:** Framer Motion + GSAP
- **Gráficos:** WebGPU (con fallback a Canvas API)

## ✨ Features

### Feature A - Textos Deformables
- Textos que reaccionan al hover, drag y movimiento del mouse
- Split por caracteres y palabras
- Animaciones con GSAP Draggable y Framer Motion
- Efectos de skew, rotate y scale

### Feature B - Contenido Oculto Revelable
- **RevealOnDrag:** Arrastra para revelar contenido oculto
- **MaskedSection:** Mantén hover para descubrir contenido
- **ClipPathReveal:** Scroll lento para revelar gradualmente

### Feature C - Cursor Experimental
- Cursor personalizado que reacciona a diferentes elementos
- Cambios de tamaño, color y forma según contexto
- Efectos de blend mode y animaciones suaves

### Feature D - Collage Artístico
- Sube tu foto y crea un collage artístico con Juan
- Múltiples efectos de blend (screen, multiply, overlay, difference)
- Procesamiento con Canvas API
- Efectos de chromatic aberration y glitch
- Descarga el resultado

## 🛠️ Instalación

\`\`\`bash
npm install
\`\`\`

## 🏃 Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎨 Paleta de Colores

- **Fondo oscuro:** #1C1B18
- **Fondo medio:** #2E2A24
- **Bordes:** #3A372F
- **Texto principal:** #E2E0D2
- **Acento dorado:** #D3B56C
- **Acento amarillo:** #F2D478

## 📝 Estructura del Proyecto

\`\`\`
portfolio-experimental/
├── app/
│   ├── components/
│   │   ├── Hero/
│   │   │   ├── DeformableHeading.tsx
│   │   │   └── DraggableText.tsx
│   │   ├── HiddenContent/
│   │   │   ├── RevealOnDrag.tsx
│   │   │   ├── MaskedSection.tsx
│   │   │   └── ClipPathReveal.tsx
│   │   ├── Cursor/
│   │   │   └── ExperimentalCursor.tsx
│   │   └── WebGPU/
│   │       ├── ImageAnalyzer.tsx
│   │       ├── useWebGPU.ts
│   │       └── shaders/
│   │           └── imageEffect.wgsl
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── images/
├── utils/
│   └── textSplitter.ts
└── ...config files
\`\`\`

## 🌐 Deploy

El proyecto está optimizado para deploy en Vercel:

\`\`\`bash
vercel
\`\`\`

## 📧 Contacto

Juan Cruz Larraya - [jlarraya@fi.uba.ar](mailto:jlarraya@fi.uba.ar)

## 📄 Licencia

© 2024 Juan Cruz Larraya. Todos los derechos reservados.
