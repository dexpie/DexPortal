"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Alex Chen",
        role: "Senior Developer @ TechCorp",
        avatar: "https://i.pravatar.cc/150?img=1",
        content: "DexPie's work is exceptional. The attention to detail and creative solutions always exceed expectations. A true professional!",
    },
    {
        id: 2,
        name: "Sarah Miller",
        role: "Product Manager @ StartupXYZ",
        avatar: "https://i.pravatar.cc/150?img=5",
        content: "Working with DexPie was a game-changer for our project. The code quality and design sense are top-notch.",
    },
    {
        id: 3,
        name: "James Wilson",
        role: "CTO @ InnovateTech",
        avatar: "https://i.pravatar.cc/150?img=3",
        content: "Incredible talent! DexPie delivered a complex project ahead of schedule with beautiful, maintainable code.",
    },
    {
        id: 4,
        name: "Emily Zhang",
        role: "Designer @ CreativeAgency",
        avatar: "https://i.pravatar.cc/150?img=9",
        content: "The collaboration was seamless. DexPie understood our vision and brought it to life perfectly.",
    },
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="container mx-auto px-6 py-20 border-t border-border dark:border-white/5">
            <div className="flex flex-col items-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-600 to-transparent mb-6" />
                <h2 className="text-3xl font-bold text-center">What People Say</h2>
            </div>

            <div
                className="relative max-w-3xl mx-auto"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Navigation Buttons */}
                <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 hover:bg-secondary dark:hover:bg-white/10 transition-colors hidden md:block"
                >
                    <ChevronLeft size={20} className="text-muted-foreground dark:text-neutral-400" />
                </button>
                <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 hover:bg-secondary dark:hover:bg-white/10 transition-colors hidden md:block"
                >
                    <ChevronRight size={20} className="text-muted-foreground dark:text-neutral-400" />
                </button>

                {/* Testimonial Card */}
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-transparent dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] border border-border dark:border-white/10 p-8 md:p-12 shadow-lg dark:shadow-none">
                    <Quote className="absolute top-6 left-6 w-12 h-12 text-cyan-500/20" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <p className="text-lg md:text-xl text-muted-foreground dark:text-neutral-300 leading-relaxed mb-8 italic">
                                "{testimonials[currentIndex].content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonials[currentIndex].avatar}
                                    alt={testimonials[currentIndex].name}
                                    className="w-12 h-12 rounded-full border-2 border-cyan-500/30"
                                />
                                <div>
                                    <p className="font-bold text-foreground dark:text-white">{testimonials[currentIndex].name}</p>
                                    <p className="text-sm text-muted-foreground dark:text-neutral-500">{testimonials[currentIndex].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-cyan-500 w-6" : "bg-border dark:bg-white/20 hover:bg-cyan-200 dark:hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
