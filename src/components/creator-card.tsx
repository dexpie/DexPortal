"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CreatorCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Cat ears decoration */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-16 z-20">
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="drop-shadow-sm">
          <path d="M2 28L0 8L12 20Z" fill="var(--primary)" />
          <path d="M3 22L2 12L10 18Z" fill="var(--secondary)" opacity="0.5" />
        </svg>
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="drop-shadow-sm">
          <path d="M22 28L24 8L12 20Z" fill="var(--primary)" />
          <path d="M21 22L22 12L14 18Z" fill="var(--secondary)" opacity="0.5" />
        </svg>
      </div>

      <div className="w-[280px] bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-lg shadow-black/10">
        {/* Profile Image */}
        <div className="relative mx-auto mt-4 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] blur-md opacity-30" />
          <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-[var(--primary)]/20">
            <Image
              src="https://github.com/dexpie.png"
              alt="DexPie"
              fill
              className="object-cover"
            />
          </div>
          {/* Whisker lines */}
          <svg
            className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity"
            width="20"
            height="40"
            viewBox="0 0 20 40"
          >
            <line x1="20" y1="10" x2="0" y2="15" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
            <line x1="20" y1="20" x2="0" y2="20" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
            <line x1="20" y1="30" x2="0" y2="25" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
          </svg>
          <svg
            className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity"
            width="20"
            height="40"
            viewBox="0 0 20 40"
          >
            <line x1="0" y1="10" x2="20" y2="15" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
            <line x1="0" y1="20" x2="20" y2="20" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
            <line x1="0" y1="30" x2="20" y2="25" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Info */}
        <div className="text-center mt-6">
          <h3 className="text-2xl font-bold text-[var(--foreground)] font-heading">DexPie</h3>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">Full-Stack Developer</p>

          {/* Badges */}
          <div className="flex gap-2 mt-4 justify-center flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">
              Developer
            </span>
            <span className="px-3 py-1 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-medium">
              Designer
            </span>
          </div>

          {/* Location */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[var(--muted-foreground)] text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Jakarta, Indonesia
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mt-6">
          <a
            href="https://github.com/dexpie"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://twitter.com/dexpie"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="mailto:d.dexpiee@gmail.com"
            className="w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}