import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { apologyConfig } from '../config/apology.js';

export const ApologyLetter = ({ onNext }) => {
  const content = apologyConfig.step1Apology;
  const fullText = content.paragraphs.join('\n\n');

  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const speed = 24; // ms per character

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
    setIsTypingDone(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-2xl mx-auto px-5 py-6"
    >
      <div className="glass-panel rounded-3xl p-7 sm:p-10 relative overflow-hidden shadow-card-romantic">
        {/* Step Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs tracking-wider uppercase">
            <Sparkles size={12} className="text-rose-400" />
            <span>{content.tag}</span>
          </div>

          {!isTypingDone && (
            <button
              onClick={handleSkipTyping}
              className="text-xs text-rose-400/60 hover:text-rose-200 transition-colors cursor-pointer"
            >
              Skip typing →
            </button>
          )}
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-100 mb-6 flex items-center space-x-3">
          <span>{content.heading}</span>
        </h2>

        {/* Typewriter text output */}
        <div className="min-h-[220px] text-rose-100/90 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line relative mb-8">
          {displayedText}
          {!isTypingDone && (
            <span className="inline-block w-2 h-5 ml-1 bg-rose-400 animate-pulse translate-y-0.5" />
          )}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isTypingDone ? 1 : 0.6, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-end pt-4 border-t border-rose-500/20"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 border border-rose-400/30 shadow-glow-sm flex items-center space-x-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <span>{content.continueButton}</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ApologyLetter;
