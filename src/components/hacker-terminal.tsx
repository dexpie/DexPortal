"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { Project } from "@/lib/types";

// Client-side fetch on mount used instead for Project List

const helpMessage = [
    "Available commands:",
    "  help             - Show this help message",
    "  ls               - List all projects",
    "  goto <path>      - Navigate to a page (e.g., 'goto /blog')",
    "  open <id>        - Open a project details page",
    "  whoami           - Display user info",
    "  clear            - Clear terminal",
    "  exit             - Close terminal",
];

export function HackerTerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<{ type: "input" | "output"; content: string }[]>([
        { type: "output", content: "DEXPORTAL Terminal v2.0 [Interactive Mode]" },
        { type: "output", content: "Type 'help' to see available commands." },
        { type: "output", content: "" },
    ]);
    const [input, setInput] = useState("");
    const [projectList, setProjectList] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch projects for 'ls' command
        fetch('/api/projects').then(res => res.json()).then(data => setProjectList(data)).catch(err => console.error(err));

        const handleKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === "`" || e.key === "~") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };

        const handleToggle = () => setIsOpen((prev) => !prev);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("toggle-terminal", handleToggle);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("toggle-terminal", handleToggle);
        };
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        const parts = trimmed.split(" ");
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        setHistory((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

        switch (command) {
            case "help":
                helpMessage.forEach(line => addOutput(line));
                break;
            case "clear":
                setHistory([]);
                break;
            case "exit":
                setIsOpen(false);
                break;
            case "whoami":
                addOutput("guest@dexportal - Authenticated via Neural Link");
                break;
            case "ls":
                if (projectList.length === 0) {
                    addOutput("No projects found or loading matrix...");
                } else {
                    addOutput("Projects in current directory:");
                    projectList.forEach(p => {
                        addOutput(`  ${p.id.padEnd(15)} - ${p.title} [${p.status}]`);
                    });
                }
                break;
            case "goto":
                if (args.length === 0) {
                    addOutput("Usage: goto <path>");
                } else {
                    const path = args[0];
                    addOutput(`Navigating to ${path}...`);
                    router.push(path);
                    setIsOpen(false);
                }
                break;
            case "open":
                if (args.length === 0) {
                    addOutput("Usage: open <project_id>");
                } else {
                    const id = args[0];
                    const project = projectList.find(p => p.id === id);
                    if (project) {
                        addOutput(`Opening module: ${project.title}...`);
                        // For now we don't have detail pages, so we redirect to href if external, or just wait for next step
                        // Since next step is Project Detail Pages, let's assume valid route /projects/[id]
                        router.push(`/projects/${id}`);
                        setIsOpen(false);
                    } else {
                        addOutput(`Error: Module '${id}' not found.`);
                    }
                }
                break;
            case "":
                break;
            default:
                addOutput(`Command not found: ${command}`);
        }
    };

    const addOutput = (text: string) => {
        setHistory((prev) => [...prev, { type: "output", content: text }]);
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
                    className="fixed inset-4 md:inset-20 z-[9999] bg-black/95 border border-cyan-500/30 rounded-lg overflow-hidden font-mono text-sm shadow-2xl shadow-cyan-900/30 flex flex-col"
                >
                    {/* Title Bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-white/10 shrink-0">
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
                        className="flex-1 overflow-y-auto p-4 space-y-1"
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
                    <div className="flex items-center px-4 py-2 border-t border-white/10 bg-black shrink-0">
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
