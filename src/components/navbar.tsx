"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "./theme-provider";

const navLinks = [
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#notes", label: "Notes" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme } = useTheme();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[var(--border)] bg-[var(--background)]/82 px-3 py-2 shadow-sm backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 rounded-full pl-1 pr-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--foreground)] text-sm font-bold text-[var(--background)]">
            D
          </span>
          <span className="font-heading text-base font-bold text-[var(--foreground)]">DexPie</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Toggle theme"
          >
            <span className="relative h-[18px] w-[18px]">
              <Sun className="absolute inset-0 h-[18px] w-[18px] opacity-0 transition-opacity dark:opacity-100" />
              <Moon className="absolute inset-0 h-[18px] w-[18px] opacity-100 transition-opacity dark:opacity-0" />
            </span>
          </button>
          <button
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-[var(--border)] bg-[var(--background)]/95 p-3 shadow-sm backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
