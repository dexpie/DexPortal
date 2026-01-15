"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

interface BackButtonProps {
    fallbackUrl?: string;
    label?: string;
}

export function BackButton({ fallbackUrl = "/", label = "Back" }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        // Check if there's history to go back to
        if (window.history.length > 2) {
            router.back();
        } else {
            router.push(fallbackUrl);
        }
    };

    return (
        <motion.button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-cyan-400 transition-colors group"
            whileHover={{ x: -3 }}
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{label}</span>
        </motion.button>
    );
}

export function HomeButton() {
    const router = useRouter();

    return (
        <motion.button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Home size={16} />
            <span>Home</span>
        </motion.button>
    );
}
