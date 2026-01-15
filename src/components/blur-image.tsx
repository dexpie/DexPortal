"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    fill?: boolean;
    priority?: boolean;
}

export function BlurImage({ src, alt, width, height, className, fill, priority }: BlurImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className={cn("bg-neutral-800 flex items-center justify-center", className)}>
                <span className="text-neutral-500 text-sm">Image not found</span>
            </div>
        );
    }

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Blur Placeholder */}
            {!isLoaded && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900"
                    animate={{
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </motion.div>
            )}

            {/* Actual Image */}
            <motion.div
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    filter: isLoaded ? "blur(0px)" : "blur(20px)",
                }}
                transition={{ duration: 0.5 }}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={fill ? undefined : (width || 400)}
                    height={fill ? undefined : (height || 300)}
                    fill={fill}
                    priority={priority}
                    className={cn("object-cover", !fill && "w-full h-auto")}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                />
            </motion.div>
        </div>
    );
}
