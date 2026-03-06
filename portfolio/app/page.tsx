import Hero from './components/Hero';
import About from './components/About';
import Tools from './components/Tools';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <Hero />
      <About />
      <Tools />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
