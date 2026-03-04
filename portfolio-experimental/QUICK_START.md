# 🚀 Quick Start - Portfolio Experimental

## Inicio Rápido

### 1. Instalar Dependencias (si es necesario)

```bash
npm install
```

### 2. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

### 3. Abrir en el Navegador

Visita: **http://localhost:3000**

---

## Estructura del Proyecto

```
portfolio-experimental/
├── app/
│   ├── components/          # Todos los componentes React
│   │   ├── Hero/           # Feature A: Textos deformables
│   │   ├── HiddenContent/  # Feature B: Contenido oculto
│   │   ├── Cursor/         # Feature C: Cursor experimental
│   │   └── WebGPU/         # Feature D: Collage artístico
│   ├── globals.css         # Estilos globales + Tailwind
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página principal
├── public/images/          # Imágenes estáticas
├── utils/                  # Utilidades (textSplitter)
└── README.md              # Documentación principal
```

---

## Features Interactivas

### 🎨 Feature A - Textos Deformables
**Ubicación:** Sección Hero (primera pantalla)
- **Hover** sobre letras para verlas escalar y cambiar color
- **Mueve el mouse** cerca del título para ver las letras alejarse
- **Arrastra** las palabras del subtítulo

### 🔍 Feature B - Contenido Oculto
**Ubicación:** Secciones About, Experience y Projects

1. **About Section:**
   - **Arrastra horizontalmente** la tarjeta para revelar contenido secreto

2. **Experience Section:**
   - **Mantén el hover** sobre la sección por 2 segundos
   - **Mueve el mouse** para ver el efecto de máscara circular

3. **Projects Section:**
   - **Scroll lentamente** para revelar los proyectos
   - Si scrolleas rápido, el contenido permanece oculto

### 🎯 Feature C - Cursor Personalizado
**Ubicación:** Todo el sitio
- Observa cómo el cursor cambia según el elemento:
  - Pequeño y sutil por defecto
  - Grande y dorado en hover sobre links/botones
  - Anillo en hover sobre imágenes
  - Pequeño al hacer drag

### 🖼️ Feature D - Collage Artístico
**Ubicación:** Sección Interactive Collage

1. Click en **"Seleccionar imagen"**
2. Elige una foto tuya
3. Selecciona un estilo artístico:
   - **Screen:** Tonos brillantes superpuestos
   - **Multiply:** Colores multiplicados y profundos
   - **Overlay:** Mezcla equilibrada con contraste
   - **Difference:** Diferencia de colores invertidos
4. Click en **"✨ Generar Collage"**
5. **Descarga** el resultado

---

## Navegación del Sitio

- **Hero:** Presentación con textos interactivos
- **About:** Información personal con contenido revelable
- **Experience:** Experiencia laboral con máscara
- **Projects:** Proyectos con scroll reveal
- **Collage:** Creación de collage artístico
- **Contact:** Links a LinkedIn y GitHub
- **Footer:** Información y créditos

---

## Tecnologías Usadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **TailwindCSS 4** - Estilos utility-first
- **Framer Motion** - Animaciones declarativas
- **GSAP** - Animaciones avanzadas y draggable
- **WebGPU** - Gráficos de alto rendimiento (con fallback a Canvas)

---

## Build para Producción

```bash
# Crear build optimizado
npm run build

# Ejecutar build
npm start
```

---

## Deploy en Vercel

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Deploy
vercel
```

---

## Troubleshooting

### El cursor no se ve
- Verifica que `cursor: none` esté en globals.css
- Algunos navegadores pueden bloquear custom cursors

### WebGPU no funciona
- **Normal:** WebGPU aún no está disponible en todos los navegadores
- **Fallback:** El proyecto usa Canvas API automáticamente
- **Navegadores compatibles:** Chrome/Edge 113+, Safari 18+ (experimental)

### GSAP Draggable no funciona
- Verifica que hayas importado de `gsap/all`
- Asegúrate de que `gsap.registerPlugin(Draggable)` se ejecute en cliente

### Build falla
- Ejecuta `npm install` de nuevo
- Verifica que tengas Node.js 18+ instalado
- Elimina `.next` y `node_modules`, luego reinstala

---

## Soporte de Navegadores

| Navegador | Versión Mínima | Notas |
|-----------|----------------|-------|
| Chrome    | 90+            | ✅ Completo |
| Firefox   | 88+            | ✅ Completo (sin WebGPU) |
| Safari    | 14+            | ✅ Completo (WebGPU experimental) |
| Edge      | 90+            | ✅ Completo |

---

## Contacto

**Juan Cruz Larraya**
- Email: jlarraya@fi.uba.ar
- LinkedIn: [juan-cruz-larraya](https://www.linkedin.com/in/juan-cruz-larraya)
- GitHub: [juan-LARRAYA](https://github.com/juan-LARRAYA)

---

**¡Disfruta explorando el portfolio experimental!** 🎉
