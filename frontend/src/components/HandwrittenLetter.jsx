import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { apologyConfig } from '../config/apology.js';

export const HandwrittenLetter = ({ onNext }) => {
  const content = apologyConfig.step3Letter;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-2xl mx-auto px-5 py-6"
    >
      <div className="letter-paper rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-rose-200/50">
        {/* Subtle romantic watermark seal */}
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none text-rose-950">
          <Heart size={160} />
        </div>

        {/* Header with date / greeting */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-rose-900/10">
          <span className="text-xs uppercase tracking-widest text-rose-900/60 font-sans font-semibold">
            {content.tag}
          </span>
          <span className="text-sm font-handwriting text-rose-800 text-lg">
            {content.date}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-950 mb-6">
          {content.heading}
        </h2>

        {/* Handwritten Body */}
        <div className="font-handwriting text-2xl sm:text-3xl text-rose-950/90 leading-relaxed space-y-4 mb-8">
          {content.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.2, duration: 0.6 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Closing and Signature */}
        <div className="mb-8 pt-2">
          <p className="font-handwriting text-xl text-rose-900/80 mb-1">{content.closing}</p>
          <p className="font-serif italic font-bold text-2xl text-rose-950">
            {apologyConfig.senderName || "Always Yours"}
          </p>
        </div>

        {/* Glowing Beating Heart Animation */}
        <div className="flex flex-col items-center justify-center my-6">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              filter: [
                'drop-shadow(0 0 8px rgba(225, 29, 72, 0.4))',
                'drop-shadow(0 0 20px rgba(225, 29, 72, 0.8))',
                'drop-shadow(0 0 8px rgba(225, 29, 72, 0.4))',
              ],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-rose-600 cursor-pointer"
          >
            <Heart size={44} className="fill-rose-600" />
          </motion.div>
          <span className="text-xs text-rose-900/50 mt-2 font-sans tracking-wider uppercase">
            A promise from the heart
          </span>
        </div>

        {/* Next Step Action */}
        <div className="flex justify-end pt-4 border-t border-rose-900/10">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-rose-700 to-burgundy-700 hover:from-rose-600 hover:to-burgundy-600 shadow-md flex items-center space-x-2 transition-all cursor-pointer font-sans focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <span>{content.continueButton}</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HandwrittenLetter;
