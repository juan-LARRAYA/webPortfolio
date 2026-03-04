'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { splitText } from '@/utils/textSplitter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface DraggableTextProps {
  text: string;
  className?: string;
  splitBy?: 'chars' | 'words';
}

export default function DraggableText({
  text,
  className = '',
  splitBy = 'words',
}: DraggableTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { parts } = splitText(text, splitBy);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const words = containerRef.current.querySelectorAll('.draggable-word');

    words.forEach((word) => {
      Draggable.create(word, {
        type: 'x,y',
        inertia: true,
        bounds: window,
        onDrag: function() {
          // Skew effect based on velocity
          const velocityX = this.getVelocity('x');
          const velocityY = this.getVelocity('y');

          gsap.to(word, {
            skewX: velocityX / 200,
            skewY: velocityY / 200,
            duration: 0.1,
          });
        },
        onDragEnd: function() {
          // Return to normal skew
          gsap.to(word, {
            skewX: 0,
            skewY: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
          });
        },
      });
    });

    // Cleanup
    return () => {
      words.forEach((word) => {
        const draggableInstance = Draggable.get(word);
        if (draggableInstance) {
          draggableInstance.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-3 ${className}`}>
      {parts.map((part, index) => (
        <motion.div
          key={index}
          className="draggable-word cursor-grab active:cursor-grabbing inline-block select-none"
          data-draggable
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: 'backOut',
          }}
          whileHover={{
            scale: 1.1,
            rotate: Math.random() * 10 - 5,
            transition: { duration: 0.2 },
          }}
          style={{
            transformOrigin: 'center center',
          }}
        >
          {part}
        </motion.div>
      ))}
    </div>
  );
}
