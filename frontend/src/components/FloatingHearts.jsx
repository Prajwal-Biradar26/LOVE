import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const FloatingHearts = () => {
  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 18 + 10, // size in px
      duration: Math.random() * 12 + 10, // seconds
      delay: Math.random() * 8,
      type: i % 3 === 0 ? 'heart' : 'sparkle',
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft romantic gradient background vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950 via-burgundy-900/90 to-burgundy-950" />
      
      {/* Glowing radial ambient lights */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-900/20 rounded-full blur-[180px]" />

      {/* Floating hearts and bokeh */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-rose-300/40"
          style={{
            left: `${p.x}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-110vh',
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
            opacity: [0, p.opacity, p.opacity * 0.8, 0],
            rotate: [0, p.id % 2 === 0 ? 25 : -25, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.type === 'heart' ? '❤️' : '✨'}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
