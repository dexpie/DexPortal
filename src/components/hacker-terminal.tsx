"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands: Record<string, string | string[]> = {
    help: [
        "Available commands:",
        "  help     - Show this help message",
        "  whoami   - Display user info",
        "  ls       - List projects",
        "  status   - System status",
        "  clear    - Clear terminal",
        "  exit     - Close terminal",
        "  matrix   - ???",
    ],
    whoami: "guest@dexportal - Visitor from the digital realm",
    ls: [
        "drwxr-xr-x  DexPDF/",
        "drwxr-xr-x  DexKomik/",
        "drwxr-xr-x  DexAnime/",
        "-rw-r--r--  README.md",
    ],
    status: [
        "╔══════════════════════════════════════╗",
        "║      DEXPORTAL SYSTEM STATUS         ║",
        "╠══════════════════════════════════════╣",
        "║  CPU:     ████████░░  78%            ║",
        "║  Memory:  ██████░░░░  62%            ║",
        "║  Network: ██████████  ONLINE         ║",
        "║  Uptime:  42 days, 13:37:00          ║",
        "╚══════════════════════════════════════╝",
    ],
    matrix: [
        "Wake up, Neo...",
        "The Matrix has you...",
        "Follow the white rabbit.",
    ],
};

export function HackerTerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<{ type: "input" | "output"; content: string }[]>([
        { type: "output", content: "DEXPORTAL Terminal v1.0" },
        { type: "output", content: "Type 'help' for available commands." },
        { type: "output", content: "" },
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Toggle with backtick key
    useEffect(() => {
        const handleKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === "`" || e.key === "~") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Scroll to bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        setHistory((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

        if (trimmed === "exit") {
            setIsOpen(false);
            return;
        }

        if (trimmed === "clear") {
            setHistory([]);
            return;
        }

        const result = commands[trimmed];
        if (result) {
            const lines = Array.isArray(result) ? result : [result];
            lines.forEach((line) => {
                setHistory((prev) => [...prev, { type: "output", content: line }]);
            });
        } else if (trimmed) {
            setHistory((prev) => [
                ...prev,
                { type: "output", content: `Command not found: ${trimmed}` },
            ]);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input);
            setInput("");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed inset-4 md:inset-20 z-[9999] bg-black/95 border border-cyan-500/30 rounded-lg overflow-hidden font-mono text-sm shadow-2xl shadow-cyan-900/30"
                >
                    {/* Title Bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-white/10">
                        <span className="text-cyan-400">~/dexportal</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-neutral-500 hover:text-red-500 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Terminal Content */}
                    <div
                        ref={containerRef}
                        className="h-[calc(100%-80px)] overflow-y-auto p-4 space-y-1"
                    >
                        {history.map((line, i) => (
                            <div
                                key={i}
                                className={
                                    line.type === "input"
                                        ? "text-green-400"
                                        : "text-neutral-300"
                                }
                            >
                                {line.content || "\u00A0"}
                            </div>
                        ))}
                    </div>

                    {/* Input Line */}
                    <div className="flex items-center px-4 py-2 border-t border-white/10 bg-black">
                        <span className="text-green-400 mr-2">{">"}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none text-white caret-cyan-400"
                            autoComplete="off"
                            spellCheck={false}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
