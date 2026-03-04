'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface RevealOnDragProps {
  hiddenContent: React.ReactNode;
  visibleContent: React.ReactNode;
  className?: string;
}

export default function RevealOnDrag({
  hiddenContent,
  visibleContent,
  className = '',
}: RevealOnDragProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);

  // Transform drag value to clip-path
  const clipPath = useTransform(
    dragX,
    [-300, 0, 300],
    [
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    ]
  );

  const opacity = useTransform(dragX, [-300, -150, 0, 150, 300], [1, 0.5, 0, 0.5, 1]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Hidden content (revealed on drag) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          clipPath,
          opacity,
        }}
      >
        {hiddenContent}
      </motion.div>

      {/* Visible content (draggable layer) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{ x: dragX }}
        className={`relative z-20 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
      >
        {visibleContent}
      </motion.div>

      {/* Hint indicator */}
      <motion.div
        className="absolute bottom-4 right-4 text-accent-yellow text-sm z-30 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isDragging ? 0 : [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ← Arrastra para revelar →
      </motion.div>
    </div>
  );
}
