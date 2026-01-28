"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, Monitor, Code, BookOpen, User, Github, Terminal, Zap, Power, Volume2, Globe, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/lib/types";
import { toast } from "sonner";
import { useSounds } from "@/components/sound-system";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const [projects, setProjects] = React.useState<Project[]>([]);
    const router = useRouter();

    // Sound effects (using placeholders or reliable CDNs if available, otherwise just simulated logic)
    // We'll simulate sound effects for now to avoid external dependency failures if files aren't present.
    const { playClick, playWhoosh, playSuccess } = useSounds();

    React.useEffect(() => {
        fetch('/api/projects').then(res => res.json()).then(data => setProjects(data)).catch(() => { });

        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => {
                    if (!open) playWhoosh();
                    return !open;
                });
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [playWhoosh]);

    const runCommand = React.useCallback((command: () => unknown) => {
        playSuccess();
        setOpen(false);
        command();
    }, [playSuccess]);

    const systemDiagnostics = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Running System Diagnostics...',
                success: 'System All Green. Core Temp: 34°C. Memory: Optimal.',
                error: 'System Error',
            }
        );
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            {open && (
                <React.Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Command Dialog */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="w-full max-w-lg overflow-hidden rounded-xl border border-cyan-500/30 bg-black/90 shadow-2xl shadow-cyan-500/20"
                        >
                            <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-cyan-950/20">
                                <span className="text-[10px] font-mono text-cyan-400">SYS.OS.V2.0 // COMMAND_CENTER</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                            </div>

                            <Command className="w-full bg-transparent">
                                <div className="flex items-center border-b border-white/10 px-4">
                                    <Terminal className="mr-3 h-4 w-4 shrink-0 text-cyan-500 animate-pulse" />
                                    <Command.Input
                                        className="flex h-12 w-full rouned-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-600 text-cyan-100 font-mono"
                                        placeholder="Enter system command..."
                                    />
                                </div>

                                <Command.List className="max-h-[350px] overflow-y-auto overflow-x-hidden py-2 px-2 custom-scrollbar">
                                    <Command.Empty className="py-6 text-center text-sm text-neutral-500 font-mono">
                                        ERR: COMMAND_NOT_FOUND
                                    </Command.Empty>

                                    <Command.Group heading="SYSTEM CONTROLS" className="text-cyan-600/70 px-2 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase">
                                        <Command.Item
                                            onSelect={() => runCommand(() => systemDiagnostics())}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <Zap className="mr-2 h-4 w-4 group-aria-selected:text-yellow-400 transition-colors" />
                                            <span className="font-mono">Run Diagnostics</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.dispatchEvent(new CustomEvent("open-pomodoro")))}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <svg className="mr-2 h-4 w-4 group-aria-selected:text-red-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                            <span className="font-mono">Focus Timer</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.dispatchEvent(new KeyboardEvent("keydown", { shiftKey: true, key: "z" })))}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <svg className="mr-2 h-4 w-4 group-aria-selected:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" /></svg>
                                            <span className="font-mono">Toggle Zen Mode</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.dispatchEvent(new KeyboardEvent("keydown", { shiftKey: true, key: "k" })))}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <svg className="mr-2 h-4 w-4 group-aria-selected:text-green-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="8" y1="21" y2="21" /><line x1="16" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="21" y2="21" /></svg>
                                            <span className="font-mono">Keyboard Visualizer</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.location.reload())}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-red-900/20 aria-selected:text-red-400 text-neutral-400 transition-colors"
                                        >
                                            <Power className="mr-2 h-4 w-4 group-aria-selected:text-red-500 transition-colors" />
                                            <span className="font-mono">System Reboot</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => {
                                                toast.error("⚠️ SYSTEM PURGE INITIATED ⚠️", {
                                                    description: "Deleting all local assets... (Just kidding)",
                                                    duration: 3000
                                                });
                                                setTimeout(() => {
                                                    document.documentElement.classList.add("invert");
                                                    setTimeout(() => window.location.reload(), 1500);
                                                }, 1000);
                                            })}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-red-950/40 aria-selected:text-red-500 text-neutral-400 transition-colors"
                                        >
                                            <svg className="mr-2 h-4 w-4 text-red-600 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            <span className="font-mono font-bold text-red-500">SYSTEM PURGE</span>
                                        </Command.Item>
                                    </Command.Group>

                                    <Command.Group heading="GAME_CENTER" className="text-cyan-600/70 px-2 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase mt-2">
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.dispatchEvent(new CustomEvent("open-tictactoe")))}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <Trophy className="mr-2 h-4 w-4" />
                                            <span className="font-mono">Play Tic-Tac-Toe</span>
                                        </Command.Item>
                                    </Command.Group>

                                    <Command.Group heading="NAVIGATION_MODULES" className="text-cyan-600/70 px-2 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase mt-2">
                                        <Command.Item
                                            onSelect={() => runCommand(() => router.push("/"))}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <Monitor className="mr-2 h-4 w-4" />
                                            <span className="font-mono">Dashboard</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => router.push("/guestbook"))}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            <span className="font-mono">Guestbook_Log</span>
                                        </Command.Item>
                                    </Command.Group>

                                    <Command.Group heading="PROJECT_DATABASE" className="text-cyan-600/70 px-2 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase mt-2">
                                        {projects.map((project) => (
                                            <Command.Item
                                                key={project.id}
                                                onSelect={() => runCommand(() => window.open(project.href, '_blank'))}
                                                className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                            >
                                                <Globe className="mr-2 h-4 w-4" />
                                                <span className="font-mono">{project.title}</span>
                                                <span className="ml-auto text-[10px] opacity-50 bg-cyan-900/50 px-1.5 py-0.5 rounded">{project.category.toUpperCase()}</span>
                                            </Command.Item>
                                        ))}
                                    </Command.Group>

                                    <Command.Group heading="EXTERNAL_LINKS" className="text-cyan-600/70 px-2 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase mt-2">
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.open("https://github.com/dexpie", "_blank"))}
                                            className="group relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-cyan-900/30 aria-selected:text-cyan-300 text-neutral-400 transition-colors"
                                        >
                                            <Github className="mr-2 h-4 w-4" />
                                            <span className="font-mono">GitHub_Repo</span>
                                        </Command.Item>
                                    </Command.Group>
                                </Command.List>

                                <div className="border-t border-cyan-500/20 py-2 px-4 text-[10px] text-cyan-700/70 flex justify-between font-mono bg-cyan-950/10">
                                    <div className="flex gap-4">
                                        <span>STATUS: ONLINE</span>
                                        <span className="animate-pulse">NET: SECURE</span>
                                    </div>
                                    <span className="flex items-center gap-1">
                                        <kbd className="bg-cyan-900/30 px-1.5 rounded border border-cyan-500/20 text-cyan-500">ESC</kbd> ABORT
                                    </span>
                                </div>
                            </Command>
                        </motion.div>
                    </div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
}
