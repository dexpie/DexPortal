"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Mail, Twitter } from "lucide-react";

const links = [
  { label: "Work", href: "/#projects" },
  { label: "Stack", href: "/#stack" },
  { label: "Notes", href: "/#notes" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/dexpie" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/dexpie" },
  { icon: Mail, label: "Email", href: "mailto:d.dexpiee@gmail.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="font-heading text-2xl font-extrabold text-[var(--foreground)]">
            DexPie
          </Link>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">Built in Surabaya. Shaped for the Dex ecosystem.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-2">
          {socials.map((social) => {
            const Icon = social.icon;
            const external = social.href.startsWith("http");

            return (
              <a
                key={social.href}
                href={social.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <Icon size={17} />
              </a>
            );
          })}
          <a
            href="https://github.com/dexpie"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)] sm:inline-flex"
          >
            Source
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
