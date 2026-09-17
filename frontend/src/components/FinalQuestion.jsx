import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Sparkles, RefreshCw } from 'lucide-react';
import { apologyConfig } from '../config/apology.js';
import { logInteraction } from '../utils/analytics.js';

export const FinalQuestion = ({ onFinalYes, onRestart }) => {
  const [showNeedsTime, setShowNeedsTime] = useState(false);
  const content = apologyConfig.step4FinalQuestion;
  const needsTimeContent = apologyConfig.needsTimeResponse;

  const handleNeedsTimeClick = () => {
    setShowNeedsTime(true);
    logInteraction('needs_time');
  };

  const handleYesClick = () => {
    logInteraction('final_yes');
    onFinalYes();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-xl mx-auto px-5 py-6"
    >
      <AnimatePresence mode="wait">
        {!showNeedsTime ? (
          <motion.div
            key="question-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel rounded-3xl p-7 sm:p-10 text-center relative overflow-hidden shadow-card-romantic"
          >
            {/* Step Tag */}
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs tracking-wider uppercase mb-6">
              <Sparkles size={12} className="text-rose-400" />
              <span>{content.tag}</span>
            </div>

            {/* Large Serif Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-300 mb-6">
              {content.heading}
            </h2>

            {/* Subtext */}
            <div className="space-y-2 mb-10 text-rose-100/85 text-base sm:text-lg leading-relaxed font-light">
              {content.subtext.map((line, idx) => (
                <p key={idx} className={idx === 2 ? "font-medium text-rose-200 pt-1" : ""}>
                  {line}
                </p>
              ))}
            </div>

            {/* Decision Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* YES Option */}
              <motion.button
                onClick={handleYesClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 border border-rose-300/40 shadow-glow-md flex items-center justify-center space-x-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                <Heart size={20} className="fill-white animate-heartbeat" />
                <span className="text-sm sm:text-base tracking-wide">
                  {content.yesButtonText}
                </span>
              </motion.button>

              {/* I NEED SOME TIME Option */}
              <motion.button
                onClick={handleNeedsTimeClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-4 rounded-full font-medium text-rose-200/90 bg-burgundy-900/60 hover:bg-burgundy-800/70 border border-rose-400/20 backdrop-blur-md flex items-center justify-center space-x-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <Clock size={18} className="text-rose-300" />
                <span className="text-sm sm:text-base tracking-wide">
                  {content.needsTimeButtonText}
                </span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="needs-time-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-card-romantic"
          >
            {/* Gentle Floral Icon */}
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-300 mb-5">
              <Clock size={28} className="text-rose-300 animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100 mb-5">
              {needsTimeContent.heading}
            </h3>

            <div className="space-y-3 text-rose-100/90 text-base sm:text-lg leading-relaxed font-light mb-8">
              {needsTimeContent.messages.map((msg, i) => (
                <p key={i} className={i === 2 ? "font-medium text-rose-200" : ""}>
                  {msg}
                </p>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-rose-300/70 italic mb-8">
              {needsTimeContent.closing}
            </p>

            {/* Option to return / restart */}
            <button
              onClick={onRestart}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-medium text-rose-200/80 bg-burgundy-900/60 hover:bg-burgundy-800/80 border border-rose-400/20 transition-colors cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>{needsTimeContent.restartButton}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FinalQuestion;
