"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Coffee, GitCommit, Star, Users, Trophy } from "lucide-react";

interface StatItem {
    icon: typeof Code2;
    label: string;
    value: number;
    suffix?: string;
    color: string;
}

const stats: StatItem[] = [
    { icon: Code2, label: "Lines of Code", value: 150000, suffix: "+", color: "cyan" },
    { icon: Coffee, label: "Cups of Coffee", value: 2847, suffix: "", color: "yellow" },
    { icon: GitCommit, label: "Commits", value: 1200, suffix: "+", color: "green" },
    { icon: Star, label: "GitHub Stars", value: 500, suffix: "+", color: "purple" },
    { icon: Users, label: "Happy Clients", value: 50, suffix: "+", color: "pink" },
    { icon: Trophy, label: "Projects", value: 30, suffix: "+", color: "orange" },
];

const colorClasses: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    green: "text-green-400 bg-green-500/10 border-green-500/30",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    pink: "text-pink-400 bg-pink-500/10 border-pink-500/30",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/30",
};

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const duration = 2000;
        const step = Math.ceil(value / (duration / 16));

        const timer = setInterval(() => {
            start += step;
            if (start >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(start);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, inView]);

    return <span>{displayValue.toLocaleString()}</span>;
}

export function AnimatedStats() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="container mx-auto px-6 py-20 border-t border-white/5" ref={ref}>
            <div className="flex flex-col items-center mb-16">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-600 to-transparent mb-6" />
                <h2 className="text-3xl font-bold text-center">By the Numbers</h2>
                <p className="text-neutral-400 text-center mt-2">
                    A snapshot of my coding journey so far
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className={`w-14 h-14 rounded-xl ${colorClasses[stat.color]} border mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <Icon size={24} />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white">
                                <AnimatedNumber value={stat.value} inView={inView} />
                                {stat.suffix}
                            </div>
                            <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
