'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { splitText } from '@/utils/textSplitter';

interface DeformableHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function DeformableHeading({ text, className = '', style }: DeformableHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { parts } = splitText(text, 'chars');

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    // Cache positions once (recompute on resize)
    let charPositions: { x: number; y: number }[] = [];
    const cachePositions = () => {
      charPositions = Array.from(chars).map((char) => {
        const rect = (char as HTMLElement).getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };
    cachePositions();
    window.addEventListener('resize', cachePositions);

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      chars.forEach((char, index) => {
        const pos = charPositions[index];
        if (!pos) return;

        const distanceX = mouseX - pos.x;
        const distanceY = mouseY - pos.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 200) {
          const strength = (200 - distance) / 200;
          const offsetX = (distanceX / distance) * strength * 20;
          const offsetY = (distanceY / distance) * strength * 20;
          const rotation = (distanceX / distance) * strength * 15;

          gsap.to(char, { x: offsetX, y: offsetY, rotation, duration: 0.5, ease: 'power2.out' });
        } else {
          gsap.to(char, { x: 0, y: 0, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        }
      });
      rafId = requestAnimationFrame(animate);
    };

    // Delay GSAP loop until Framer Motion entrance animation finishes
    // Max FM duration: 0.7s + (nChars * 0.008s stagger) ≈ 900ms
    const startTimeout = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
      window.addEventListener('mousemove', handleMouseMove);
    }, 950);

    return () => {
      clearTimeout(startTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', cachePositions);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-visible ${className}`} style={style}>
      {parts.map((char, index) => (
        <motion.span
          key={index}
          className="char inline-block will-change-transform"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: index * 0.008,
            ease: [0.33, 1, 0.68, 1],
          }}
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.15 },
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'center center',
            perspective: '1000px',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}
