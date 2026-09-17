import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BarChart3, Heart } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts.jsx';
import { MusicPlayer } from './components/MusicPlayer.jsx';
import { ProgressIndicator } from './components/ProgressIndicator.jsx';
import { Hero } from './components/Hero.jsx';
import { ApologyLetter } from './components/ApologyLetter.jsx';
import { MemoryCards } from './components/MemoryCards.jsx';
import { HandwrittenLetter } from './components/HandwrittenLetter.jsx';
import { FinalQuestion } from './components/FinalQuestion.jsx';
import { YesCelebration } from './components/YesCelebration.jsx';
import { AdminDashboard } from './components/AdminDashboard.jsx';
import { DirectRefusalModal } from './components/DirectRefusalModal.jsx';
import { logInteraction } from './utils/analytics.js';

export function App() {
  // Step 0: Hero / Landing
  // Step 1: The Apology (Typewriter)
  // Step 2: Memories Cards
  // Step 3: Handwritten Love Letter
  // Step 4: Final Question
  // Step 5: Yes Celebration
  const [currentStep, setCurrentStep] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRefusalModalOpen, setIsRefusalModalOpen] = useState(false);

  // Log page open and check URL for ?admin=true
  useEffect(() => {
    logInteraction('page_opened');

    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminOpen(true);
    }
  }, []);

  const handleInitialAccept = () => {
    logInteraction('yes_clicked');
    logInteraction('apology_started');
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep1Next = () => {
    logInteraction('memories_viewed');
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Next = () => {
    logInteraction('letter_viewed');
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep3Next = () => {
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalYes = () => {
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Cinematic Ambient Background */}
      <FloatingHearts />

      {/* Persistent Music Player */}
      <MusicPlayer />

      {/* Stepped Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} />

      {/* Main Multi-Step Apology Content */}
      <main className="flex-1 flex items-center justify-center pt-16 pb-12 w-full">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <Hero
              key="step-0"
              onAccept={handleInitialAccept}
              onDirectRefusal={() => setIsRefusalModalOpen(true)}
            />
          )}

          {currentStep === 1 && (
            <ApologyLetter
              key="step-1"
              onNext={handleStep1Next}
            />
          )}

          {currentStep === 2 && (
            <MemoryCards
              key="step-2"
              onNext={handleStep2Next}
            />
          )}

          {currentStep === 3 && (
            <HandwrittenLetter
              key="step-3"
              onNext={handleStep3Next}
            />
          )}

          {currentStep === 4 && (
            <FinalQuestion
              key="step-4"
              onFinalYes={handleFinalYes}
              onRestart={handleRestart}
            />
          )}

          {currentStep === 5 && (
            <YesCelebration
              key="step-5"
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Discrete Romantic Footer with Admin Toggle */}
      <footer className="relative z-20 py-4 px-6 text-center text-xs text-rose-300/40 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Heart size={12} className="fill-rose-500/50 text-rose-500/50" />
          <span>Made with sincere love & regret</span>
        </div>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-rose-400/40 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          title="Open Anonymous Analytics"
          aria-label="Admin Analytics"
        >
          <BarChart3 size={13} />
          <span className="hidden sm:inline">Analytics</span>
        </button>
      </footer>

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Accessible Direct Refusal Modal */}
      <DirectRefusalModal
        isOpen={isRefusalModalOpen}
        onClose={() => setIsRefusalModalOpen(false)}
        onReconsider={() => setIsRefusalModalOpen(false)}
      />
    </div>
  );
}

export default App;
