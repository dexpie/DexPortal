"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const testimonials = [
    {
        quote: "DexPie's work is exceptional. The attention to detail and creative solutions always exceed expectations. A true professional!",
        name: "Alex Chen",
        title: "Senior Developer @ TechCorp",
    },
    {
        quote: "Working with DexPie was a game-changer for our project. The code quality and design sense are top-notch.",
        name: "Sarah Miller",
        title: "Product Manager @ StartupXYZ",
    },
    {
        quote: "Incredible talent! DexPie delivered a complex project ahead of schedule with beautiful, maintainable code.",
        name: "James Wilson",
        title: "CTO @ InnovateTech",
    },
    {
        quote: "The collaboration was seamless. DexPie understood our vision and brought it to life perfectly.",
        name: "Emily Zhang",
        title: "Designer @ CreativeAgency",
    },
    {
        quote: "Simply outstanding. The level of polish and performance optimization is rare to see.",
        name: "Michael Brown",
        title: "VP Engineering @ FinTechGlobal",
    },
];

export function Testimonials() {
    return (
        <section className="container mx-auto px-6 py-20 border-t border-border dark:border-white/5 overflow-hidden">
            <div className="flex flex-col items-center mb-10">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-600 to-transparent mb-6" />
                <h2 className="text-3xl font-bold text-center font-heading">What People Say</h2>
            </div>

            <div className="h-[20rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
        </section>
    );
}
