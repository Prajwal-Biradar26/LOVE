import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const steps = [
  { id: 1, label: 'Apology' },
  { id: 2, label: 'Memories' },
  { id: 3, label: 'Letter' },
  { id: 4, label: 'Question' },
];

export const ProgressIndicator = ({ currentStep }) => {
  // Only show progress indicator for steps 1 through 4
  if (currentStep < 1 || currentStep > 4) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 max-w-xs w-full px-4">
      <div className="glass-panel-subtle px-4 py-2 rounded-full flex items-center justify-between shadow-lg">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <React.Fragment key={step.id}>
              {/* Step indicator node */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    backgroundColor: isCompleted || isActive ? '#e11d48' : 'rgba(76, 12, 30, 0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isActive
                      ? 'border-rose-300 shadow-glow-sm'
                      : isCompleted
                      ? 'border-rose-500 text-white'
                      : 'border-rose-900/60 text-rose-400/40'
                  }`}
                >
                  <Heart
                    size={11}
                    className={`transition-colors ${
                      isCompleted || isActive ? 'fill-white text-white' : 'text-rose-400/50'
                    }`}
                  />
                </motion.div>
                <span
                  className={`text-[10px] mt-1 font-medium tracking-wide transition-colors ${
                    isActive ? 'text-rose-300' : isCompleted ? 'text-rose-400/80' : 'text-rose-500/30'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-1.5 bg-burgundy-800 relative rounded-full overflow-hidden self-center mb-3">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-rose-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
