'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MaskedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function MaskedSection({ children, className = '' }: MaskedSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverTime, setHoverTime] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (hoverTime > 0) {
      interval = setInterval(() => {
        setHoverTime((prev) => {
          const newTime = prev + 100;
          if (newTime >= 2000) {
            setIsRevealed(true);
          }
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [hoverTime]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (hoverTime === 0) {
      setHoverTime(100);
    }
  };

  const handleMouseLeave = () => {
    setHoverTime(0);
    setIsRevealed(false);
  };

  const maskStyle = isRevealed
    ? {}
    : {
        maskImage: `radial-gradient(circle ${100 + (hoverTime / 2000) * 200}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
        WebkitMaskImage: `radial-gradient(circle ${100 + (hoverTime / 2000) * 200}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
      };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="absolute inset-0 bg-primary-medium backdrop-blur-xl transition-all duration-300"
        style={{
          opacity: isRevealed ? 0 : 1 - hoverTime / 2000,
        }}
      />

      <div style={maskStyle} className="relative z-10">
        {children}
      </div>

      {!isRevealed && hoverTime > 0 && (
        <div className="absolute top-4 right-4 text-accent-yellow text-sm z-20">
          Mantén el cursor... {Math.floor((2000 - hoverTime) / 1000)}s
        </div>
      )}
    </motion.div>
  );
}
