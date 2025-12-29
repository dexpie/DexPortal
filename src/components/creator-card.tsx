"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

export function CreatorCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            className="relative z-50 inline-block"
            onMouseMove={onMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-64 h-80 rounded-xl bg-gradient-to-br from-neutral-900/90 to-black/90 border border-white/10 backdrop-blur-xl p-6 shadow-2xl shadow-red-900/20 flex flex-col items-center justify-between"
            >
                {/* Holographic Gradient Overlay */}
                <div
                    className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br from-transparent via-red-500/30 to-blue-500/30 pointer-events-none"
                    style={{ transform: "translateZ(20px)" }}
                />

                <div className="flex flex-col items-center text-center space-y-4" style={{ transform: "translateZ(50px)" }}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg border-2 border-white/10">
                        <span className="text-3xl font-bold text-white">G</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Dexpie</h3>
                        <p className="text-xs text-red-500 font-mono">FULL STACK DEVELOPER</p>
                        <p className="text-xs text-neutral-400 mt-2">Crafting digital experiences specifically for you.</p>
                    </div>
                </div>

                <div className="flex gap-4" style={{ transform: "translateZ(40px)" }}>
                    <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white transition-colors text-neutral-400">
                        <Github size={18} />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-blue-400 hover:text-white transition-colors text-neutral-400">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition-colors text-neutral-400">
                        <Linkedin size={18} />
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}
