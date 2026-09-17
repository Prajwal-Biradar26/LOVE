import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  MessageCircleHeart,
  SunMedium,
  Camera,
  Flame,
  ArrowRight
} from 'lucide-react';
import { apologyConfig } from '../config/apology.js';

// Map string icon names to Lucide components
const iconMap = {
  Sparkles,
  Heart,
  MessageCircleHeart,
  SunMedium,
  Camera,
  Flame,
};

export const MemoryCards = ({ onNext }) => {
  const content = apologyConfig.step2Memories;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-4xl mx-auto px-5 py-6"
    >
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-card-romantic">
        {/* Step Badge */}
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs tracking-wider uppercase mb-4">
          <Sparkles size={12} className="text-rose-400" />
          <span>{content.tag}</span>
        </div>

        {/* Section Heading & Subheading */}
        <div className="text-center sm:text-left mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-rose-100 mb-2">
            {content.heading}
          </h2>
          <p className="text-rose-200/70 text-sm sm:text-base font-light">
            {content.subheading}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {content.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Heart;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card-hover rounded-2xl p-5 border border-rose-500/20 bg-burgundy-900/40 backdrop-blur-md flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-rose-400/30 flex items-center justify-center text-rose-300 mb-3.5 group-hover:text-rose-200 group-hover:scale-110 transition-transform">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-rose-100 mb-2 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-rose-200/80 text-xs sm:text-sm leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-500/10 flex items-center justify-end text-rose-400/50 group-hover:text-rose-300 transition-colors">
                  <Heart size={14} className="fill-current" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Action */}
        <div className="flex justify-end pt-4 border-t border-rose-500/20">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 border border-rose-400/30 shadow-glow-sm flex items-center space-x-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <span>{content.continueButton}</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryCards;
