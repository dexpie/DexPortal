"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, BookOpen, MessageSquare, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: User, label: "About" },
    { href: "/blog", icon: BookOpen, label: "Blog" },
    { href: "/guestbook", icon: MessageSquare, label: "Guest" },
    { href: "/contact", icon: Mail, label: "Contact" },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <div className="bg-black/90 backdrop-blur-lg border-t border-white/10 px-2 py-2 safe-area-pb">
                <div className="flex justify-around items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex flex-col items-center gap-1 px-4 py-2"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-active"
                                        className="absolute inset-0 bg-cyan-500/10 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <Icon
                                    size={20}
                                    className={cn(
                                        "relative z-10 transition-colors",
                                        isActive ? "text-cyan-400" : "text-neutral-500"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "relative z-10 text-[10px] font-medium transition-colors",
                                        isActive ? "text-cyan-400" : "text-neutral-500"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
