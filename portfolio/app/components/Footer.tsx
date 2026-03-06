export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono" style={{ color: 'var(--accent-muted)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>© 2025 Juan Cruz Larraya</p>

        <p className="text-xs font-mono" style={{ color: 'var(--accent-muted)', marginBottom: '0.5rem' }}>Next.js · TypeScript · Tailwind · Framer Motion · GSAP</p>
      </div>
    </footer>
  );
}
