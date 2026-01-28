"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

// Mock snippets for key components
const SNIPPETS: Record<string, string> = {
    "Hero": `// src/components/hero.tsx
export function Hero() {
  return (
    <section className="relative min-h-screen">
       <AuroraBackground>
          <h1 className="text-9xl font-heading">
             Digital Alchemist
          </h1>
       </AuroraBackground>
    </section>
  );
}`,
    "Navbar": `// src/components/navbar.tsx
export function Navbar() {
  const { scrollY } = useScroll();
  
  return (
    <nav className="fixed top-0 w-full z-50">
       <GlassPanel>
          <NavLinks />
          <ThemeToggle />
       </GlassPanel>
    </nav>
  );
}`,
    "Footer": `// src/components/footer.tsx
export function Footer() {
  return (
    <footer className="bg-black pt-20">
       <div className="container">
          <h2>Let's Connect</h2>
          <VisitorCount />
          <SystemStatus />
       </div>
    </footer>
  );
}`
};

export function SourceCodeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [componentName, setComponentName] = useState("");
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleOpen = (e: CustomEvent) => {
            const name = e.detail?.name || "Component";
            setComponentName(name);
            setCode(SNIPPETS[name] || `// Source code for <${name} /> not available in preview.\n// It is likely a server component or dynamic chunk.`);
            setIsOpen(true);
        };

        window.addEventListener("open-source-modal", handleOpen as EventListener);
        return () => window.removeEventListener("open-source-modal", handleOpen as EventListener);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={() => setIsOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.95, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 10 }}
                    className="w-full max-w-2xl bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5 mr-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-sm text-neutral-400">{componentName}.tsx</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Code Area */}
                    <div className="p-4 overflow-x-auto">
                        <pre className="text-sm text-neutral-300 leading-relaxed">
                            <code>{code}</code>
                        </pre>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 bg-[#007acc] text-white text-xs flex justify-between items-center">
                        <span>TypeScript React</span>
                        <span>Ln 1, Col 1</span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
