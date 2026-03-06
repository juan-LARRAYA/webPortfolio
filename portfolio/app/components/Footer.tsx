export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono" style={{ color: 'var(--accent-muted)' }}>© 2025 Juan Cruz Larraya</p>
        <p className="text-xs font-mono" style={{ color: 'var(--border-color)' }}>Next.js · TypeScript · Tailwind · Framer Motion · GSAP</p>
      </div>
    </footer>
  );
}
