import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, X } from 'lucide-react';
import { apologyConfig } from '../config/apology.js';

export const DirectRefusalModal = ({ isOpen, onClose, onReconsider }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md glass-panel rounded-3xl p-7 text-center relative overflow-hidden shadow-2xl border border-rose-500/30"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-rose-300 hover:text-white hover:bg-rose-500/10 transition-colors"
          aria-label="Close message"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-300 mb-5">
          <HeartHandshake size={28} />
        </div>

        <h3 className="text-2xl font-serif font-bold text-white mb-4">
          I hear and respect you
        </h3>

        <div className="space-y-3 text-rose-100/90 text-sm sm:text-base leading-relaxed font-light mb-7">
          <p>I never wanted this website to pressure you or trap you into an answer you don't feel.</p>
          <p>I respect your feelings completely, and I just wanted to say what was on my heart and take full accountability.</p>
          <p className="text-rose-200 font-medium pt-1">
            Thank you for reading, and I'm truly sorry. ❤️
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-medium text-rose-300/80 bg-burgundy-900/60 hover:bg-burgundy-800 border border-rose-500/20 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onReconsider}
            className="px-5 py-2.5 rounded-full text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-glow-sm transition-all"
          >
            Give It Another Thought ❤️
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DirectRefusalModal;
