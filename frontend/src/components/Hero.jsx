import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { NoButton } from './NoButton.jsx';
import { apologyConfig } from '../config/apology.js';

export const Hero = ({ onAccept, onDirectRefusal }) => {
  const [noEvadeCount, setNoEvadeCount] = useState(0);

  // YES button becomes progressively more prominent as NO is chased
  const yesScale = 1 + Math.min(noEvadeCount * 0.04, 0.28);
  const glowIntensity = Math.min(noEvadeCount * 8, 45);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-xl mx-auto px-5 py-8"
    >
      <div className="glass-panel rounded-3xl p-7 sm:p-10 text-center relative overflow-hidden shadow-card-romantic">
        {/* Subtle romantic corner highlights */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-rose-700/20 rounded-full blur-2xl pointer-events-none" />

        {/* Delicate Top Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/25 text-rose-200 text-xs tracking-wider uppercase font-medium mb-6"
        >
          <Sparkles size={13} className="text-rose-400 animate-pulse" />
          <span>{apologyConfig.hero.badge}</span>
        </motion.div>

        {/* Main Serif Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-300 mb-6 drop-shadow-sm"
        >
          {apologyConfig.hero.title}
        </motion.h1>

        {/* Subtitle / Honest statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="space-y-2 mb-8 text-rose-100/85 text-base sm:text-lg leading-relaxed font-light"
        >
          {apologyConfig.hero.subtitle.map((line, idx) => (
            <p key={idx} className={idx === 2 ? "font-medium text-rose-200 pt-1" : ""}>
              {line}
            </p>
          ))}
        </motion.div>

        {/* Call to Question */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-serif text-rose-200 font-semibold tracking-wide flex items-center justify-center space-x-2">
            <span>{apologyConfig.hero.question}</span>
          </h2>
        </motion.div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative min-h-[70px]">
          {/* YES Button with adaptive glow and growth */}
          <motion.button
            onClick={onAccept}
            style={{
              transform: `scale(${yesScale})`,
              boxShadow: `0 0 ${15 + glowIntensity}px rgba(244, 63, 94, ${0.35 + noEvadeCount * 0.05})`,
            }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.98 }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 border border-rose-300/40 shadow-glow-md flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300 z-20"
            aria-label="Forgive and continue: YES, I FORGIVE YOU"
          >
            <Heart size={18} className="fill-white text-white animate-heartbeat" />
            <span className="tracking-wide text-sm sm:text-base">
              {apologyConfig.hero.yesButtonText}
            </span>
          </motion.button>

          {/* Evasive NO Button */}
          <NoButton
            onEvade={(count) => setNoEvadeCount(count)}
            onDirectRefusal={onDirectRefusal}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
