import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logInteraction } from '../utils/analytics.js';
import { apologyConfig } from '../config/apology.js';

export const NoButton = ({ onEvade, onDirectRefusal }) => {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [bursts, setBursts] = useState([]);
  const buttonRef = useRef(null);
  const lastEvadeTime = useRef(0);

  const messages = apologyConfig.noButtonMessages || [
    "NO",
    "Are you sure? 🥺",
    "Think again…",
    "My heart says no to this no 😭",
    "One more chance?",
    "Please? ❤️",
    "I brought flowers… 💐",
    "Okay okay… but look at me 🥹",
    "You’re really going to break my heart?",
    "You caught me 😂"
  ];

  const currentText = messages[Math.min(attempts, messages.length - 1)];

  // Calculate random safe coordinates inside viewport
  const getSafeRandomPosition = useCallback((cursorX = 0, cursorY = 0) => {
    const btn = buttonRef.current?.getBoundingClientRect();
    const btnWidth = btn?.width || 140;
    const btnHeight = btn?.height || 50;

    const marginX = 25;
    const marginY = 80; // keep clear of top/bottom nav and boundaries
    const maxWidth = window.innerWidth - btnWidth - marginX;
    const maxHeight = window.innerHeight - btnHeight - marginY;

    let targetX, targetY;
    let tries = 0;

    // Pick a point that is at least 150px away from the cursor
    do {
      targetX = Math.floor(Math.random() * (maxWidth - marginX)) + marginX;
      targetY = Math.floor(Math.random() * (maxHeight - marginY)) + marginY;
      tries++;
    } while (
      tries < 12 &&
      cursorX &&
      cursorY &&
      Math.hypot(targetX + btnWidth / 2 - cursorX, targetY + btnHeight / 2 - cursorY) < 140
    );

    return { x: targetX, y: targetY };
  }, []);

  const triggerEvade = useCallback((cursorX, cursorY) => {
    const now = Date.now();
    // Throttle slightly (280ms) to allow smooth spring animation to finish
    if (now - lastEvadeTime.current < 280) return;
    lastEvadeTime.current = now;

    const newPos = getSafeRandomPosition(cursorX, cursorY);
    setPosition(newPos);
    setIsMoved(true);

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    // Spawn cute heart/tear burst particle
    const burstId = Date.now();
    setBursts((prev) => [
      ...prev.slice(-4),
      {
        id: burstId,
        x: cursorX || window.innerWidth / 2,
        y: cursorY || window.innerHeight / 2,
        icon: nextAttempts % 2 === 0 ? '💔' : '🥺',
      },
    ]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 1000);

    if (onEvade) onEvade(nextAttempts);
    logInteraction('no_interaction', { attempts: nextAttempts });
  }, [attempts, getSafeRandomPosition, onEvade]);

  // Pointer proximity detection for desktop cursors
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      // Trigger dodge when pointer enters 95px proximity
      if (distance < 95) {
        triggerEvade(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [triggerEvade]);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    triggerEvade(touch.clientX, touch.clientY);
  };

  return (
    <>
      {/* Playful Floating Burst Particles */}
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 1, scale: 0.8, x: b.x - 12, y: b.y - 12 }}
            animate={{ opacity: 0, scale: 1.6, y: b.y - 65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 text-2xl select-none"
          >
            {b.icon}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* The Runaway NO Button */}
      <div className={isMoved ? "contents" : "inline-block"}>
        <motion.button
          ref={buttonRef}
          onClick={(e) => {
            e.preventDefault();
            triggerEvade(e.clientX, e.clientY);
          }}
          onMouseEnter={(e) => triggerEvade(e.clientX, e.clientY)}
          onTouchStart={handleTouchStart}
          style={
            isMoved
              ? {
                  position: 'fixed',
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  zIndex: 45,
                }
              : { position: 'relative' }
          }
          animate={
            isMoved
              ? {
                  scale: [0.92, 1.05, 1],
                  rotate: [0, attempts % 2 === 0 ? -6 : 6, 0],
                }
              : {}
          }
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 22,
          }}
          className="px-6 py-3.5 rounded-full font-medium text-rose-200/90 bg-burgundy-900/80 hover:bg-burgundy-800/90 border border-rose-400/20 shadow-md backdrop-blur-md transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-rose-400"
          aria-label={`Refusal button: ${currentText}`}
        >
          <span className="flex items-center space-x-1.5 whitespace-nowrap text-sm md:text-base">
            <span>{currentText}</span>
          </span>
        </motion.button>
      </div>

      {/* Accessible direct refusal link for ethical, non-trapping user experience */}
      <div className="mt-4 text-center">
        <button
          onClick={onDirectRefusal}
          className="text-xs text-rose-400/50 hover:text-rose-300 underline underline-offset-4 decoration-rose-500/30 hover:decoration-rose-400 transition-colors focus:outline-none focus:ring-1 focus:ring-rose-400 rounded px-2 py-0.5"
          aria-label="Genuine refusal option: I really mean no"
        >
          {apologyConfig.hero.accessibleRefusalText || "I really mean no"}
        </button>
      </div>
    </>
  );
};

export default NoButton;
