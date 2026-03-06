'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { splitText } from '@/utils/textSplitter';

interface DeformableHeadingProps {
  text: string;
  className?: string;
}

export default function DeformableHeading({ text, className = '' }: DeformableHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { parts } = splitText(text, 'chars');

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    // Mouse move effect - letters follow cursor with delay
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      chars.forEach((char, index) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distanceX = clientX - charX;
        const distanceY = clientY - charY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 200) {
          const strength = (200 - distance) / 200;
          const offsetX = (distanceX / distance) * strength * 20;
          const offsetY = (distanceY / distance) * strength * 20;
          const rotation = (distanceX / distance) * strength * 15;

          gsap.to(char, {
            x: offsetX,
            y: offsetY,
            rotation: rotation,
            duration: 0.5,
            ease: 'power2.out',
          });
        } else {
          gsap.to(char, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-visible ${className}`}>
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
            color: '#F2D478',
            textShadow: '0 0 20px rgba(242, 212, 120, 0.6)',
            transition: { duration: 0.2 },
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
