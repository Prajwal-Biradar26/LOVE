import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { apologyConfig } from '../config/apology.js';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const audioRef = useRef(null);

  // Play the romantic.mp3 track
  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = isMuted ? 0 : volume;
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch (err) {
      // Browser autoplay policy blocked until first user interaction
      setIsPlaying(false);
      return false;
    }
  }, [isMuted, volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await attemptPlay();
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  // Autoplay romantic.mp3 when the website starts
  useEffect(() => {
    let cleanupListeners = () => {};

    // 1. Attempt immediate autoplay
    attemptPlay().then((success) => {
      if (!success) {
        // 2. If the browser blocks autoplay before user gesture,
        // trigger playback on the very first touch, click, scroll or keypress
        const handleFirstInteraction = async () => {
          if (audioRef.current && audioRef.current.paused) {
            const played = await attemptPlay();
            if (played) {
              removeListeners();
            }
          }
        };

        const events = ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown', 'scroll'];
        const removeListeners = () => {
          events.forEach((evt) => {
            window.removeEventListener(evt, handleFirstInteraction);
          });
        };

        events.forEach((evt) => {
          window.addEventListener(evt, handleFirstInteraction, { passive: true });
        });

        cleanupListeners = removeListeners;
      }
    });

    return () => {
      cleanupListeners();
    };
  }, [attemptPlay]);

  return (
    <div className="fixed top-5 right-5 z-50">
      {/* romantic.mp3 audio element */}
      <audio
        ref={audioRef}
        src={apologyConfig.music.src || '/assets/music/romantic.mp3'}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="relative flex items-center">
        {/* Expanded Volume / Controls slider */}
        {showControls && (
          <div className="mr-3 glass-panel px-3 py-2 rounded-full flex items-center space-x-2 animate-fadeIn shadow-lg">
            <button
              onClick={toggleMute}
              className="text-rose-300 hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-burgundy-700 accent-rose-500 rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
          </div>
        )}

        {/* Main Floating Music Pill Button */}
        <button
          onClick={togglePlay}
          onMouseEnter={() => setShowControls(true)}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-full transition-all duration-300 shadow-md ${
            isPlaying
              ? 'bg-rose-600/80 text-white shadow-glow-sm border border-rose-400/40 backdrop-blur-md'
              : 'bg-burgundy-900/70 text-rose-200/80 hover:text-white border border-rose-500/20 hover:border-rose-400/50 backdrop-blur-md'
          }`}
          title={isPlaying ? "Pause romantic.mp3" : "Play romantic.mp3"}
          aria-label={isPlaying ? "Pause romantic.mp3" : "Play romantic.mp3"}
        >
          {isPlaying ? (
            <>
              <Pause size={15} className="animate-pulse" />
              <div className="flex items-end space-x-0.5 h-3.5 px-0.5">
                <span className="w-0.5 bg-rose-200 animate-bounce h-3" style={{ animationDelay: '0.1s' }} />
                <span className="w-0.5 bg-rose-200 animate-bounce h-2" style={{ animationDelay: '0.25s' }} />
                <span className="w-0.5 bg-rose-200 animate-bounce h-3.5" style={{ animationDelay: '0.15s' }} />
              </div>
              <span className="text-xs font-medium tracking-wide pr-1">Playing</span>
            </>
          ) : (
            <>
              <Play size={15} className="ml-0.5" />
              <Music size={14} />
              <span className="text-xs font-medium tracking-wide pr-1">Music</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
