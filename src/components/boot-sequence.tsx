"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function BootSequence() {
  const [isBooting, setIsBooting] = useState(true);
  const [phase, setPhase] = useState<"nyaa" | "stretch" | "ready">("nyaa");

  useEffect(() => {
    if (sessionStorage.getItem("dexportal_booted")) {
      setIsBooting(false);
      return;
    }

    const t1 = setTimeout(() => setPhase("stretch"), 600);
    const t2 = setTimeout(() => setPhase("ready"), 1400);
    const t3 = setTimeout(() => {
      sessionStorage.setItem("dexportal_booted", "true");
      setIsBooting(false);
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const skipBoot = () => {
    sessionStorage.setItem("dexportal_booted", "true");
    setIsBooting(false);
  };

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1a1614] flex flex-col items-center justify-center cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={skipBoot}
        >
          {/* Cat ASCII */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-[var(--primary)] font-mono text-center mb-6 select-none"
          >
            <pre className="text-5xl leading-none">{` /\\_/\\ ( o.o ) > ^ <`}</pre>
          </motion.div>

          {/* Phase text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[var(--muted-foreground)] text-lg font-medium"
            >
              {phase === "nyaa" && "nyaa~"}
              {phase === "stretch" && "stretching..."}
              {phase === "ready" && (
                <span className="text-[var(--primary)]">ready to pounce~</span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Skip hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10"
          >
            <span className="text-xs text-[var(--muted-foreground)]">click to skip</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}