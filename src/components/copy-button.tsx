"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
    text: string;
    className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success("Copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    return (
        <motion.button
            onClick={handleCopy}
            className={`p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Copy to clipboard"
        >
            {copied ? (
                <Check size={14} className="text-green-400" />
            ) : (
                <Copy size={14} className="text-neutral-400" />
            )}
        </motion.button>
    );
}

// Code block wrapper with copy button
interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}

export function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
    return (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    {filename && (
                        <span className="text-xs text-neutral-400 font-mono ml-2">{filename}</span>
                    )}
                </div>
                <CopyButton text={code} />
            </div>

            {/* Code */}
            <pre className="p-4 overflow-x-auto">
                <code className={`language-${language} text-sm font-mono text-neutral-200`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}
