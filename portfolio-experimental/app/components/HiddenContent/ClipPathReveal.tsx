'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ClipPathRevealProps {
  children: React.ReactNode;
  className?: string;
  revealDirection?: 'left' | 'right' | 'top' | 'bottom';
}

export default function ClipPathReveal({
  children,
  className = '',
  revealDirection = 'right',
}: ClipPathRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Detect scroll speed
  useEffect(() => {
    let lastTime = Date.now();
    let lastY = window.scrollY;

    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const deltaTime = now - lastTime;
      const deltaY = Math.abs(currentY - lastY);

      const speed = deltaY / deltaTime;
      setScrollSpeed(speed);

      lastTime = now;
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only reveal on slow scroll (speed < 0.5)
  const isSlowScroll = scrollSpeed > 0 && scrollSpeed < 0.5;

  const clipPathMap = {
    left: useTransform(
      scrollYProgress,
      [0, 1],
      ['polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
    ),
    right: useTransform(
      scrollYProgress,
      [0, 1],
      ['polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
    ),
    top: useTransform(
      scrollYProgress,
      [0, 1],
      ['polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
    ),
    bottom: useTransform(
      scrollYProgress,
      [0, 1],
      ['polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)']
    ),
  };

  const clipPath = clipPathMap[revealDirection];

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          clipPath: isSlowScroll ? clipPath : 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {!isSlowScroll && scrollYProgress.get() > 0 && scrollYProgress.get() < 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/80 backdrop-blur-sm">
          <p className="text-accent-yellow text-lg">Desplázate lentamente para revelar</p>
        </div>
      )}
    </div>
  );
}
