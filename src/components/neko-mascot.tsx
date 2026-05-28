"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NekoMascot() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Meow sound
  const playMeow = useCallback(() => {
    // Create a simple meow using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      // Rising then falling frequency for meow-like sound
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch {
      // Audio not supported or blocked
    }
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    playMeow();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <motion.button
            onClick={handleClick}
            animate={
              isAnimating
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0],
                  }
                : {
                    y: [0, -5, 0],
                  }
            }
            transition={
              isAnimating
                ? { duration: 0.4 }
                : { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }
            className="relative cursor-pointer"
            aria-label="Neko mascot - click for meow"
          >
            {/* Cat face SVG */}
            <svg
              width="56"
              height="56"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              {/* Cat ears */}
              <path
                d="M12 28L8 8L28 20Z"
                fill="#f4a261"
                className="dark:fill-[#c9b1ff] transition-colors"
              />
              <path
                d="M52 28L56 8L36 20Z"
                fill="#f4a261"
                className="dark:fill-[#c9b1ff] transition-colors"
              />
              {/* Inner ears */}
              <path
                d="M14 24L12 12L24 20Z"
                fill="#ffb085"
                className="dark:fill-[#e0d0ff] transition-colors"
              />
              <path
                d="M50 24L52 12L40 20Z"
                fill="#ffb085"
                className="dark:fill-[#e0d0ff] transition-colors"
              />
              {/* Head */}
              <ellipse
                cx="32"
                cy="36"
                rx="22"
                ry="20"
                fill="#f4a261"
                className="dark:fill-[#c9b1ff] transition-colors"
              />
              {/* Eyes */}
              <ellipse cx="24" cy="34" rx="4" ry="5" fill="#1a1614" />
              <ellipse cx="40" cy="34" rx="4" ry="5" fill="#1a1614" />
              {/* Eye shine */}
              <circle cx="25" cy="33" r="1.5" fill="white" />
              <circle cx="41" cy="33" r="1.5" fill="white" />
              {/* Nose */}
              <ellipse cx="32" cy="40" rx="2.5" ry="2" fill="#ffb085" />
              {/* Mouth */}
              <path
                d="M32 42C32 42 29 45 27 44M32 42C32 42 35 45 37 44"
                stroke="#1a1614"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Whiskers */}
              <line x1="10" y1="38" x2="22" y2="40" stroke="#1a1614" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              <line x1="10" y1="42" x2="22" y2="42" stroke="#1a1614" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              <line x1="42" y1="40" x2="54" y2="38" stroke="#1a1614" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              <line x1="42" y1="42" x2="54" y2="42" stroke="#1a1614" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              {/* Blush */}
              <ellipse cx="18" cy="42" rx="4" ry="2" fill="#ffb085" opacity="0.5" />
              <ellipse cx="46" cy="42" rx="4" ry="2" fill="#ffb085" opacity="0.5" />
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#2d2522] dark:bg-[#3d3540] text-[#faf3f0] dark:text-[#faf3f0] text-xs rounded-lg whitespace-nowrap shadow-lg"
                >
                  meow~ click me!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}