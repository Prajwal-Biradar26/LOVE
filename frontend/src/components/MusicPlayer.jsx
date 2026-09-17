import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { apologyConfig } from '../config/apology.js';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSource, setAudioSource] = useState('local'); // 'local' | 'synth'
  const [showControls, setShowControls] = useState(false);

  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const synthTimerRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Soft romantic chord progression for procedural synth fallback
  // Fmaj7 -> Cmaj7 -> Dm7 -> Bbmaj7
  const synthChords = [
    [174.61, 220.00, 261.63, 329.63], // F3, A3, C4, E4
    [130.81, 196.00, 261.63, 329.63], // C3, G3, C4, E4
    [146.83, 220.00, 261.63, 349.23], // D3, A3, C4, F4
    [116.54, 174.61, 233.08, 293.66], // Bb2, F3, Bb3, D4
  ];

  const playSynthNote = (ctx, freq, time, duration = 2.5) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm triangle/sine mix
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      const maxGain = 0.04 * (isMuted ? 0 : volume);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(maxGain, time + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.warn('Synth note error:', e);
    }
  };

  const startSynthMelody = useCallback(() => {
    if (!synthCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      synthCtxRef.current = new AudioCtx();
    }

    const ctx = synthCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    let chordIdx = 0;
    const playNext = () => {
      if (!isPlayingRef.current) return;
      const chord = synthChords[chordIdx];
      const now = ctx.currentTime;
      chord.forEach((freq, idx) => {
        playSynthNote(ctx, freq, now + idx * 0.45, 3.2);
      });
      chordIdx = (chordIdx + 1) % synthChords.length;
      synthTimerRef.current = setTimeout(playNext, 3800);
    };

    playNext();
  }, [isMuted, volume]);

  const stopSynthMelody = useCallback(() => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state === 'running') {
      synthCtxRef.current.suspend().catch(() => {});
    }
  }, []);

  const playMusic = useCallback(async () => {
    if (isPlayingRef.current) return;

    // Try playing MP3 first if audioRef is available
    if (audioRef.current && audioSource === 'local') {
      try {
        audioRef.current.volume = isMuted ? 0 : volume;
        await audioRef.current.play();
        setIsPlaying(true);
        isPlayingRef.current = true;
        return true;
      } catch (err) {
        // MP3 autoplay blocked or file missing - attempt procedural synthesizer
        try {
          setAudioSource('synth');
          isPlayingRef.current = true;
          setIsPlaying(true);
          startSynthMelody();
          return true;
        } catch (synthErr) {
          isPlayingRef.current = false;
          setIsPlaying(false);
          return false;
        }
      }
    } else {
      try {
        isPlayingRef.current = true;
        setIsPlaying(true);
        startSynthMelody();
        return true;
      } catch (e) {
        isPlayingRef.current = false;
        setIsPlaying(false);
        return false;
      }
    }
  }, [audioSource, isMuted, volume, startSynthMelody]);

  const pauseMusic = useCallback(() => {
    if (audioRef.current && audioSource === 'local') {
      audioRef.current.pause();
    }
    stopSynthMelody();
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, [audioSource, stopSynthMelody]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const handleAudioError = () => {
    // If romantic.mp3 fails to load, switch to procedural ambient synthesizer
    setAudioSource('synth');
    if (isPlayingRef.current) {
      startSynthMelody();
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

  // Autoplay Logic
  useEffect(() => {
    const shouldAutoPlay = apologyConfig.music?.autoPlay !== false;

    if (shouldAutoPlay) {
      // 1. Attempt immediate autoplay
      playMusic().then((started) => {
        if (!started) {
          // 2. If blocked by browser autoplay policy, arm listeners for the first user interaction
          const handleFirstGesture = async () => {
            if (!isPlayingRef.current) {
              await playMusic();
            }
            cleanupGestures();
          };

          const gestureEvents = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
          const cleanupGestures = () => {
            gestureEvents.forEach((evt) => {
              window.removeEventListener(evt, handleFirstGesture);
            });
          };

          gestureEvents.forEach((evt) => {
            window.addEventListener(evt, handleFirstGesture, { passive: true, once: true });
          });
        }
      });
    }

    return () => {
      stopSynthMelody();
    };
  }, [playMusic, stopSynthMelody]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <audio
        ref={audioRef}
        src={apologyConfig.music.src}
        preload="auto"
        loop
        onError={handleAudioError}
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
          title={isPlaying ? "Pause music" : "Play romantic background music"}
          aria-label={isPlaying ? "Pause background music" : "Play romantic background music"}
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
