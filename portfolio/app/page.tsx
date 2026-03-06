import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TrackVisit from './components/TrackVisit';

export default function Home() {
  return (
    <main style={{ background: 'var(--bg-dark)', minHeight: '100vh', position: 'relative' }}>
      <TrackVisit />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
