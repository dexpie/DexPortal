"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, Monitor, Code, BookOpen, User, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/projects";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

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
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Command Dialog */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl shadow-cyan-900/20"
                        >
                            <Command className="w-full bg-transparent">
                                <div className="flex items-center border-b border-white/10 px-4">
                                    <Search className="mr-2 h-5 w-5 shrink-0 text-neutral-500" />
                                    <Command.Input
                                        className="flex h-12 w-full rouned-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 text-white"
                                        placeholder="Type a command or search..."
                                    />
                                </div>

                                <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-2">
                                    <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                                        No results found.
                                    </Command.Empty>

                                    <Command.Group heading="Projects" className="text-neutral-500 px-2 py-1.5 text-xs font-medium uppercase text-muted-foreground">
                                        {projects.map((project) => (
                                            <Command.Item
                                                key={project.id}
                                                onSelect={() => runCommand(() => window.open(project.href, '_blank'))}
                                                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-cyan-900/20 aria-selected:text-cyan-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-neutral-300"
                                            >
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                <span>{project.title}</span>
                                            </Command.Item>
                                        ))}
                                    </Command.Group>

                                    <Command.Group heading="General" className="text-neutral-500 px-2 py-1.5 text-xs font-medium uppercase text-muted-foreground mt-2">
                                        <Command.Item
                                            onSelect={() => runCommand(() => router.push("/"))}
                                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-white/10 aria-selected:text-white text-neutral-300"
                                        >
                                            <Monitor className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.open("https://github.com/dexpdf", "_blank"))} // Placeholder github
                                            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-white/10 aria-selected:text-white text-neutral-300"
                                        >
                                            <Github className="mr-2 h-4 w-4" />
                                            <span>GitHub</span>
                                        </Command.Item>
                                    </Command.Group>
                                </Command.List>

                                <div className="border-t border-white/10 py-2 px-4 text-xs text-neutral-500 flex justify-between">
                                    <span>ProTip: Status Monitor live at top right</span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="bg-white/10 px-1.5 rounded">Esc</kbd> to close
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
