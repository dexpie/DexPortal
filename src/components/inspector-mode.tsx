"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Terminal } from "lucide-react";
import { useSysConfig } from "@/store/use-sys-config";

export function InspectorMode() {
    const [inspectorActive, setInspectorActive] = useState(false);
    const [target, setTarget] = useState<{ rect: DOMRect; name: string; type: string } | null>(null);
    const { zenMode } = useSysConfig();

    // Toggle Inspector with Ctrl+I
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === "i") {
                setInspectorActive(prev => !prev);
                if (inspectorActive) setTarget(null); // Clear target on close
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [inspectorActive]);

    useEffect(() => {
        if (!inspectorActive || zenMode) {
            setTarget(null);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (!element) return;

            // Find closest parent with data-component attribute
            const componentEl = element.closest("[data-component]");

            if (componentEl) {
                const name = componentEl.getAttribute("data-component") || "Component";
                const type = componentEl.getAttribute("data-type") || "Client";
                const rect = componentEl.getBoundingClientRect();
                setTarget({ rect, name, type });
            } else {
                setTarget(null);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [inspectorActive, zenMode]);

    return (
        <>
            {/* Inspector Toggle Indicator (Bottom Right) */}
            <div className="fixed bottom-6 right-20 z-50">
                <button
                    onClick={() => setInspectorActive(!inspectorActive)}
                    className={`p-2 rounded-full transition-all duration-300 border ${inspectorActive
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-black/50 text-neutral-500 border-white/10 hover:text-white"
                        }`}
                    title="Toggle Inspector Mode (Ctrl+I)"
                >
                    <Terminal size={18} />
                </button>
            </div>

            {/* Inspector Overlay */}
            <AnimatePresence>
                {inspectorActive && target && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed z-[9999] border-2 border-cyan-500/80 bg-cyan-500/5 backdrop-blur-[1px] rounded transition-all duration-75 cursor-pointer hover:bg-cyan-500/10"
                        style={{
                            top: target.rect.top,
                            left: target.rect.left,
                            width: target.rect.width,
                            height: target.rect.height,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.dispatchEvent(new CustomEvent("open-source-modal", { detail: { name: target.name } }));
                            setInspectorActive(false); // Auto close inspector
                        }}
                    >
                        {/* Label Tag */}
                        <div className="absolute -top-7 left-0 bg-cyan-600 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-t flex items-center gap-1.5 shadow-lg">
                            <Code size={10} />
                            <span>{`<${target.name} />`}</span>
                            <span className="opacity-50 border-l border-black/20 pl-1.5">{target.type}</span>
                            <span className="opacity-75 text-[8px] bg-black/20 px-1 rounded ml-1">CLICK TO VIEW</span>
                        </div>

                        {/* Dimensions Tag */}
                        <div className="absolute -bottom-6 right-0 text-[9px] font-mono text-cyan-400 bg-black/80 px-1 py-0.5 rounded">
                            {Math.round(target.rect.width)}px × {Math.round(target.rect.height)}px
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
