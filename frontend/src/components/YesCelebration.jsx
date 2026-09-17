import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apologyConfig } from '../config/apology.js';

export const YesCelebration = ({ onRestart }) => {
  const content = apologyConfig.celebration;

  // Trigger gentle, elegant heart and petal confetti bursts
  useEffect(() => {
    // Gentle confetti wave 1
    const fireConfetti = () => {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#f43f5e', '#fda4af', '#fecdd3', '#ffd700', '#ffffff'],
        disableForReducedMotion: true,
      });
    };

    fireConfetti();
    const timer1 = setTimeout(fireConfetti, 900);
    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#e11d48', '#fb7185', '#ffe4e6'],
        disableForReducedMotion: true,
      });
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-2xl mx-auto px-5 py-8"
    >
      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-card-romantic">
        {/* Soft glowing concentric halos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Central Animated Heart with Pulses */}
        <div className="relative mb-8 flex justify-center items-center">
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-28 h-28 rounded-full border-2 border-rose-400/40"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center shadow-glow-lg border border-rose-300/40"
          >
            <Heart size={38} className="fill-white text-white drop-shadow" />
          </motion.div>
        </div>

        {/* Heading: Thank You */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-300 mb-6"
        >
          {content.heading}
        </motion.h1>

        {/* Promise Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-lg mx-auto mb-6"
        >
          <p className="text-xl sm:text-2xl font-serif italic text-rose-200 leading-relaxed font-light">
            “{content.promise}”
          </p>
        </motion.div>

        {/* Ending Chapter Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="max-w-md mx-auto mb-10 pt-4 border-t border-rose-500/20"
        >
          <p className="text-sm sm:text-base text-rose-300/80 leading-relaxed font-light">
            {content.quote}
          </p>
        </motion.div>

        {/* Revisit journey button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex justify-center"
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-medium text-rose-200/80 bg-burgundy-900/60 hover:bg-burgundy-800/80 border border-rose-400/20 transition-colors cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>{content.restartButton}</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default YesCelebration;
